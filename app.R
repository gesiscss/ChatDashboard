###################################################################################### CHATDASHBOARD SETUP #####

################################### LOADING LIBRARIES ####
library(anytime)
library(crosstalk)
library(cyphr)
library(digest)
library(DT)
library(fontawesome)
library(ggplot2)
library(ggwordcloud)
library(keyring)
library(rsconnect)
library(shiny)
library(shinymanager)
library(shinythemes)
library(shinyjs)
library(shinyalert)
library(shinyTime)
library(shinyWidgets)
library(slickR)
library(utils)
library(waiter)
library(WhatsR)
library(shinybrowser)




###################################  LANGUAGE SETTINGS ####

# language setting for shinymanager authentication page
# see: https://datastorm-open.github.io/shinymanager/reference/use_language.html
landing_page_language <- "de"

# Check: https://cdn.datatables.net/plug-ins/1.10.11/i18n/ for a 
# list of different languages. Insert them by pasting the respective
# link according to the format below
datatable_language <- c('//cdn.datatables.net/plug-ins/1.10.11/i18n/German.json')

# import display text from csv file
ChatDashboard_DisplayText <- read.csv("./www/ChatDashboard_DisplayText.csv")

# Selecting column containing the text you want to display. English and German are preset options 
display_text <- ChatDashboard_DisplayText$German

# For changing the display of individual text variables, you can simply edit the file
# ./www/ChatDashboard_DisplayText.csv, add an additional column, and select it above.





###################################  SHINY SETTINGS ####

# Variable passed to WhatsR::parse_chat(). Automatically removes all chat messages from participants that did not post the EXACT consent_message into
# the chat. Setting this variable to NA will not remove any messages.
consent_message <- NA

# variable to control whether to use forwarding per url parameter or rely on pre-defined credentials for authentication
# TODO: If you are using url parameter forwarding, you need to adapt line 879 to extract the participant ID from your referral link.
# Default structure is: www.example-website.com/ChatDashboard?id=TestParticipant | Extracts: TestParticipant
use_forwarding <- TRUE 

# Password to use for forwarding via url-parameter (only used if use_forwarding == TRUE)
# TODO: Set this as a character string in line 880

# saving donated files to server if TRUE, will not save any data if not TRUE
save_to_server <- TRUE

# setting upload file size limit
options(shiny.maxRequestSize = 50*1024^2)

# Set column names to be displayed to participants. This needs to be exactly 19 strings
# and does not determine whether these variables are displayed or not, but just how they are named
# in the display to participants
Colnames_ppt_display <- c("Zeit",
                          "Absender",
                          "Absender_anonym",
                          "Nachricht",
                          "Nachricht_vereinfacht",
                          "Worte",
                          "Links",
                          "Links_anonym",
                          "Medien",
                          "Medien_anonym",
                          "Standorte",
                          "Standorte_anonym",
                          "Emoji",
                          "Emoji_beschreibung",
                          "Smilies",
                          "System_info",
                          "Wortanzahl",
                          "Nummerierung_zeit",
                          "Nummerierung_anzeige")

# Set column names to be automatically excluded because they can contain PII (must occur in Colnames_ppt_display)
Colnames_exclude_pii <- c("Absender",
                          "Nachricht",
                          "Nachricht_vereinfacht",
                          "Worte",
                          "Links",
                          "Medien",
                          "Standorte",
                          "System_info")




# Shiny Debugging Options (uncomment these to debug the app)
options(shiny.session.inactivityTimeout = 2*60*60*1000) # Session Inactivity Timeout
# options(shiny.error = browser)
# options(shiny.trace = TRUE)

# --- per-user CSV logger (append-only, no IP/path) ---
log_event <- function(event, session) {
  user <- parseQueryString(session$clientData$url_search)[["id"]]
  if (is.null(user) || user == "") user <- "unknown_user"
  log_path <- file.path("ClosingReasons", paste0("usage_log_", user, ".csv"))
  dir.create(dirname(log_path), showWarnings = FALSE, recursive = TRUE)
  
  row <- data.frame(
    timestamp_utc = format(Sys.time(), tz = "UTC", usetz = TRUE),
    event   = event,
    username = user,
    device  = shinybrowser::get_device(),
    browser = shinybrowser::get_browser(),
    stringsAsFactors = FALSE
  )
  
  write.table(row, file = log_path, sep = ",", row.names = FALSE,
              col.names = !file.exists(log_path), append = TRUE)
}


################################### HANDLING SHINY MANAGER CREDENTILAS ####

# Switch for running local (FALSE) vs online (TRUE)
running_online = FALSE

if (running_online == TRUE) {.libPaths("YOUR-LIB-PATH-HERE")}
# TODO: Add library path of server here if running online

# loading credentials from external file
credentials <- readRDS("credentials.rds")


################################### MAKING FONT FOR EMOJI PLOTTING AVAILABLE ####
if (file.exists("~/.fonts/NotoColorEmoji.ttf")) {
  
  system('fc-cache -f ~/.fonts')
  
} else {
  
  dir.create('~/.fonts')
  file.copy("www/NotoColorEmoji.ttf", "~/.fonts")
  system('fc-cache -f ~/.fonts')
  
}




################################### DEFINING WAITING SCREENS ####
waiting_screen1 <- tagList(
  spin_flower(),
  h4(style = "color:#fff;margin-top:12px;",
     HTML(gsub("\\\\n", "<br/>", display_text[1])))
)

waiting_screen2 <- tagList(
  spin_flower(),
  h4(style = "color:#fff;margin-top:12px;",
     HTML(gsub("\\\\n", "<br/>", display_text[2])))
)



###################################################################################### SHINY SERVER UI #####

# Define UI for ChatDashboard application
app_ui <- fluidPage(theme = shinytheme("flatly"),
                    
                    # Detecting browser for mobile optimization
                    shinybrowser::detect(),
                    
                    # keep session alive for locked phones
                    tags$head(tags$script(HTML("
                        setInterval(function(){
                          Shiny.setInputValue('keepalive', Date.now(), {priority:'event'});
                        }, 15000);
                      "))),
                    
                    # ensure users start at the top of a new page when changing tabs on mobile
                    tags$head(tags$script(HTML("
                      (function(){
                        function scrollTopNow(){
                          window.scrollTo(0,0);
                          document.body.scrollTop = 0;
                          document.documentElement.scrollTop = 0;
                          setTimeout(function(){ window.scrollTo(0,0); }, 0); // iOS
                        }
                        // Bootstrap tab change (navbarPage)
                        $(document).on('shown.bs.tab', 'a[data-toggle=\"tab\"]', scrollTopNow);
                        // Your custom microsite nav
                        $(document).on('click', '.gs-micro-nav a', function(){ setTimeout(scrollTopNow, 0); });
                        // After you rewire visible/active tabs
                        Shiny.addCustomMessageHandler('microNavVisible', function(){ setTimeout(scrollTopNow, 0); });
                      })();
                    "))),
                    
                    # website zoom
                    tags$head(tags$style(HTML("
                    /* Shinywaiter immer bildschirmfüllend, in allen Browsern */
                    .waiter-overlay, #waiter-overlay, .waiter {
                      position: fixed !important;
                      top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important;
                      width: 100vw !important;
                      height: 100vh !important;
                      max-width: 100vw !important;
                      max-height: 100vh !important;
                      transform: none !important;
                      -webkit-transform: none !important;
                      -ms-transform: none !important;
                      -moz-transform: none !important;
                      z-index: 2147483647 !important;
                    }
                  
                    /* Moderne Browser: exakte Viewport-Höhe */
                    @supports (height: 100dvh) {
                      .waiter-overlay, #waiter-overlay, .waiter { height: 100dvh !important; }
                    }
                  "))),
                                        
                    ##################################### UI SETUP ####
                    
                    # Shiny helpers
                    useShinyjs(),
                    setBackgroundColor("#ffffff"),
                    useWaiter(),
                    
                    # GESIS framework + fixes (fileInput, footer spacing, banner/nav styling)
                    tags$head(
                      tags$link(rel = "stylesheet", href = "package/dist/gesis-web.css"),
                      tags$style(HTML("
                    /* ---------- FILE INPUT (Bootstrap 3) ---------- */
                    .bs3-fileinput .input-group { display: table !important; width: 100% !important; border-collapse: separate; }
                    .bs3-fileinput .input-group .form-control { display: table-cell !important; width: 100% !important; float: none; }
                    .bs3-fileinput .input-group-btn,
                    .bs3-fileinput .input-group-prepend,
                    .bs3-fileinput .input-group-append,
                    .bs3-fileinput label.input-group-btn { display: table-cell !important; width: 1%; white-space: nowrap; vertical-align: middle; }
              
                    .btn-file { position: relative; overflow: hidden; }
                    .btn-file > input[type=file]{
                      position:absolute !important; top:0; right:0; min-width:100%; min-height:100%;
                      font-size:100px; text-align:right; opacity:0; cursor:inherit; display:block;
                    }
              
                    /* Make the 'Datei auswählen' clearly a button */
                    .bs3-fileinput .btn-file{
                      display:inline-block; background-color:#1E8CC8 !important; color:#fff !important;
                      border:none !important; padding:6px 16px !important; font-weight:600 !important;
                      border-radius:0 6px 6px 0 !important;
                    }
                    .bs3-fileinput .btn-file:hover{ background-color:#166b97 !important; }
                    .bs3-fileinput .input-group .form-control{
                      background:#fff; border:1px solid #cbd5e1; box-shadow:none; height:36px; line-height:1.4;
                      border-radius:6px 0 0 6px !important;
                    }
                    .bs3-fileinput input[type=file]{ all: unset; }
                    .bs3-fileinput input[type=file]::file-selector-button{ display:none !important; }
              
                    /* ShinyAlerts: prevent stray text input */
                    .swal2-popup .swal2-input{display:none!important;}
              
                    /* ---------- LAYOUT / FOOTER SPACING ---------- */
                    html, body { height: 100%; }
                    body { display:flex; flex-direction:column; }
                    .navbar { flex:0 0 auto; }
                    .container-fluid { flex:1 0 auto; }
                    footer { flex:0 0 auto; }
                    .tab-content { padding-bottom:3rem; } /* breathing room above footer */
              
                    /* DataTables length <select> visible */
                    .dataTables_length select { display:inline-block; }
              
                    /* ---------- MICROSITE BANNER ---------- */
                    .page-banner.microsite{
                      background-image:url('banner-microsite-07.svg') !important;
                      background-repeat:no-repeat !important; background-size:cover !important; background-position:center !important;
                      min-height:180px; margin-bottom:0 !important; /* no white gap under banner */
                    }
                    .page-banner.microsite .page-banner--inner{ background:transparent !important; }
              
                    /* ---------- MICROSITE NAV (full width, dark, GESIS colors) ---------- */
                    .gs-micro-nav.has-bg-color{
                      background-color: var(--gs-darkblue-100,#072f57) !important;
                      color:#fff; margin:0; padding:.5rem 1rem; border-radius:0 0 12px 12px;
                    }
                    .gs-micro-nav a{
                      color:#fff; display:inline-block; padding:.4rem .8rem; border-radius:999px; text-decoration:none;
                      border:1px solid transparent;
                    }
                    .gs-micro-nav a:hover, .gs-micro-nav a:focus{
                      background:rgba(22,107,151,.15); color:#fff;
                    }
                    .gs-micro-nav a.is-active,
                    .gs-micro-nav a[aria-current='page'],
                    .gs-micro-nav a.active{
                      background: var(--gs-darkblue-80,#166b97); color:#fff; border-color: var(--gs-darkblue-80,#166b97);
                    }
                    
                          /* Hide Bootstrap navbar strip; we use microsite nav for tabs */
                          .navbar, .navbar .navbar-header, .navbar .navbar-nav{display:none!important; height:0; min-height:0; margin:0; padding:0; border:0;}
                        "))
                    ),
                    
                    # GESIS micro header and banner
                    tags$div(id = "gesis-micro-header", includeHTML("www/gesis-micro-header.html")),
                    includeHTML("www/gesis-microsite-banner.html"),
                    
                    # GESIS microsite navigation controlling Shiny tabs (full width, dark)
                    tags$nav(class = "gs-micro-nav container-fluid has-bg-color gs-darkblue--65",
                             tags$ul(class = "list-inline",
                                     tags$li(tags$a(href = "#", `data-tab` = display_text[3],  display_text[3]  )), # Überblick
                                     tags$li(tags$a(href = "#", `data-tab` = display_text[15], display_text[15] )), # Daten hochladen
                                     tags$li(tags$a(href = "#", `data-tab` = display_text[87], display_text[87] )), # Spender Auswahl
                                     tags$li(tags$a(href = "#", `data-tab` = display_text[28], display_text[28] )), # Daten auswählen
                                     tags$li(tags$a(href = "#", `data-tab` = display_text[46], display_text[46] )), # Ergebnisse
                                     tags$li(tags$a(href = "#", `data-tab` = display_text[76], display_text[76] ))  # Impressum
                             )
                    ),
                    
                    # Click handler + active state
                    tags$script(HTML("
                    $(document).on('click','.gs-micro-nav a',function(e){
                      e.preventDefault();
                      $('.gs-micro-nav a').removeClass('is-active');
                      $(this).addClass('is-active');
                      Shiny.setInputValue('go_tab', $(this).data('tab'), {priority:'event'});
                    });
                  ")),
                    
                    tags$script(HTML("
                      Shiny.addCustomMessageHandler('microNavVisible', function(msg){
                        var show = msg.show || [];
                        var active = msg.active || null;
                        $('.gs-micro-nav a').each(function(){
                          var $a = $(this), tab = $a.data('tab');
                          if (show.indexOf(tab) !== -1) { $a.closest('li').show(); }
                          else { $a.closest('li').hide(); }
                          $a.toggleClass('is-active', !!active && tab === active);
                        });
                      });
                    ")),
                    
                    # fix sweet alerts for GESIS CSS
                    tags$head(tags$script(HTML("
                  new MutationObserver(function(){
                    var p=document.querySelector('.swal2-popup');
                    if(!p) return;
                    p.querySelectorAll('.swal2-input,.swal2-textarea,.swal2-select,.swal2-radio,.swal2-checkbox')
                     .forEach(function(e){ e.style.display='none'; e.style.height='0'; e.style.padding='0'; e.style.border='0'; });
                  }).observe(document.body,{childList:true,subtree:true});
                "))),
                    
                    
                    
                    
                    ##################################### MAIN UI ####
                    
                    # Logo and App name in navbar page
                    navbarPage(title = tags$img(height = 35,
                                                width = 35,
                                                src = "WhatsR_logo.png"),
                               id = "ChatDashboard",
                               windowTitle = "ChatDashboard",
                               
                               ##################################### Overview Page ####
                               tabPanel(display_text[3],
                                        
                                        # whole page
                                        fluidRow(
                                          
                                          # Heading 1
                                          column(tags$p(style = "text-align: justify;",
                                                        HTML(display_text[4])),
                                                 HTML("<br>"),
                                                 HTML(display_text[5]),
                                                 HTML("<br><br>"),
                                                 HTML(display_text[6]),
                                                 HTML("<br><br>"),
                                                 HTML(display_text[7]),
                                                 HTML("<br>"),
                                              
                                          
                                          # Images
                                          #column(slickROutput("slickr",
                                          #                    width = "100%",
                                          #                    height = "100%"),
                                          #       HTML("<br><br>"),
                                          #       width = 6, offset = 3),
                                          
                                          # Heading 2
                                          #column(tags$p(style = "text-align: justify;",
                                          #              HTML(display_text[8]),
                                          #              HTML(display_text[9]),
                                          #              HTML("<br><br>")
                                          #),
                                          #width = 6, offset = 3),
                                          
                                          # Heading 3
                                          #column(tags$p(style = "text-align: justify;",
                                          #              HTML(display_text[10]),
                                          #              HTML(display_text[11]),
                                          #              HTML("<br><br>")
                                          #),
                                          #width = 6, offset = 3),
                                          
                                          # Heading 4
                                          #column(tags$p(style = "text-align: justify;",
                                          #              HTML(display_text[12]),
                                          #              HTML(display_text[13]),
                                          #              HTML("<br><br>")
                                          #),
                                          #width = 6, offset = 3),
                                          
                                          tags$head(
                                            tags$style(HTML("
                                                      .callout{padding:1rem;border-left:4px solid #0d6efd;background:#f8f9fa;border-radius:.25rem}
                                                      .callout h4{margin-top:0;margin-bottom:.5rem}
                                                    "))
                                          ),
                                          tags$div(class = "callout",
                                                   tags$h4("Wichtig:"),
                                                   "Diese Website ist für den PC optimiert. Sie können mit dem Smartphone fortfahren, sollten aber vermeiden den Tab zu schließen, zu minimieren oder das Display zu sperren bevor die Datenspende abgeschlossen ist um Verbindungsprobleme zu vermeiden."
                                          ),
                                          
                                          HTML("<br><br>"), width = 6, offset = 3),
                                          
                                          # Consent button
                                          column(12, align = "center",
                                                 actionButton("IntroCheck",
                                                              label = display_text[14],
                                                              class = "btn-warning",
                                                              style = "color: #FFFFFF; background-color: #E2007A; border-color: #E2007A"),
                                                 HTML("<br><br><br><br><br><br>")
                                          )
                                          
                                          # End of fluidRow
                                        )
                                        
                                        # End of tabPanel
                               ),
                               
                               ##################################### DATA UPLOAD PAGE ####
                               tabPanel(display_text[15],
                                        
                                        # Sidebar
                                        sidebarLayout(
                                          sidebarPanel(h2(display_text[16],
                                                          align = "center"),
                                                       
                                                       # Text for sidebar panel
                                                       helpText(display_text[18]),
                                                       helpText(display_text[19]),
                                                       
                                                       # File selection field
                                                       div(class = "bs3-fileinput",
                                                           fileInput("file", label = "",
                                                                     accept = c(".txt", ".zip"),
                                                                     buttonLabel = display_text[20])
                                                       ),
                                                       
                                                       # Upload button
                                                       actionButton(inputId = "submit",
                                                                    label = display_text[21],
                                                                    class = "btn-warning",
                                                                    style = "color: #FFFFFF; background-color: #E2007A; border-color: #E2007A")
                                          ),
                                          
                                         
                                          #### MAIN PANEL 
                                          mainPanel(
                                            column(
                                              width = 10, offset = 1,
                                              
                                              # Heading + body text
                                              tags$h2("WhatsApp Chatverläufe exportieren"),
                                              tags$p("Wenn Sie den Chatverlauf bereits auf ihr Telefon oder Ihren PC exportiert haben können Sie diesen direkt links (PC) oder oben (Smartphone) hochladen. Falls nicht, klicken Sie hier auf den entsprechenden Reiter unten um die richtige Anleitung zum Export von WhatsApp Chatverläufen für Ihr Telefon auszuwählen."),
                                              
                                              # minimal spacing
                                              tags$head(
                                                tags$style(HTML("
                                                  details { margin-bottom: 16px; }
                                                  summary { cursor: pointer; font-weight: 600; padding: 8px 0; }
                                                  details > *:not(summary) { margin-top: 8px; }
                                                  img { display:block; }
                                                "))
                                              ),
                                              
                                              # ANDROID
                                              tags$details(
                                                tags$summary("Android"),
                                                tags$ul(
                                                  tags$li("Öffnen Sie WhatsApp auf Ihrem Smartphone und klicken Sie auf den Chat dessen Verlauf Sie bereitstellen möchten."),
                                                  tags$li("Klicken Sie oben rechts im Chat auf die drei vertikalen Punkte."),
                                                  tags$li("Wählen Sie die Option `Mehr` im folgenden Menü aus."),
                                                  tags$li("Klicken Sie auf die Option `Chat exportieren`."),
                                                  tags$li("Im folgenden Fenster, wählen Sie die Option `Ohne Medien` aus."),
                                                  tags$li("Wählen Sie nun ein Emailprogramm aus der Liste aus. Es öffnet sich eine Email an welche der Chatverlauf automatisch angehängt ist."),
                                                  tags$li("Geben Sie in das Feld 'An' Ihre eigene Emailadresse ein und senden Sie die Email an sich selbst ab.")
                                                ),
                                                tags$img(src = "DataExport_Guide_Android.png",
                                                         style = "width:100%;height:auto;", alt = "Android export guide"),
                                                tags$ul(
                                                  tags$li("Öffnen Sie das Emailpostfach an welches Sie den Chatverlauf gerade geschickt haben."),
                                                  tags$li("Laden Sie den Anhang der Email herunter. Dies kann entweder eine .zip Datei oder eine .txt Datei sein."),
                                                  tags$li("Laden Sie den heruntergeladenen Chatverlauf im Fenster links auf diese Website hoch."),
                                                  tags$li("Auf der nächsten Seite erhalten Sie die Möglichkeit Ihren anonymisierten Chatverlauf nochmal einzusehen und anschließend abzuschicken.")
                                                )
                                              ),
                                              
                                              # iPHONE
                                              tags$details(
                                                tags$summary("iPhone"),
                                                tags$ul(
                                                  tags$li("Öffnen Sie WhatsApp auf Ihrem Smartphone und klicken Sie auf den Chat dessen Verlauf Sie bereitstellen möchten."),
                                                  tags$li("Klicken Sie oben in der Mitte des Chatfensters auf den Namen Ihres Chatpartners."),
                                                  tags$li("Scrollen Sie im Menü nach unten und wählen Sie die Option `Chat exportieren` aus"),
                                                  tags$li("Im folgenden Fenster, wählen Sie die Option `Ohne Medien` aus."),
                                                  tags$li("Wählen Sie nun ein Emailprogramm aus er Liste aus. Es öffnet sich eine Email an welche der Chatverlauf automatisch angehängt ist."),
                                                  tags$li("Geben Sie in das Feld 'An' Ihre eigene Emailadresse ein und senden Sie die Email an sich selbst ab.")
                                                ),
                                                tags$img(src = "WhatsApp_DataExport_iOS.png",
                                                         style = "width:100%;height:auto;", alt = "iOS export guide"),
                                                tags$ul(
                                                  tags$li("Öffnen Sie das Emailpostfach an welches Sie den Chatverlauf gerade geschickt haben."),
                                                  tags$li("Laden Sie den Anhang der Email herunter. Dies kann entweder eine .zip Datei oder eine .txt Datei sein."),
                                                  tags$li("Laden Sie den heruntergeladenen Chatverlauf im Fenster links auf diese Website hoch."),
                                                  tags$li("Auf der nächsten Seite erhalten Sie die Möglichkeit Ihren anonymisierten Chatverlauf nochmal einzusehen und anschließend abzuschicken.")
                                                )
                                              )
                                            )
                                          ),
                                          
                                          # End sidebar layout
                                        )
                                        
                                        # End tab panel
                               ),
                               
                               ##################################### PARTICIPANT - USER SELECTION PAGE ####
                               tabPanel(display_text[87],
                                        
                                        # Sidebar
                                        sidebarPanel(
                                          
                                          # Info text
                                          h2(display_text[87], align = "center"),
                                          HTML(display_text[90]),
                                          
                                          # spacer
                                          HTML("<br><br>"),
                                          
                                          # input selector
                                          selectInput("person_select",
                                                      label = display_text[91],
                                                      choices = c(""),
                                                      selected = "",
                                                      multiple = FALSE),
                                          
                                          
                                          # action button
                                          actionButton("person_submit",
                                                       display_text[89],
                                                       style = "color: #FFFFFF; background-color: #E2007A; border-color: #E2007A"),
                                        ),
                                        
                                        # Main panel
                                        mainPanel(
                                          
                                          # headline
                                          h2(display_text[87], align = "center"),
                                          
                                          # information
                                          HTML(display_text[58]),
                                          
                                          # table display here
                                          DTOutput("selection_frame"),
                                          
                                          # Display the selected choice
                                          textOutput("selected_choice"),
                                          
                                          # spacer
                                          HTML("<br><br><br><br>"),
                                          
                                        )
                                        
                                        
                               ),
                               
                               
                               ##################################### DATA EXPLORATION PAGE ####
                               tabPanel(display_text[28],
                                        
                                        # Sidebar Panel
                                        sidebarPanel(
                                          
                                          # Info text
                                          #h2(display_text[29], align = "center"),
                                          #HTML(display_text[30]),
                                          #HTML("<br><br>"),
                                          #HTML(display_text[31]),
                                          
                                          # column selection
                                          h3(display_text[32]),
                                          helpText(display_text[33]),
                                          pickerInput("show_vars",
                                                      display_text[34],
                                                      choices = c(""),
                                                      selected = c(""),
                                                      #label = display_text[35],
                                                      multiple = TRUE,
                                                      options  = pickerOptions(
                                                        selectedTextFormat = "count",
                                                        countSelectedText  = "{0} Spalten ausgewählt"#,
                                                        #mobile = TRUE
                                                      ),
                                                      choicesOpt = list(style = c("color:black;font-weight: bold;",
                                                                                  "background:lightgrey;color:black",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "background:lightgrey;color:black",
                                                                                  "background:lightgrey;color:black",
                                                                                  "background:lightgrey;color:black",
                                                                                  "background:lightgrey;color:black",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "background:lightgrey;color:black",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "background:lightgrey;color:black",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "background:lightgrey;color:black",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "color:black;font-weight: bold;",
                                                                                  "color:black;font-weight: bold;"))),
                                          
                                          # Row selection
                                          h3(display_text[36]),
                                          helpText(display_text[37]),
                                          actionButton("excludeRows",display_text[38]),
                                          actionButton("RestoreRows",display_text[39]),
                                          
                                          # Data donation
                                          h3(display_text[40]),
                                          helpText(display_text[41]),
                                          actionButton(inputId = "donation",
                                                       label = display_text[42],
                                                       class = "btn-warning",
                                                       style = "color: #FFFFFF; background-color: #E2007A; border-color: #E2007A")
                                          
                                          # End sidebar panel
                                        ),
                                        
                                        # Main panel
                                        mainPanel(
                                          
                                          # Headline
                                          h1(display_text[43],align = "center"),
                                          HTML("<br>"),
                                          
                                          # Dataframe
                                          DTOutput("frame"),
                                          
                                          # Download buttons
                                          fluidRow(column(1,
                                                          align = "topright",
                                                          downloadButton("downloadSelection",
                                                                         display_text[44])),
                                                   column(1,
                                                          align = "topleft",
                                                          downloadButton("downloadData",
                                                                         display_text[45]),
                                                          offset = 9),),
                                          
                                          # End main panel
                                        )
                                        
                                        # End tab panel
                               ),
                               
                               ##################################### OVERALL RESULTS PAGE ####
                               tabPanel(display_text[46],
                                        
                                        tabsetPanel(type = "tabs",
                                                    
                                                    ##################################### RESULTS: MESSAGES SUBPAGE ####
                                                    tabPanel(display_text[47],
                                                             
                                                             # sidebar panel
                                                             sidebarPanel(h3(display_text[48], align = "center"),
                                                                          tags$p(display_text[49]),
                                                                          
                                                                          # Sender selection
                                                                          h3(display_text[50]),
                                                                          helpText(display_text[51]),
                                                                          checkboxGroupButtons("Sender_input_msg",
                                                                                               "",
                                                                                               display_text[52]),
                                                                          
                                                                          # Time selection
                                                                          h3(display_text[53]),
                                                                          helpText(display_text[54]),
                                                                          dateRangeInput("date_range_messages",
                                                                                         label = display_text[55],
                                                                                         start = "2016-01-01",
                                                                                         end = NULL,
                                                                                         format = "dd-mm-yyyy",
                                                                                         startview = "year",
                                                                                         weekstart = 1,
                                                                                         language = landing_page_language,
                                                                                         autoclose = TRUE,
                                                                                         separator = display_text[56])
                                                                          
                                                                          # End sidebar panel
                                                             ),
                                                             
                                                             # Main Panel
                                                             mainPanel(
                                                               
                                                               # Plot 1
                                                               h1(display_text[57],align = "center"),
                                                               HTML(display_text[58]),
                                                               HTML("<br><br>"),
                                                               addSpinner(plotOutput("message1",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # Plot 2
                                                               h1(display_text[59],align = "center"),
                                                               HTML("<br><br>"),
                                                               addSpinner(plotOutput("tokensbwah1",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # plot 3
                                                               addSpinner(plotOutput("tokensbwah2",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8")
                                                               
                                                               # End main panel
                                                             ),
                                                             
                                                             # end tab panel
                                                             width = 6, offset = 5),
                                                    
                                                    ##################################### RESULTS: LINKS SUBPAGE ####
                                                    tabPanel(display_text[60],
                                                             
                                                             # sidebar panel
                                                             sidebarPanel(h3(display_text[48], align = "center"),
                                                                          tags$p(display_text[61]),
                                                                          
                                                                          # sender selection
                                                                          h3(display_text[50]),
                                                                          helpText(display_text[51]),
                                                                          checkboxGroupButtons("Sender_input_links",
                                                                                               "",
                                                                                               display_text[62]),
                                                                          
                                                                          # timespan selection
                                                                          h3(display_text[55]),
                                                                          helpText(display_text[54]),
                                                                          dateRangeInput("date_range_links",
                                                                                         label = display_text[55],
                                                                                         start = "2016-01-01",
                                                                                         end = NULL,
                                                                                         format = "dd-mm-yyyy",
                                                                                         startview = "year",
                                                                                         weekstart = 1,
                                                                                         language = landing_page_language,
                                                                                         autoclose = TRUE,
                                                                                         separator = display_text[56]),
                                                                          
                                                                          # Link Minimum selection
                                                                          h3(display_text[63]),
                                                                          helpText(display_text[64]),
                                                                          sliderInput("LinkMinimum",
                                                                                      "",
                                                                                      min = 1,
                                                                                      max = 100,
                                                                                      value = 5)
                                                                          
                                                                          # End sidebar panel
                                                             ),
                                                             
                                                             # Main Panel
                                                             mainPanel(
                                                               
                                                               # Plot 1
                                                               h3(display_text[65], align = "center"),
                                                               HTML(display_text[58]),
                                                               addSpinner(plotOutput("links4",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # plot 2
                                                               addSpinner(plotOutput("links2",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # plot 3
                                                               addSpinner(plotOutput("links1",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                             ),
                                                             
                                                             width = 6, offset = 5),
                                                    
                                                    ##################################### RESULTS: SMILIES SUBPAGE ####
                                                    tabPanel(display_text[66],
                                                             
                                                             # sidebar panel
                                                             sidebarPanel(h3(display_text[48], align = "center"),
                                                                          tags$p(display_text[67]),
                                                                          
                                                                          # sender selection
                                                                          h3(display_text[50]),
                                                                          helpText(display_text[51]),
                                                                          checkboxGroupButtons("Sender_input_smilies",
                                                                                               "",
                                                                                               display_text[52]),
                                                                          
                                                                          # time range selection
                                                                          h3(display_text[53]),
                                                                          helpText(display_text[54]),
                                                                          dateRangeInput("date_range_smilies",
                                                                                         label = display_text[55],
                                                                                         start = "2016-01-01",
                                                                                         end = NULL,
                                                                                         format = "dd-mm-yyyy",
                                                                                         startview = "year",
                                                                                         weekstart = 1,
                                                                                         language = landing_page_language,
                                                                                         autoclose = TRUE,
                                                                                         separator = display_text[56]),
                                                                          
                                                                          # smilie minimum selection
                                                                          h3(display_text[63]),
                                                                          helpText(display_text[68]),
                                                                          sliderInput("SmilieMinimum",
                                                                                      "", min = 1,
                                                                                      max = 100,
                                                                                      value = 5)
                                                                          
                                                             ),
                                                             
                                                             # Main Panel
                                                             mainPanel(
                                                               
                                                               # Plot 1
                                                               h3(display_text[69], align = "center"),
                                                               HTML(display_text[58]),
                                                               addSpinner(plotOutput("smilies4",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # Plot 2
                                                               addSpinner(plotOutput("smilies2",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # Plot 3
                                                               addSpinner(plotOutput("smilies1",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # end main panel
                                                             ),
                                                             
                                                             # end tabpanel
                                                             width = 6, offset = 5),
                                                    
                                                    ##################################### RESULTS: EMOJI SUBPAGE ####
                                                    tabPanel(display_text[70],
                                                             
                                                             # sidebar panel
                                                             sidebarPanel(h3(display_text[48], align = "center"),
                                                                          tags$p(display_text[71]),
                                                                          
                                                                          # sender selection
                                                                          h3(display_text[50]),
                                                                          helpText(display_text[51]),
                                                                          checkboxGroupButtons("Sender_input_emoji",
                                                                                               "",
                                                                                               display_text[62]),
                                                                          
                                                                          # timeframe selection
                                                                          h3(display_text[53]),
                                                                          helpText(display_text[54]),
                                                                          dateRangeInput("date_range_emoji",
                                                                                         label = display_text[55],
                                                                                         start = "2016-01-01",
                                                                                         end = NULL,
                                                                                         format = "dd-mm-yyyy",
                                                                                         startview = "year",
                                                                                         weekstart = 1,
                                                                                         language = landing_page_language,
                                                                                         autoclose = TRUE,
                                                                                         separator = display_text[56]),
                                                                          
                                                                          # minimum emoji selection
                                                                          h3(display_text[63]),
                                                                          helpText(display_text[72]),
                                                                          sliderInput("EmojiMinimum",
                                                                                      "",
                                                                                      min = 1,
                                                                                      max = 100,
                                                                                      value = 50)
                                                                          
                                                                          
                                                                          # end sidebar panel
                                                             ),
                                                             
                                                             # Main Panel
                                                             mainPanel(
                                                               
                                                               # Plot 1
                                                               h3(display_text[73],
                                                                  align = "center"),
                                                               HTML(display_text[58]),
                                                               addSpinner(plotOutput("emoji4",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # Plot 2
                                                               addSpinner(plotOutput("emoji2",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # Plot 3
                                                               addSpinner(plotOutput("emoji1",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # end main panel
                                                             ),
                                                             
                                                             # end tabpanel
                                                             width = 6, offset = 5),
                                                    
                                                    
                                                    ##################################### RESULTS: REPLYTIMES SUBPAGE ####
                                                    tabPanel(display_text[74],
                                                             
                                                             # sidebar panel
                                                             sidebarPanel(h3(display_text[48], align = "center"),
                                                                          
                                                                          tags$p(display_text[75]),
                                                                          
                                                                          # sender selection
                                                                          h3(display_text[50]),
                                                                          helpText(display_text[51]),
                                                                          checkboxGroupButtons("Sender_input_replies",
                                                                                               "",
                                                                                               display_text[52]),
                                                                          
                                                                          # timeframe selection
                                                                          h3(display_text[53]),
                                                                          helpText(display_text[54]),
                                                                          dateRangeInput("date_range_replies",
                                                                                         label = display_text[55],
                                                                                         start = "2016-01-01",
                                                                                         end = NULL,
                                                                                         format = "dd-mm-yyyy",
                                                                                         startview = "year",
                                                                                         weekstart = 1,
                                                                                         language = landing_page_language,
                                                                                         autoclose = TRUE,
                                                                                         separator = display_text[56])
                                                                          
                                                                          
                                                             ),
                                                             
                                                             # Main Panel
                                                             mainPanel(
                                                               
                                                               # Plot 1
                                                               h3(display_text[74], align = "center"),
                                                               HTML(display_text[58]),
                                                               addSpinner(plotOutput("replytime1",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8"),
                                                               HTML("<br><br>"),
                                                               
                                                               # Plot 2
                                                               addSpinner(plotOutput("replytime2",
                                                                                     height = "600px"),
                                                                          spin = "circle",
                                                                          color = "#1E8CC8")
                                                               
                                                               # End main panel
                                                             ),
                                                             
                                                             # end tab panel
                                                             width = 6, offset = 5)
                                                    
                                                    
                                                    # End tabset panel
                                        )
                                        
                                        
                                        
                                        # End tab Panel
                               ),
                               
                               ##################################### RESULTS: IMPRESSUM PAGE ####
                               tabPanel(display_text[76],
                                        column(tags$p(
                                          HTML(display_text[77])),
                                          width = 6, offset = 5))
                               
                               # End navbarpage
                    ),
                    
                    # Add GESIs footer
                    tags$footer(includeHTML("www/gesis-footer.html"))
                    
                    # End ui
)

###################################################################################### SECURING APP WITH SHINYMANAGER #####

# Wrapping UI with secure_app for password protection
ui <- shinymanager::secure_app(
  app_ui,
  language = landing_page_language,
  
  head_auth = tagList(
    tags$link(rel = "stylesheet", href = "package/dist/gesis-web.css"),
    tags$style(HTML("
  :root{
    --header-h:64px;
    --banner-h:180px;
    --gap-top:0px;
  }

  /* Fixed micro header */
  #gesis-micro-header{ position:fixed; top:0; left:0; right:0; z-index:1030; }

  /* Full-width banner behind login */
  .panel-auth::before{
    content:''; position:fixed; top:var(--header-h); left:0; right:0; height:var(--banner-h);
    background:url('banner-microsite-07.svg') center/cover no-repeat; z-index:1020;
  }

  /* Auth wrapper spacing */
  .panel-auth{
    padding-top:calc(var(--header-h) + var(--banner-h) + var(--gap-top)) !important;
    box-sizing:border-box;
    min-height:100dvh;
  }

  /* Keep login card constrained and centered */
  .panel-auth > .panel,
  .panel-auth .panel.panel-default,
  .panel-auth .auth-panel{
    width:min(560px, 100%);
    margin:0 auto;
  }

  /* Banner title/logo overlay */
  #banner-overlay{ position:fixed; top:var(--header-h); left:0; right:0; height:var(--banner-h); z-index:1025; pointer-events:none; }
  #banner-overlay .page-banner.microsite,
  #banner-overlay .page-banner--inner{ background:transparent !important; margin:0 !important; }

  html,body{ height:100%; overflow-x:hidden; }

  /* Disable footer on shinymanager login page */
  .page-footer{ display:none !important; }

  @media (max-width:768px){
    :root{ --banner-h:140px; --gap-top:40px; }
  }
"))
    
    

    
    
  ),
  
  tags_top = tagList(
    tags$div(id = "gesis-micro-header", includeHTML("www/gesis-micro-header.html")),
    tags$div(id = "banner-overlay", includeHTML("www/gesis-microsite-banner.html"))
  ),
  
  tags_bottom = tagList(
    #includeHTML("<br><br><br><br>"),
    includeHTML("www/gesis-footer.html")  # no wrapper; the file already has <footer class="page-footer">
  )
)







###################################################################################### SHINY SERVER LOGIC #####

# Defining server logic
server <- function(input, output, session) {
  
  # allow reconnection (improves mobile phone UX)
  session$allowReconnect(TRUE)
  observeEvent(input$keepalive, function(...) {}, ignoreInit = TRUE)
  
  ################################### BASIC SETUP ####
  
  #### Creating Slideshow with SlickR
  output$slickr <- renderSlickR({
    imgs <- list.files("./www/Slideshow", pattern = ".png", full.names = TRUE)
    slickR(imgs)
  })
  
  # creating empty reactive value for storing uploaded data
  rv <- reactiveValues(data = NULL)
  
  # Detecting mobile browser
  device <- reactive({shinybrowser::get_device()})
  is_mobile  <- reactive({ device() %in% c("Mobile","Tablet") })
  
  
  ################################### STYLING, BUTTONS, HIDE/UNHIDE ELEMENTS ####
  
  # mapping shiny tabs to GESIS microsite tabs
  observeEvent(input$go_tab, {
    updateNavbarPage(session, "ChatDashboard", selected = input$go_tab)
  })
  
  
  # hiding tabs that should only be shown conditionally
  hideTab("ChatDashboard",display_text[28],session = session)
  hideTab("ChatDashboard",display_text[46],session = session)
  hideTab("ChatDashboard",display_text[15],session = session)
  hideTab("ChatDashboard",display_text[87],session = session)
  session$sendCustomMessage(
    "microNavVisible",
    list(show = c(display_text[3], display_text[76]), active = display_text[3])
  )
  
  
  # unhide tabs when the button on first page is clicked
  observeEvent(input$IntroCheck, {
    
    # rerouting to data upload page and hiding Overview page
    showTab("ChatDashboard",display_text[15],session = session)
    hideTab("ChatDashboard",display_text[3],session = session)
    updateNavbarPage(session, "ChatDashboard",display_text[15])
    session$sendCustomMessage(
      "microNavVisible",
      list(show = c(display_text[15],display_text[76]), active = display_text[15])
    )
    
  })
  
  # hiding/unhiding person selection tab
  observeEvent(input$submit, {
    
    # rerouting to 'explore data' tab and hiding upload tab
    showTab("ChatDashboard",display_text[87],session = session)
    hideTab("ChatDashboard",display_text[15],session = session)
    updateNavbarPage(session, "ChatDashboard",display_text[87])
    session$sendCustomMessage(
      "microNavVisible",
      list(show = c(display_text[87],display_text[76]), active = display_text[87])
    )
    
  })
  
  # Submitting uploaded data
  observeEvent(input$person_submit, {
    
    # rerouting to 'explore data' tab and hiding upload tab
    showTab("ChatDashboard",display_text[28],session = session)
    hideTab("ChatDashboard",display_text[87],session = session)
    updateNavbarPage(session, "ChatDashboard",display_text[28])
    session$sendCustomMessage(
      "microNavVisible",
      list(show = c(display_text[28],display_text[76]), active = display_text[28])
    )
    
  })
  
  #### Hiding/unhiding buttons
  
  # hiding "next" buttons conditional on action
  shinyjs::hide("person_submit")
  observe({
    
    req(input$person_select)
    
    if (nchar(input$person_select) > 7) {
      shinyjs::show("person_submit")}
  })
  
  observe({
    shinyjs::hide("submit")
    
    if (!is.null(input$file))
      shinyjs::show("submit")
  })
  
  # hiding the download buttons if no file has been uploaded
  observe({
    shinyjs::hide("downloadData")
    
    if (is.data.frame(rv$data))
      shinyjs::show("downloadData")
  })
  
  observe({
    shinyjs::hide("downloadSelection")
    
    if (is.data.frame(rv$data))
      shinyjs::show("downloadSelection")
  })
  
  # hiding the row/column exclusion buttons if no file has been uploaded
  observe({
    shinyjs::hide("excludeRows")
    
    if (is.data.frame(rv$data))
      shinyjs::show("excludeRows")
  })
  
  observe({
    shinyjs::hide("RestoreRows")
    
    if (is.data.frame(rv$data))
      shinyjs::show("RestoreRows")
  })
  
  
  ################################### SHINYMANAGER/PASSWORD MANAGMENT ####
  
  # authentication either with url parameter forwarding or with preset credentials
  if (use_forwarding == TRUE) {
    
    # using manually set password for forwarding
    res_auth <- secure_server(
      check_credentials = check_credentials(rbind.data.frame(credentials,
                                                             
                                                             # This automatically adds the string at the end of the referral link as a username
                                                             # to the credentials file, ensuring that participant IDs generated by your
                                                             # survey tool can be used as  valid usernames. This enables data linking.
                                                             # TODO: Might need to be adapted to the structure of the referral link.
                                                             c(parseQueryString(session$clientData$url_search)[["id"]],
                                                               "7z9c72ud", # TODO: Set your forwarding password here
                                                               "2019-04-15",
                                                               NA,
                                                               FALSE,
                                                               "Participant Account"
                                                             )
                                                             
      ))
    )
    
  } else {
    
    # using user/password combinations from credentials.rds file
    res_auth <- secure_server(check_credentials = check_credentials(credentials))
    
  }
  
  
  # Logging Click timestamps
  observeEvent(res_auth$user, { log_event("login", session) })
  observeEvent(input$IntroCheck,    { log_event("IntroCheck_click", session) })
  observeEvent(input$submit,        { log_event("upload_submit_click", session) })
  observeEvent(input$person_submit, { log_event("person_submit_click", session) })
  observeEvent(input$donation,      { log_event("donation_click", session) })
  
  
  
  ################################### DATA UPLOAD & PARSING ####
  
  # trigger only when data is submitted
  observeEvent(input$submit, {
    
    # require inputs
    req(input$file)
    
    # show waiting animation
    waiter_show(html = waiting_screen1, color = "#1E8CC8")
    
    # parsing upload
    rv$data <- parse_chat(path = input$file$datapath,
                          anonymize = "add",
                          consent = consent_message)
    
    # saving old column names
    rv$FunctionColnames <- colnames(rv$data)
    
    # creating new column names for better display to participants
    colnames(rv$data) <- Colnames_ppt_display
    
    # making an internal copy for column and row selection and
    # better data display
    rv$copy <- rv$data
    
    # Changing formatting of columns with multiple values per cell
    # for nicer display in datatable
    rv$copy[,6] <- as.character(lapply(rv$copy[,6],paste,collapse = ","))
    rv$copy[,7] <- as.character(lapply(rv$copy[,7],paste,collapse = ","))
    rv$copy[,8] <- as.character(lapply(rv$copy[,8],paste,collapse = ","))
    rv$copy[,9] <- as.character(lapply(rv$copy[,9],paste,collapse = ","))
    rv$copy[,10] <- as.character(lapply(rv$copy[,10],paste,collapse = ","))
    rv$copy[,13] <- as.character(lapply(rv$copy[,13],paste,collapse = ","))
    rv$copy[,14] <- as.character(lapply(rv$copy[,14],paste,collapse = ","))
    rv$copy[,15] <- as.character(lapply(rv$copy[,15],paste,collapse = ","))
    
    # replacing textual NAs with proper NAs
    rv$copy[,6][rv$copy[,6] == "NA"] <- NA
    rv$copy[,7][rv$copy[,7] == "NA"] <- NA
    rv$copy[,8][rv$copy[,8] == "NA"] <- NA
    rv$copy[,9][rv$copy[,9] == "NA"] <- NA
    rv$copy[,10][rv$copy[,10] == "NA"] <- NA
    rv$copy[,13][rv$copy[,13] == "NA"] <- NA
    rv$copy[,14][rv$copy[,14] == "NA"] <- NA
    rv$copy[,15][rv$copy[,15] == "NA"] <- NA
    
    # hide waiting animation
    waiter_hide()
    
  })
  
  ################################### RENDERING DATAFRAME
  
  # building user selection frame
  output$selection_frame <- renderDT({
    
    # require necessary inputs
    req(input$show_vars,rv$copy)
    
    # df
    name_frame <- cbind.data.frame("Echter Name" = unique(rv$copy[,2][rv$copy[,2] != "WhatsApp System Message"]),"Anonymisierter Name" = unique(rv$copy[,3][rv$copy[,3] != "WhatsApp System Message"]))
    
    # table
    datatable(name_frame)
    
  })
  
  # Reactive expression to get unique anonymized names
  anonymized_names <- reactive({
    req(rv$copy)
    unique(rv$copy[, 3][rv$copy[, 3] != "WhatsApp System Message"])
  })
  
  
  # rendering copy of the dataframe
  output$frame <- renderDT({
    
    # require necessary inputs
    req(input$show_vars,rv$copy)
    
    # only displaying data if at least two columns are selected, do nothing if less are selected
    if (length(input$show_vars) >= 2) {
      
      # coloring non-donateable columns grey after checking if they're present
      color_identifier <- colnames(rv$copy[as.numeric(rownames(rv$copy)), intersect(as.character(input$show_vars), colnames(rv$copy)), drop = FALSE])[colnames(rv$copy[as.numeric(rownames(rv$copy)), intersect(as.character(input$show_vars), colnames(rv$copy)), drop = FALSE])
 %in% Colnames_exclude_pii]
      
      # inner if
      if (length(color_identifier) > 0) {datatable(rv$copy[,c(input$show_vars)],
                                                   options = list(scrollY = "750px",
                                                                  scrollX = TRUE,
                                                                  ordering = FALSE,
                                                                  language = list(url = datatable_language)
                                                                  
                                                                  ,columnDefs = list(list(
                                                                    targets = "_all",
                                                                    render = JS(
                                                                      "function(data, type, row, meta) {",
                                                                      "return type === 'display' && data != null && data.length > 35 ?",
                                                                      "'<span title=\"' + data + '\">' + data.substr(0, 50) + '...</span>' : data;",
                                                                      "}")))
                                                                  
                                                                  # end inner if                
                                                   )) %>% formatStyle(color_identifier,backgroundColor = "lightgrey")}
      
      # inner else
      else{datatable(rv$copy[,c(input$show_vars)], options = list(scrollY = "750px",
                                                                  scrollX = TRUE,
                                                                  ordering = F,
                                                                  language = list(url = datatable_language)
                                                                  
                                                                  
                                                                  ,columnDefs = list(list(
                                                                    targets = "_all",
                                                                    render = JS(
                                                                      "function(data, type, row, meta) {",
                                                                      "return type === 'display' && data != null && data.length > 35 ?",
                                                                      "'<span title=\"' + data + '\">' + data.substr(0, 50) + '...</span>' : data;",
                                                                      "}")))
                                                                  # End  inner else                                                        
      ))}
      
      # outer else
    } else{
      
      
      # popup to reset dataframe if less than 2 columns are selected
      shinyalert(display_text[78],
                 type = "info",
                 text = display_text[79],
                 showConfirmButton = TRUE,
                 confirmButtonText = "OK",
                 closeOnEsc = FALSE,
                 closeOnClickOutside = FALSE)
      
      # change selection to original selection if less than 2 columns are selected
      updatePickerInput(session,
                        "show_vars",
                        choices = colnames(rv$data),
                        selected = colnames(rv$data)[c(1,3,8,10,12,13,14,15,17:19)],,
                        options  = pickerOptions(
                          mobile = is_mobile(),
                          selectedTextFormat = "count",
                          countSelectedText  = "{0} Spalten ausgewählt",
                          container = if (is_mobile()) "body" else NULL
                        ),
                        choicesOpt = list(style = c("color:black;font-weight: bold;",
                                                    "background:lightgrey;color:black",
                                                    "color:black;font-weight: bold;",
                                                    "background:lightgrey;color:black",
                                                    "background:lightgrey;color:black",
                                                    "background:lightgrey;color:black",
                                                    "background:lightgrey;color:black",
                                                    "color:black;font-weight: bold;",
                                                    "background:lightgrey;color:black",
                                                    "color:black;font-weight: bold;",
                                                    "background:lightgrey;color:black",
                                                    "color:black;font-weight: bold;",
                                                    "color:black;font-weight: bold;",
                                                    "color:black;font-weight: bold;",
                                                    "color:black;font-weight: bold;",
                                                    "background:lightgrey;color:black",
                                                    "color:black;font-weight: bold;",
                                                    "color:black;font-weight: bold;",
                                                    "color:black;font-weight: bold;")))
      # end outer else
    }
    
    # end renderDT  
  })
  
  
  ################################### DATA SELECTION & DISPLAY ####
  
  # row exclusion
  observeEvent(c(input$excludeRows,input$show_vars),{
    
    # require inputs
    req(rv$copy,input$show_vars,input$frame_rows_selected)
    
    # subset copy
    rv$copy <- rv$copy[-c(input$frame_rows_selected),]
    
  })
  
  
  # row restoration
  observeEvent(c(input$RestoreRows),{
    
    # resetting copy
    rv$copy <- rv$data
    
    # Changing formatting of columns with multiple values per cell
    # for nicer display in datatable
    rv$copy[,6] <- as.character(lapply(rv$copy[,6],paste,collapse = ","))
    rv$copy[,7] <- as.character(lapply(rv$copy[,7],paste,collapse = ","))
    rv$copy[,8] <- as.character(lapply(rv$copy[,8],paste,collapse = ","))
    rv$copy[,9] <- as.character(lapply(rv$copy[,9],paste,collapse = ","))
    rv$copy[,10] <- as.character(lapply(rv$copy[,10],paste,collapse = ","))
    rv$copy[,13] <- as.character(lapply(rv$copy[,13],paste,collapse = ","))
    rv$copy[,14] <- as.character(lapply(rv$copy[,14],paste,collapse = ","))
    rv$copy[,15] <- as.character(lapply(rv$copy[,15],paste,collapse = ","))
    
    # replacing textual NAs with proper NAs
    rv$copy[,6][rv$copy[,6] == "NA"] <- NA
    rv$copy[,7][rv$copy[,7] == "NA"] <- NA
    rv$copy[,8][rv$copy[,8] == "NA"] <- NA
    rv$copy[,9][rv$copy[,9] == "NA"] <- NA
    rv$copy[,10][rv$copy[,10] == "NA"] <- NA
    rv$copy[,13][rv$copy[,13] == "NA"] <- NA
    rv$copy[,14][rv$copy[,14] == "NA"] <- NA
    rv$copy[,15][rv$copy[,15] == "NA"] <- NA
    
  })
  
  
  ################################### DATA DONATION ####
  observeEvent(input$donation, {
    
    # popup asking for consent to data donation
    shinyalert(display_text[81],
               "Ausgegraute Spalten werden automatisch von der Spende entfernt.",
               type = "success",
               showConfirmButton = TRUE,
               showCancelButton = TRUE,
               confirmButtonText = display_text[82],
               cancelButtonText = display_text[83],
               size = "m",
               closeOnEsc = FALSE,
               closeOnClickOutside = FALSE)
    
  })
  
  # only do this on confirmation
  observeEvent(c(input$shinyalert), {
    
    # only execute if users confirm
    if (req(input$shinyalert) == TRUE) {
      
      # removing non-donateable columns if present
      if (sum(colnames(rv$data[as.numeric(rownames(rv$copy)), intersect(as.character(input$show_vars), colnames(rv$data)), drop = FALSE]
) %in% Colnames_exclude_pii) > 0) {
        
        # removing columns that are not selected
        rv$copy2 <- rv$data[as.numeric(rownames(rv$copy)), intersect(as.character(input$show_vars), colnames(rv$data)), drop = FALSE]

        # removing columns containing private information
        rv$copy2 <- rv$copy2[,!(colnames(rv$copy2) %in% Colnames_exclude_pii)]
        
        # popup for auto-removal of columns
        # # removed for GESIS-study as this is covered in other texts
        #shinyalert(display_text[85],
        #           type = "error",
        #           text = paste(paste(Colnames_exclude_pii, collapse = ", "), display_text[86]),
        #           showConfirmButton = TRUE,
        #           confirmButtonText = "OK",
        #           closeOnEsc = FALSE,
        #           closeOnClickOutside = FALSE)
        
        
      } else {
        
        # making a copy for data donation with only the selected columns (Rows are already updated at this point)
        rv$copy2 <- rv$data[as.numeric(rownames(rv$copy)), intersect(as.character(input$show_vars), colnames(rv$data)), drop = FALSE]

        
      }
      
      # showing waiter
      waiter_show(html = waiting_screen2,color = "#1E8CC8")
      
      # resetting old column names so that plots can be generated correctly
      colnames(rv$data) <- rv$FunctionColnames
      
      # Add anonymized meta-information as attributes
      attr(rv$copy2, "donor") <- input$person_select
      attr(rv$copy2, "parsedAt") <- attributes(rv$copy)["parsedAt"]
      attr(rv$copy2, "language")  <- attributes(rv$copy)["language"]
      attr(rv$copy2, "detectedOS")  <- attributes(rv$copy)["detectedOS"]
      
      # getting additional info about client browser and device
      attr(rv$copy2, "clientOS")     <- shinybrowser::get_os()
      attr(rv$copy2, "clientDevice") <- shinybrowser::get_device()
      
      # hashing to get a unique filename to not overwrite a file if the same person decides to upload multiple chats
      LocalFilename <- sprintf("%s_%s_%s.rds",
                               reactiveValuesToList(res_auth)$user,
                               format(Sys.time(), "%Y-%m-%d_%H-%M-%S"),   # safe for all OS
                               digest(rv$copy2, algo = "sha512")
      )
      
      # creating server keypair object from stored RSA keys
      key_pair_Server <- cyphr::keypair_openssl(pub = "./ServerFolder", key = "./ServerFolder", envelope = TRUE)
      
      # encrypting object
      rv$copy2_encrypted <- encrypt_object(rv$copy2,key_pair_Server)
      
      # only save if save_to_server == TRUE
      if (save_to_server == TRUE) {
        
        # saving object to disk in encrypted form (This is specific to Linux servers, would need to be adapted on Windows - see below)
        saveRDS(rv$copy2_encrypted,file = paste("./UserData/",LocalFilename, sep = ""))
        
        # saving object to disk in encrypted form (Windows)
        # LocalFilename <- gsub(":","_",LocalFilename)
        # saveRDS(rv$copy2_encrypted,file = paste(".//UserData//",LocalFilename, sep = ""))
        
      }
      
      # removing copies from workspace by overwriting with NULL
      rv$copy2 <- NULL
      rv$copy2_encrypted <- NULL
      
      # waiter
      waiter_hide()
      
      # routing to results tab and hiding explore data tab
      #showTab("ChatDashboard",display_text[46],session = session)
      #hideTab("ChatDashboard",display_text[28],session = session)
      #updateNavbarPage(session, "ChatDashboard",display_text[46])
      #session$sendCustomMessage(
      #  "microNavVisible",
      #  list(show = c(display_text[46], display_text[76]), active = display_text[46])
      #)
      
      # NEW: Success popup
      shinyalert(
        inputId = "donation_success_alert",
        title = "Spende erfolgreich!", # Or use a display_text variable
        text = "Vielen Dank! Ihre anonymisierte Datenspende wurde sicher übermittelt. \n\n Auf der nächsten Seite sehen Sie einige Statistiken zu Ihrem Chatverhalten als zusätzliches Dankeschön für Ihre Teilnahme. Diese sind nur für Sie einsehbar und werden mit Verlassen der Seite restlos gelöscht. \n\n Sie können diese Website nun jederzeit schließen.",
        type = "success",
        showConfirmButton = TRUE,
        confirmButtonText = "Weiter",
        callbackR = function(x) {
          if (x) {
            # This code runs AFTER the user clicks "Weiter"
            showTab("ChatDashboard",display_text[46],session = session)
            hideTab("ChatDashboard",display_text[28],session = session)
            updateNavbarPage(session, "ChatDashboard",display_text[46])
            session$sendCustomMessage(
              "microNavVisible",
              list(show = c(display_text[46], display_text[76]), active = display_text[46])
            )
          }
        }
      )
      
      # waiter
      #waiter_hide()
      
    }
    
  } , ignoreInit = TRUE)
  
  
  
  
  
  
  ################################### DOWNLOADING ALL/PARSED DATA ####
  
  # Allow for download of parsed, complete data
  output$downloadData <- downloadHandler(
    filename = function() {
      paste(input$file$name, "_parsed.rds", sep = "\t")
    },
    content = function(file) {
      saveRDS(rv$data, file, version = 2)
    }
  )
  
  # Allow for download of parsed, current data selection
  output$downloadSelection <- downloadHandler(
    filename = function() {
      paste(input$file$name, "_parsed_selection.rds", sep = "\t")
    },
    content = function(file) {
      saveRDS(rv$data[as.numeric(rownames(rv$copy)), intersect(as.character(input$show_vars), colnames(rv$data)), drop = FALSE]
, file, version = 2)
    }
  )
  
  ####################### UPDATING INPUT SELECTION OPTIONS
  
  observeEvent(input$submit, {
    
    ### Updating selection of columns
    updatePickerInput(session,
                      "show_vars",
                      choices = colnames(rv$data),
                      selected = colnames(rv$data)[c(1,3,8,10,12,13,14,15,17:19)],
                      options  = pickerOptions(
                        mobile = is_mobile(),
                        selectedTextFormat = "count",
                        countSelectedText  = "{0} Spalten ausgewählt",
                        container = if (is_mobile()) "body" else NULL
                      ),
                      choicesOpt = list(style = c("color:black;font-weight: bold;",
                                                  "background:lightgrey;color:black",
                                                  "color:black;font-weight: bold;",
                                                  "background:lightgrey;color:black",
                                                  "background:lightgrey;color:black",
                                                  "background:lightgrey;color:black",
                                                  "background:lightgrey;color:black",
                                                  "color:black;font-weight: bold;",
                                                  "background:lightgrey;color:black",
                                                  "color:black;font-weight: bold;",
                                                  "background:lightgrey;color:black",
                                                  "color:black;font-weight: bold;",
                                                  "color:black;font-weight: bold;",
                                                  "color:black;font-weight: bold;",
                                                  "color:black;font-weight: bold;",
                                                  "background:lightgrey;color:black",
                                                  "color:black;font-weight: bold;",
                                                  "color:black;font-weight: bold;",
                                                  "color:black;font-weight: bold;")))
    
    ### Updating selection of donor
    updateSelectInput(session,
                      "person_select",
                      choices = c("",unique(as.character(rv$data[,3][rv$data[,3] != "WhatsApp System Message"]))),
                      selected = "")
    
    ### Updating all Sender selections for all analyses
    
    # Defining list of names for sender to select so we can exclude WhatsApp System Messages
    rv$NameList <- unique(as.character(rv$data[,2]))
    
    updateCheckboxGroupButtons(session,
                               "Sender_input_msg",
                               choices = rv$NameList[rv$NameList != "WhatsApp System Message"],
                               selected = rv$NameList[rv$NameList != "WhatsApp System Message"])
    
    
    updateCheckboxGroupButtons(session,
                               "Sender_input_links",
                               choices = rv$NameList[rv$NameList != "WhatsApp System Message"],
                               selected = rv$NameList[rv$NameList != "WhatsApp System Message"])
    
    updateCheckboxGroupButtons(session,
                               "Sender_input_smilies",
                               choices = rv$NameList[rv$NameList != "WhatsApp System Message"],
                               selected = rv$NameList[rv$NameList != "WhatsApp System Message"])
    
    updateCheckboxGroupButtons(session,
                               "Sender_input_emoji",
                               choices = rv$NameList[rv$NameList != "WhatsApp System Message"],
                               selected = rv$NameList[rv$NameList != "WhatsApp System Message"])
    
    
    updateCheckboxGroupButtons(session,
                               "Sender_input_replies",
                               choices = rv$NameList[rv$NameList != "WhatsApp System Message"],
                               selected = rv$NameList[rv$NameList != "WhatsApp System Message"])
    
    updateCheckboxGroupButtons(session,
                               "Sender_input_media",
                               choices = rv$NameList[rv$NameList != "WhatsApp System Message"],
                               selected = rv$NameList[rv$NameList != "WhatsApp System Message"])
    
    
    ### Updating all selected dates to the minimum and maximum timestamps in the uploaded chat
    
    updateDateRangeInput(session,
                         "date_range_messages",
                         start = anydate(rv$data[,1][1]),
                         end = anydate(rv$data[,1][length(rv$data[,1])]))
    
    
    updateDateRangeInput(session,
                         "date_range_links",
                         start = anydate(rv$data[,1][1]),
                         end = anydate(rv$data[,1][length(rv$data[,1])]))
    
    
    updateDateRangeInput(session,
                         "date_range_smilies",
                         start = anydate(rv$data[,1][1]),
                         end = anydate(rv$data[,1][length(rv$data[,1])]))
    
    
    updateDateRangeInput(session,
                         "date_range_emoji",
                         start = anydate(rv$data[,1][1]),
                         end = anydate(rv$data[,1][length(rv$data[,1])]))
    
    
    updateDateRangeInput(session,
                         "date_range_replies",
                         start = anydate(rv$data[,1][1]),
                         end = anydate(rv$data[,1][length(rv$data[,1])]))
    
    
    updateDateRangeInput(session,
                         "date_range_media",
                         start = anydate(rv$data[,1][1]),
                         end = anydate(rv$data[,1][length(rv$data[,1])]))
    
  })
  
  
  ################################### GENERATING PLOTS ####
  
  # Messages
  observeEvent(c(input$submit, input$MsgUpdate), {
    
    output$message1 <- renderPlot({
      req(rv$data)
      plot_messages(
        rv$data,
        names     = input$Sender_input_msg,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_messages, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_messages, "%Y-%m-%d"), " "))[2], " 23:59", sep = "")
      ) + labs(title = "Nachrichtenanzahl", x = "Absender", y = "Nachrichten")
    }, res = 100, height = 600)
    
    output$tokensbwah1 <- renderPlot({
      req(rv$data)
      plot_tokens(
        rv$data,
        names     = input$Sender_input_msg,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_messages, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_messages, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        plot      = "cumsum"
      ) + labs(title = "Wortanzahl (kumuliert)", x = "Datum", y = "Wörter (kumuliert)")
    }, res = 100, height = 600)
    
    output$tokensbwah2 <- renderPlot({
      req(rv$data)
      plot_tokens_over_time(
        rv$data,
        names     = input$Sender_input_msg,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_messages, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_messages, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        plot      = "heatmap"
      ) + labs(title = "Wörter – Aktivität nach Tageszeit", x = "Uhrzeit", y = "Wochentag", fill = "Wörter")
    }, res = 100, height = 600)
  })
  
  # Links
  observeEvent(c(input$submit, input$LinksUpdate), {
    
    output$links1 <- renderPlot({
      req(rv$data)
      plot_links(
        rv$data,
        plot      = "cumsum",
        names     = input$Sender_input_links,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_links, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_links, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$LinkMinimum
      ) + labs(title = "Geteilte Links (kumuliert)", x = "Datum", y = "Links (kumuliert)")
    }, res = 100, height = 600)
    
    output$links2 <- renderPlot({
      req(rv$data)
      plot_links(
        rv$data,
        plot      = "heatmap",
        names     = input$Sender_input_links,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_links, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_links, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$LinkMinimum
      ) + labs(title = "Links – Aktivität nach Tageszeit", x = "Uhrzeit", y = "Wochentag", fill = "Links")
    }, res = 100, height = 600)
    
    output$links4 <- renderPlot({
      req(rv$data)
      plot_links(
        rv$data,
        plot      = "splitbar",
        names     = input$Sender_input_links,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_links, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_links, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$LinkMinimum
      ) + labs(title = "Häufigste Domains", x = "Absender", y = "Häufigkeit")
    }, res = 100, height = 600)
  })
  
  # Smilies
  observeEvent(c(input$submit, input$SmilieUpdate), {
    
    output$smilies1 <- renderPlot({
      req(rv$data)
      plot_smilies(
        rv$data,
        plot      = "cumsum",
        names     = input$Sender_input_smilies,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_smilies, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_smilies, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$SmilieMinimum
      ) + labs(title = "Smilies (kumuliert)", x = "Datum", y = "Smilies (kumuliert)")
    }, res = 100, height = 600)
    
    output$smilies2 <- renderPlot({
      req(rv$data)
      plot_smilies(
        rv$data,
        plot      = "heatmap",
        names     = input$Sender_input_smilies,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_smilies, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_smilies, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$SmilieMinimum
      ) + labs(title = "Smilies – Aktivität nach Tageszeit", x = "Uhrzeit", y = "Wochentag", fill = "Smilies")
    }, res = 100, height = 600)
    
    output$smilies4 <- renderPlot({
      req(rv$data)
      plot_smilies(
        rv$data,
        plot      = "splitbar",
        names     = input$Sender_input_smilies,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_smilies, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_smilies, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$SmilieMinimum
      ) + labs(title = "Smilies nach Sender", x = "Absender", y = "Anzahl")
    }, res = 100, height = 600)
  })
  
  # Emoji
  observeEvent(c(input$submit, input$EmojiUpdate), {
    
    output$emoji1 <- renderPlot({
      req(rv$data)
      plot_emoji(
        rv$data,
        plot      = "cumsum",
        names     = input$Sender_input_emoji,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_emoji, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_emoji, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$EmojiMinimum
      ) + labs(title = "Emoji (kumuliert)", x = "Datum", y = "Emoji (kumuliert)")
    }, res = 100, height = 600)
    
    output$emoji2 <- renderPlot({
      req(rv$data)
      plot_emoji(
        rv$data,
        plot      = "heatmap",
        names     = input$Sender_input_emoji,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_emoji, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_emoji, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$EmojiMinimum
      ) + labs(title = "Emoji – Aktivität nach Tageszeit", x = "Uhrzeit", y = "Wochentag", fill = "Emoji")
    }, res = 100, height = 600)
    
    output$emoji4 <- renderPlot({
      req(rv$data)
      plot_emoji(
        rv$data,
        plot      = "splitbar",
        names     = input$Sender_input_emoji,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_emoji, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_emoji, "%Y-%m-%d"), " "))[2], " 23:59", sep = ""),
        min_occur = input$EmojiMinimum
      ) + labs(title = "Emoji nach Sender", x = "Absender", y = "Häufigkeit")
    }, res = 100, height = 600)
  })
  
  # Reply / Reaction times
  observeEvent(c(input$submit, input$ReplyUpdate), {
    
    output$replytime1 <- renderPlot({
      req(rv$data)
      plot_replytimes(
        rv$data,
        type      = "replytime",
        names     = input$Sender_input_replies,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_replies, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_replies, "%Y-%m-%d"), " "))[2], " 23:59", sep = "")
      ) + labs(title = "Antwortzeiten", x = "Minuten", y = "Log(Minuten) + 1")
    }, res = 100, height = 600)
    
    output$replytime2 <- renderPlot({
      req(rv$data)
      plot_replytimes(
        rv$data,
        type      = "reactiontime",
        names     = input$Sender_input_replies,
        starttime = paste(unlist(strsplit(format.Date(input$date_range_replies, "%Y-%m-%d"), " "))[1], " 00:00", sep = ""),
        endtime   = paste(unlist(strsplit(format.Date(input$date_range_replies, "%Y-%m-%d"), " "))[2], " 23:59", sep = "")
      ) + labs(title = "Reaktionszeiten", x = "Minuten", y = "Log(Minuten) + 1")
    }, res = 100, height = 600)
  })
  
  
}

##################################### RUNNING APPLICATION ####
shinyApp(ui = ui, server = server)
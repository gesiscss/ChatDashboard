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




###################################  LANGUAGE SETTINGS ####

# language setting for shinymanager authentication page
# see: https://datastorm-open.github.io/shinymanager/reference/use_language.html
landing_page_language <- "en"

# Check: https://cdn.datatables.net/plug-ins/1.10.11/i18n/ for a 
# list of different languages. Insert them by pasting the respective
# link according to the format below
datatable_language <- c('//cdn.datatables.net/plug-ins/1.10.11/i18n/English.json')

# import display text from csv file
ChatDashboard_DisplayText <- read.csv("./www/ChatDashboard_DisplayText.csv")

# Selecting column containing the text you want to display. English and German are preset options 
display_text <- ChatDashboard_DisplayText$English

# For changing the display of individual text variables, you can simply edit the file
# ./www/ChatDashboard_DisplayText.csv, add an additional column, and select it above.





###################################  SHINY SETTINGS ####

# Variable passed to WhatsR::parse_chat(). Automatically removes all chat messages from participants that did not post the EXACT consent_message into
# the chat. Setting this variable to NA will not remove any messages.
consent_message <- NA

# variable to control whether to use forwarding per url parameter or rely on pre-defined credentials for authentication
# TODO: If you are using url parameter forwarding, you need to adapt line 879 to extract the participant ID from your referral link.
# Default structure is: www.example-website.com/ChatDashboard?id=TestParticipant | Extracts: TestParticipant
use_forwarding <- FALSE

# Password to use for forwarding via url-parameter (only used if use_forwarding == TRUE)
# TODO: Set this as a character string in line 880

# saving donated files to server if TRUE, will not save any data if not TRUE
save_to_server <- TRUE

# setting upload file size limit
options(shiny.maxRequestSize = 50*1024^2)

# Set column names to be displayed to participants. This needs to be exactly 19 strings
# and does not determine whether these variables are displayed or not, but just how they are named
# in the display to participants
Colnames_ppt_display <- c("Timestamp",
                          "Sender",
                          "Sender_anonymized",
                          "Message",
                          "Message_simplified",
                          "Message_words",
                          "Links",
                          "Links_anonymized",
                          "Media",
                          "Media_anonymized",
                          "Locations",
                          "Locations_anonymized",
                          "Emoji",
                          "Emoji_description",
                          "Smilies",
                          "System_messages",
                          "Word_count",
                          "Time_order",
                          "Display_order")

# Set column names to be automatically excluded because they can contain PII (must occur in Colnames_ppt_display)
Colnames_exclude_pii <- c("Sender",
                          "Message",
                          "Message_simplified",
                          "Message_words",
                          "Links",
                          "Media",
                          "Locations",
                          "System_messages")



# Shiny Debugging Options (uncomment these to debug the app)
# options(shiny.error = browser)
# options(shiny.trace = TRUE)





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
  h4(display_text[1])
)

waiting_screen2 <- tagList(
  spin_flower(),
  h4(display_text[2])
)







###################################################################################### SHINY SERVER UI #####

# Define UI for ChatDashboard application
ui <- fluidPage(theme  = shinytheme("flatly"), window_title = "ChatDashboard",

##################################### UI SETUP ####

                ### Setting up shiny JS and shinyAlert
                useShinyjs(),

                # Background color
                setBackgroundColor("#ECE5DD"),
                useWaiter(),

                # Styling and other colors
                tags$style(type = 'text/css',
                           '.navbar { background-color: #25D366  ;}',
                           '.navbar-default .navbar-brand{color: white;}',
                           '.tab-panel{ background-color: red   ; color: white}',
                           '.nav navbar-nav li.active:hover a, .nav navbar-nav li.active a {
                            background-color: orange ;
                            border-color: purple    ;
                            }'
                ),

##################################### MAIN UI ####

                # Logo and App name in navbar page
                navbarPage(title = tags$img(height = 35,
                                            width = 35,
                                            src = "WhatsR_logo.png"),
                           id = "ChatDashboard",

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
                                                  HTML("<br><br><br>"),
                                           width = 6, offset = 3),

                                    # Images
                                    column(slickROutput("slickr",
                                                        width = "100%",
                                                        height = "100%"),
                                           HTML("<br><br>"),
                                           width = 6, offset = 3),

                                    # Heading 2
                                    column(tags$p(style = "text-align: justify;",
                                                  HTML(display_text[8]),
                                                  HTML(display_text[9]),
                                                  HTML("<br><br>")
                                                  ),
                                           width = 6, offset = 3),

                                    # Heading 3
                                    column(tags$p(style = "text-align: justify;",
                                                  HTML(display_text[10]),
                                                  HTML(display_text[11]),
                                                  HTML("<br><br>")
                                                  ),
                                           width = 6, offset = 3),

                                    # Heading 4
                                    column(tags$p(style = "text-align: justify;",
                                                  HTML(display_text[12]),
                                                  HTML(display_text[13]),
                                                  HTML("<br><br>")
                                                  ),
                                           width = 6, offset = 3),

                                    # Consent button
                                    column(12, align = "center",
                                           actionButton("IntroCheck",
                                                        label = display_text[14],
                                                        class = "btn-warning",
                                                        style = "color: #040607; background-color: #25D366; border-color: #040607"),
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
                                        fileInput(inputId = "file",
                                                  label = "",
                                                  accept = ".txt",
                                                  buttonLabel = display_text[20]
                                                  ),

                                        # Upload button
                                        actionButton(inputId = "submit",
                                                     label = display_text[21],
                                                     class = "btn-warning",
                                                     style = "color: #040607; background-color: #25D366; border-color: #040607")
                                      ),

                                      # Main panel
                                      mainPanel(
                                        column(
                                          tags$p(
                                            
                                            # Headline
                                            HTML(display_text[22]),
                                            
                                            # Text column
                                            tags$p(style = "text-align: justify;",
                                                   HTML(display_text[23]),
                                                   HTML("<br><br>"),
                                                   HTML(display_text[24]),
                                                   HTML("<br><br>"),
                                                   HTML(display_text[25]),
                                                   HTML("<br><br>")
                                                   ),

                                            # Images and Headlines
                                            HTML(display_text[26]),
                                            tags$img(height = "auto",
                                                     width = "100%",
                                                     src = "DataExport_Guide_Android.png"),
                                            HTML("<br><br>"),
                                            HTML(display_text[27]),
                                            tags$img(height = "auto",
                                                     width = "100%",
                                                     src = "WhatsApp_DataExport_iOS.png"),
                                            HTML("<br><br>"),

                                          # End paragraph
                                          ),

                                          # end column
                                          width = 10, offset = 1)
                                        
                                      # end main panel
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
                                     HTML("To link your survey responses to your anonymous chatting behavior, please indicate which person from the chat
                                          filled in the survey. We show the real sender names here so you can select the correct anoynmous indicator but real names will not be saved."),
                                     # TODO: Add text to file
                                     
                                     # spacer
                                     HTML("<br><br>"),
                                     
                                    # input selector
                                     selectInput("person_select",
                                                 label = "Which anonymous person from the chat answered the survey?", # TODO: Add text to file
                                                 choices = c(""),
                                                 selected = "",
                                                 multiple = FALSE),
                                     
                                     
                                     # action button
                                     actionButton("person_submit",
                                                  "Weiter", # TODO: Add text to file
                                                  style = "color: #040607; background-color: #25D366; border-color: #040607"),
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
                                     
         
                                     
                                   )
                                   

                                  ),


##################################### DATA EXPLORATION PAGE ####
                           tabPanel(display_text[28],
                                    
                                    # Sidebar Panel
                                    sidebarPanel(
                                      
                                      # Info text
                                      h2(display_text[29], align = "center"),
                                      HTML(display_text[30]),
                                      HTML("<br><br>"),
                                      HTML(display_text[31]),

                                      # column selection
                                      h3(display_text[32]),
                                      helpText(display_text[33]),
                                      pickerInput("show_vars",
                                                  display_text[34],
                                                  choices = c(""),
                                                  selected = c(""),
                                                  label = display_text[35],
                                                  multiple = TRUE,
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
                                                   style = "color: #040607; background-color: #25D366; border-color: #040607")

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
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # Plot 2
                                                           h1(display_text[59],align = "center"),
                                                           HTML("<br><br>"),
                                                           addSpinner(plotOutput("tokensbwah1",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # plot 3
                                                           addSpinner(plotOutput("tokensbwah2",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366")
                                                         
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
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # plot 2
                                                           addSpinner(plotOutput("links2",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # plot 3
                                                           addSpinner(plotOutput("links1",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366"),
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
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # Plot 2
                                                           addSpinner(plotOutput("smilies2",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # Plot 3
                                                           addSpinner(plotOutput("smilies1",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366"),
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
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # Plot 2
                                                           addSpinner(plotOutput("emoji2",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # Plot 3
                                                           addSpinner(plotOutput("emoji1",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366"),
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
                                                                      color = "#25D366"),
                                                           HTML("<br><br>"),
                                                           
                                                           # Plot 2
                                                           addSpinner(plotOutput("replytime2",
                                                                                 height = "600px"),
                                                                      spin = "circle",
                                                                      color = "#25D366")

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
)

# End ui
)

###################################################################################### SECURING APP WITH SHINYMANAGER #####

# Wrapping UI with secure_app for password protection
ui <- secure_app(ui,language = landing_page_language)


###################################################################################### SHINY SERVER LOGIC #####

# Defining server logic
server <- function(input, output, session) {

  ################################### BASIC SETUP ####

  #### Creating Slideshow with SlickR
  output$slickr <- renderSlickR({
    imgs <- list.files("./www/Slideshow", pattern = ".png", full.names = TRUE)
    slickR(imgs)
  })

  # creating empty reactive value for storing uploaded data
  rv <- reactiveValues(data = NULL)

  ################################### STYLING, BUTTONS, HIDE/UNHIDE ELEMENTS ####

  # hiding tabs that should only be shown conditionally
  hideTab("ChatDashboard",display_text[28],session = session)
  hideTab("ChatDashboard",display_text[46],session = session)
  hideTab("ChatDashboard",display_text[15],session = session)
  hideTab("ChatDashboard",display_text[87],session = session)

  # unhide tabs when the button on first page is clicked
  observeEvent(input$IntroCheck, {

    # rerouting to data upload page and hiding Overview page
    showTab("ChatDashboard",display_text[15],session = session)
    hideTab("ChatDashboard",display_text[3],session = session)
    updateNavbarPage(session, "ChatDashboard",display_text[15])

  })
  
  # hiding/unhiding person selection tab
  observeEvent(input$submit, {
    
    # rerouting to 'explore data' tab and hiding upload tab
    showTab("ChatDashboard",display_text[87],session = session)
    hideTab("ChatDashboard",display_text[15],session = session)
    updateNavbarPage(session, "ChatDashboard",display_text[87])
    
  })
  
  # Submitting uploaded data
  observeEvent(input$person_submit, {
    
    # rerouting to 'explore data' tab and hiding upload tab
    showTab("ChatDashboard",display_text[28],session = session)
    hideTab("ChatDashboard",display_text[87],session = session)
    updateNavbarPage(session, "ChatDashboard",display_text[28])
    
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
                                                              c(unlist(strsplit(strsplit(session$clientData$url_search,"&")[[1]][1],"="))[2],
                                                                "password", # TODO: Set your forwarding password here!
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

  

  ################################### DATA UPLOAD & PARSING ####

  # trigger only when data is submitted
  observeEvent(input$submit, {

    # require inputs
    req(input$file)

    # show waiting animation
    waiter_show(html = waiting_screen1, color = "#25D366")

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
    name_frame <- cbind.data.frame("Real Name" = unique(rv$copy[,2][rv$copy[,2] != "WhatsApp System Message"]),"Anonymized Name" = unique(rv$copy[,3][rv$copy[,3] != "WhatsApp System Message"]))
    
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
      color_identifier <- colnames(rv$copy[as.numeric(rownames(rv$copy)),c(input$show_vars)])[colnames(rv$copy[as.numeric(rownames(rv$copy)),c(input$show_vars)]) %in% Colnames_exclude_pii]
      
      # inner if
      if (length(color_identifier) > 0) {datatable(rv$copy[,c(input$show_vars)],
                                                   options = list(scrollY = "750px",
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
                 display_text[79],
                 showConfirmButton = TRUE,
                 confirmButtonText = "OK",
                 closeOnEsc = FALSE,
                 closeOnClickOutside = FALSE,
                 inputId = "2ColumnAlert")
      
      # change selection to original selection if less than 2 columns are selected
      updatePickerInput(session,
                        "show_vars",
                        choices = colnames(rv$data),
                        selected = colnames(rv$data)[c(1,3,8,10,12,13,14,15,17:19)],
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
               display_text[81],
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
  observeEvent(c(input$shinyalert,rv$copy,input$show_vars), {

    # only execute if users confirm
    if (req(input$shinyalert) == TRUE) {

      # removing non-donateable columns if present
      if (sum(colnames(rv$data[as.numeric(rownames(rv$copy)),c(input$show_vars)]) %in% Colnames_exclude_pii) > 0) {

        # removing columns that are not selected
        rv$copy2 <- rv$data[as.numeric(rownames(rv$copy)),c(input$show_vars)]

        # removing columns containing private information
        rv$copy2 <- rv$copy2[,!(colnames(rv$copy2) %in% Colnames_exclude_pii)]

        # popup for auto-removal of columns
        shinyalert(display_text[85],
                   type = "error",
                   paste(paste(Colnames_exclude_pii,collapse = ", "),display_text[86]),
                   showConfirmButton = TRUE,
                   confirmButtonText = "OK",
                   closeOnEsc = FALSE,
                   closeOnClickOutside = FALSE,
                   inputId = "autoremoveAlert")


      } else {

        # making a copy for data donation with only the selected columns (Rows are already updated at this point)
        rv$copy2 <- rv$data[as.numeric(rownames(rv$copy)),c(input$show_vars)]

        }

      # showing waiter
      waiter_show(html = waiting_screen2,color = "#25D366")

      # resetting old column names so that plots can be generated correctly
      colnames(rv$data) <- rv$FunctionColnames
      
      # Add anonymized meta-information as attributes
      attr(rv$copy2, "donor") <- input$person_select
      attr(rv$copy2, "parsedAt") <- attributes(rv$copy)["parsedAt"]
      attr(rv$copy2, "language")  <- attributes(rv$copy)["language"]
      attr(rv$copy2, "detectedOS")  <- attributes(rv$copy)["detectedOS"]

      # hashing to get a unique filename to not overwrite a file if the same person decides to upload multiple chats
      LocalFilename <- sprintf("%s_%s_%s.rds",reactiveValuesToList(res_auth)$user,gsub(" ","_",Sys.time()), digest(rv$copy2,algo = "sha512"))

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

      # routing to results tab and hiding explore data tab
      showTab("ChatDashboard",display_text[46],session = session)
      hideTab("ChatDashboard",display_text[28],session = session)
      updateNavbarPage(session, "ChatDashboard",display_text[46])

      # waiter
      waiter_hide()

    }

  })






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
      saveRDS(rv$data[as.numeric(rownames(rv$copy)),c(input$show_vars)], file, version = 2)
    }
  )

  ####################### UPDATING INPUT SELECTION OPTIONS

  observeEvent(input$submit, {
    
    ### Updating selection of columns
    updatePickerInput(session,
                      "show_vars",
                      choices = colnames(rv$data),
                      selected = colnames(rv$data)[c(1,3,8,10,12,13,14,15,17:19)],
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

  # updating the plots when submission button is pressed or a new dataset is uploaded
  
  # updating for message plots
  observeEvent(c(input$submit,input$MsgUpdate),{
    
    # Rendering messages plot 1
    output$message1 <- renderPlot({

      req(rv$data);
      plot_messages(rv$data,
                    names = input$Sender_input_msg,
                    starttime = paste(unlist(strsplit(format.Date(input$date_range_messages,"%Y-%m-%d")," "))[1]," 00:00", sep = ""),
                    endtime = paste(unlist(strsplit(format.Date(input$date_range_messages,"%Y-%m-%d")," "))[2]," 00:00", sep = ""))},
      res = 100, height = 600)


    # Rendering messages plot 2
    output$tokensbwah1 <- renderPlot({

      req(rv$data);
      plot_tokens(rv$data,
                  names = input$Sender_input_msg,
                  starttime = paste(unlist(strsplit(format.Date(input$date_range_messages,"%Y-%m-%d")," "))[1]," 00:00"),
                  endtime = paste(unlist(strsplit(format.Date(input$date_range_messages,"%Y-%m-%d")," "))[2]," 00:00"),
                  plot = "cumsum")},
      res = 100, height = 600)


    # Rendering messages plot 3
    output$tokensbwah2 <- renderPlot({

      req(rv$data);
      plot_tokens_over_time(rv$data,
                            names = input$Sender_input_msg,
                            starttime = paste(unlist(strsplit(format.Date(input$date_range_messages,"%Y-%m-%d")," "))[1]," 00:00"),
                            endtime = paste(unlist(strsplit(format.Date(input$date_range_messages,"%Y-%m-%d")," "))[2]," 00:00"),
                            plot = "heatmap")},
      res = 100, height = 600)

    })

  # updating for links plots
  observeEvent(c(input$submit,input$LinksUpdate),{

    # Rendering links plot 1
    output$links1 <- renderPlot({

      req(rv$data);
      plot_links(rv$data,
                 plot = "cumsum",
                 names = input$Sender_input_links,
                 starttime = paste(unlist(strsplit(format.Date(input$date_range_links,"%Y-%m-%d")," "))[1]," 00:00"),
                 endtime = paste(unlist(strsplit(format.Date(input$date_range_links,"%Y-%m-%d")," "))[2]," 00:00"),
                 min_occur = input$LinkMinimum)},
      res = 100, height = 600)

    # Rendering links plot 2
    output$links2 <- renderPlot({

      req(rv$data);
      plot_links(rv$data,
                 plot = "heatmap",
                 names = input$Sender_input_links,
                 starttime = paste(unlist(strsplit(format.Date(input$date_range_links,"%Y-%m-%d")," "))[1]," 00:00"),
                 endtime = paste(unlist(strsplit(format.Date(input$date_range_links,"%Y-%m-%d")," "))[2]," 00:00"),
                 min_occur = input$LinkMinimum)},
      res = 100, height = 600)

    # Rendering links plot 3
    output$links4 <- renderPlot({

      req(rv$data);
      plot_links(rv$data,
                 plot = "splitbar",
                 names = input$Sender_input_links,
                 starttime = paste(unlist(strsplit(format.Date(input$date_range_links,"%Y-%m-%d")," "))[1]," 00:00"),
                 endtime = paste(unlist(strsplit(format.Date(input$date_range_links,"%Y-%m-%d")," "))[2]," 00:00"),
                 min_occur = input$LinkMinimum)},
      res = 100, height = 600)

  })

  # updating for smilie plots
  observeEvent(c(input$submit,input$SmilieUpdate),{

    # Rendering smilies plot 1
    output$smilies1 <- renderPlot({

      req(rv$data);
      plot_smilies(rv$data,
                   plot = "cumsum",
                   names = input$Sender_input_smilies,
                   starttime = paste(unlist(strsplit(format.Date(input$date_range_smilies,"%Y-%m-%d")," "))[1]," 00:00"),
                   endtime = paste(unlist(strsplit(format.Date(input$date_range_smilies,"%Y-%m-%d")," "))[2]," 00:00"),
                   min_occur = input$SmilieMinimum)},
      res = 100, height = 600)

    # Rendering smilies plot 2
    output$smilies2 <- renderPlot({

      req(rv$data);
      plot_smilies(rv$data,
                   plot = "heatmap",
                   names = input$Sender_input_smilies,
                   starttime = paste(unlist(strsplit(format.Date(input$date_range_smilies,"%Y-%m-%d")," "))[1]," 00:00"),
                   endtime = paste(unlist(strsplit(format.Date(input$date_range_smilies,"%Y-%m-%d")," "))[2]," 00:00"),
                   min_occur = input$SmilieMinimum)},
      res = 100, height = 600)


    # Rendering smilies plot 3
    output$smilies4 <- renderPlot({

      req(rv$data);
      plot_smilies(rv$data,
                   plot = "splitbar",
                   names = input$Sender_input_smilies,
                   starttime = paste(unlist(strsplit(format.Date(input$date_range_smilies,"%Y-%m-%d")," "))[1]," 00:00"),
                   endtime = paste(unlist(strsplit(format.Date(input$date_range_smilies,"%Y-%m-%d")," "))[2]," 00:00"),
                   min_occur = input$SmilieMinimum)},
      res = 100, height = 600)

  })

  # updating for emoji plots
  observeEvent(c(input$submit,input$EmojiUpdate), {

    # Rendering emojies plot 1
    output$emoji1 <- renderPlot({

      req(rv$data);
      plot_emoji(rv$data,
                 plot = "cumsum",
                 names = input$Sender_input_emoji,
                 starttime = paste(unlist(strsplit(format.Date(input$date_range_emoji,"%Y-%m-%d")," "))[1]," 00:00"),
                 endtime = paste(unlist(strsplit(format.Date(input$date_range_emoji,"%Y-%m-%d")," "))[2]," 00:00"),
                 min_occur = input$EmojiMinimum)},
      res = 100, height = 600)

    # Rendering emojies plot 2
    output$emoji2 <- renderPlot({

      req(rv$data)
      ;plot_emoji(rv$data,
                  plot = "heatmap",
                  names = input$Sender_input_emoji,
                  starttime = paste(unlist(strsplit(format.Date(input$date_range_emoji,"%Y-%m-%d")," "))[1]," 00:00"),
                  endtime = paste(unlist(strsplit(format.Date(input$date_range_emoji,"%Y-%m-%d")," "))[2]," 00:00"),
                  min_occur = input$EmojiMinimum)},
      res = 100, height = 600)

    # Rendering emojies plot 3
    output$emoji4 <- renderPlot({

      req(rv$data);
      plot_emoji(rv$data,
                 plot = "splitbar",
                 names = input$Sender_input_emoji,
                 starttime = paste(unlist(strsplit(format.Date(input$date_range_emoji,"%Y-%m-%d")," "))[1]," 00:00"),
                 endtime = paste(unlist(strsplit(format.Date(input$date_range_emoji,"%Y-%m-%d")," "))[2]," 00:00"),
                 min_occur = input$EmojiMinimum)},
      res = 100, height = 600)


  })

  # updating for reply plots
  observeEvent(c(input$submit,input$ReplyUpdate),{

    # Rendering replies plot 1
    output$replytime1 <- renderPlot({

      req(rv$data);
      plot_replytimes(rv$data,
                      type = "replytime",
                      names = input$Sender_input_replies,
                      starttime = paste(unlist(strsplit(format.Date(input$date_range_replies,"%Y-%m-%d")," "))[1]," 00:00"),
                      endtime = paste(unlist(strsplit(format.Date(input$date_range_replies,"%Y-%m-%d")," "))[2]," 00:00"))},
      res = 100, height = 600)

    # Rendering replies plot 2
    output$replytime2 <- renderPlot({
      req(rv$data);
      plot_replytimes(rv$data,
                      type = "reactiontime",
                      names = input$Sender_input_replies,
                      starttime = paste(unlist(strsplit(format.Date(input$date_range_replies,"%Y-%m-%d")," "))[1]," 00:00"),
                      endtime = paste(unlist(strsplit(format.Date(input$date_range_replies,"%Y-%m-%d")," "))[2]," 00:00"))},
      res = 100, height = 600)

  })

}

##################################### RUNNING APPLICATION ####
shinyApp(ui = ui, server = server)



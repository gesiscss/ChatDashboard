# ChatDashboard

## Overview
ChatDashboard is an R-shiny webapp allowing researchers to collect donated WhatsApp chat logs form consenting research participants. The webapp can be self-hosted and uses the `WhatsR` package to allow participants to securely upload their exported chat logs, parse them
into an R-dataframe while extracting features of interest, select for themselves which parts of the data they want to donate, and gives them access to a dashboard with interactive visualizations after donating data. Participants can only donate anonymous or anonymized information and the webapp can be configured to automatically filter out chat participants that have not posted a consent message into the chat. All data is encrypted before being stored persistently on the server.

## Example
You can find a hosted instance of ChatDashboard [here](https://shiny.molekulare-psychologie.de/jkohne/ChatDashboardShowcase/?id=ShowCaseUser). You can log in by adding the string coming after the `/?id=` part in the url as a username and `password` as a password. You can either inspect your own chat logs that you exported yourself, or use one generated with `WhatsR::create_chatlog()`. This instance is configured so that **no data is persistently stored** on the server.

## Scientific Use
If you are using this webapp for your research, please cite the corresponding paper accordingly.

```R
Kohne, J., Montag, C. ChatDashboard: A Framework to collect, link, and process donated WhatsApp Chat Log Data. Behav Res 56, 3658–3684 (2024). https://doi.org/10.3758/s13428-023-02276-1

A BibTeX entry for LaTeX users is

@article{kohne2024chatdashboard,
  title={Chat{D}ashboard: {A} {F}ramework to collect, link, and process donated {W}hats{A}pp {C}hat {L}og {D}ata},
  author={Kohne, Julian and Montag, Christian},
  journal={Behavior Research Methods},
  volume={56},
  number = {4},
  pages={3658--3684},
  year={2024},
  publisher={Springer},
  doi={10.3758/s13428-023-02276-1}
}
```

## Setup
To setup ChatDashboard on your own server, you can follow the following steps:

### 1) Requirements

 - You need (access to) your own server running Ubuntu
 - You need root privileges on this server
 - R, RStudio Server and R Shiny Server need to be installed
 - The server should be secured and kept up to date (ideally by your IT department/technician)
 - You need a local PC with R and RStudio installed for testing the setup and settings before deployment (ideally running Ubuntu/Linux too)
 
### 1) Installing necessary libraries (local)
First of all, you should install the `WhatsR` package, all necessary dependencies, and all required packages for the ChatDashboard webapp
on your local machine. Depending on what is already installed, you might get warning messages that some system libraries are not available. Should that be the case, you need to install those via the command line (not RStudio).

 
```
# if installing on a unix-based OS (Linux, MacOS)
# ensure that the following system dependencies are installed:
#libxml2-dev
#libpng
#libsodium-dev
#libcurl4-openssl-dev
#libmagick++-dev
#libharfbuzz-dev
#libfribidi-dev
#libjpeg-dev
#default-jre
#default-jdk
#gfortran
#libblas-dev
#liblapack-dev
#libgdal-dev

# Installing from CRAN
install.packages("WhatsR")

# Installing WhatsR package from GitHub
library(devtools)
devtools::install_github("gesiscss/WhatsR")

# Installing ChatDashboard Dependencies
# code form: https://stackoverflow.com/questions/4090169/elegant-way-to-check-for-missing-packages-and-install-them
Chatdashboard_dep <- c("anytime",
                       "crosstalk",
                       "cyphr",
                       "digest",
                       "DT",
                       "fontawesome",
                       "ggplot2",
                       "ggwordcloud",
                       "keyring",
                       "readODS",
                       "rsconnect",
                       "shiny",
                       "shinymanager",
                       "shinythemes",
                       "shinyjs",
                       "shinyalert",
                       "shinyTime",
                       "shinyWidgets",
                       "slickR",
                       "waiter",
                       "WhatsR")
                       
Chatdashboard_new <- Chatdashboard_dep[!(Chatdashboard_dep %in% installed.packages()[,"Package"])]
if(length(Chatdashboard_new)) install.packages(Chatdashboard_new)

```

### 2) Downloading ChatDashboard (local)
If you have not already done so, download the complete ChatDashboard folder to your local PC first. The goal is to test the setup
and the settings locally, before deploying everything to the server. Ideally, this local PC also runs a UNIX based operating
system, if not, you will have to tweak some settings (see below).


### 3) Creating keys for encryption (local)
ChatDashboard us using the `cyphr` package for encrypting donated data before it is persistently stored on the server. To do this, you need to create your own two sets of keys for encrypting and decrypting data. One set of keys will be stored on the server while you should keep the other somewhere secure. Because we're using asynchronous encryption, the keypair stored on the server
cannot be used for decryption. This adds some security but also means that you will *not be able to access your collected data ever again* if you delete or lose your local key pair. In the below example UNIX file paths are used. If you are using Windows, you need to adapt the file paths.
 
```
# loading library
library(cyphr)

# This will create two RSA keys, public (id_rsa.pub) and private (id_rsa), in a new folder called: Researcher_Keypair
path <- cyphr::ssh_keygen("./Researcher_Keypair",password = FALSE)
dir(path)

# This will create a second set of two RSA keys, public (id_rsa.pub) and private (id_rsa), in a new folder called: Server_Keypair
path <- cyphr::ssh_keygen("./Server_Keypair",password = FALSE)
dir(path)

# KEY EXCHANGE: You now need to exchange the public keys (the files with the .pub ending), so that
# the public key of the researcher goes into the Server_Keypair folder while the public key of the server
# goes into the Researcher_Keypair folder. You can simply copy and paste the corresponding files for that.
# However, do not write over files when exchanging and do not permanently rename these files.

# You can test if you did everything correctly by trying to encrypt a file and then decrypt it again.

# defining keypair for encryption
key_pair_server <- cyphr::keypair_openssl(pub = "./Server_Keypair", key = "./Server_Keypair", envelope = TRUE)

# encrypting file
encrypted_mtcars <- encrypt_object(mtcars,key_pair_server)

# checking encrypted file (this should be random bits and bytes)
encrypted_mtcars

# defining keypair for decryption
key_pair_researcher <- cyphr::keypair_openssl(pub = "./Researcher_Keypair", key = "./Researcher_Keypair", envelope = TRUE)

# decrypting file
decrypted_mtcars <- decrypt_object(encrypted_mtcars,key_pair_researcher)

# checking
View(decrypted_mtcars)
identical(mtcars,decrypted_mtcars) # this should return TRUE

```

If everything went smoothly, you can now copy the contents of the `Server_Keypair` folder into the `ServerFolder` of the ChatDashboard directory. This key pair will be used by ChatDashboard to encrypt files. You can decrypt them again using the key pair in the `Researcher_Keypair` folder. We suggest to never share these keys and keep them in a secure spot where you will definitely find them again.

### 4) Testing ChatDashboard (local)
You can now open the `app.R` script in the ChatDashboard directory and see the code for the webapp. At the beginning of the file, there are several variables that you can define for yourself to customize the webapp according to your needs. For a first test run, we suggest to keep the default settings for now. You can simply click on `run app` on the top right of your Rstudio code panel to execute the webapp locally. This will open a browser window where you can log into the webapp using the preset combination of username and password found in `credentials.rds` ('TestUser', 'password'). The webapp then walks you through the data donation process from the perspective of a participant. You can either test the correct functioning of the webapp using a private chat log that you exported yourself or by creating an artificial one using `WhatsR::create_chatlog()`. You should be able to upload a chat, manually select what you want to donate, and see interactive visualizations. After closing the webapp, there should be an encrypted R dataframe object in the `UserData` folder, which can be decrypted with the key pair from the `Researcher_Keypair` folder we created in step 3.

### 5) Deploying to Server (online)
If everything is running smoothly and without issues offline, you can deploy the webapp to the server. To do so, you need to install the necessary libraries and packages on the server as well (see step 1). Then, you can adapt the settings in `app.R` according to your needs by simply editing the script and saving it. After that, the app can be uploaded to the server. Some settings that you need or might want to adapt are:

```
# This needs to be set to TRUE for running online and you need to indicate the correct library path from your server (where all the 
# dependencies are installed).
running_online = FALSE
if (running_online == TRUE) {.libPaths("SERVER_LIBRARY_PATH")}

# Language for the landing page and the selection widgets for timepoints
landing_page_language <- "en"

# variable to control whether to use forwarding per url parameter (TRUE) or rely on pre-defined credentials for authentication (FALSE)
# TODO: If you are using url parameter forwarding, you need to adapt line 879 in the app.R script to extract the participant ID from your referral link.
# Default structure is: www.example-website.com/ChatDashboard/?id=TestParticipant | Extracts: TestParticipant
use_forwarding <- FALSE

# Password to use for forwarding via url-parameter (only used if use_forwarding == TRUE)
# TODO: Set this as a character string in line 880 of the app.R script

# saving donated files to server if TRUE, will not save any data if not TRUE
save_to_server <- TRUE

# Consent message passed down to WhatsR::parse_chat(). If this is a character string, the
# parser will automatically remove all messages from users who did *not* post this **exact** message into the chat
# Always double-check this to not end up with empty chat logs in your donations.
consent_message <- NA

# List of column names to be displayed to users, this should only be changed
# if necessary
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
                          
# subset of column names with columns that contain Personal Identifiable Information (PII)
# These columns will be automatically excluded from the donations as a default.
Colnames_exclude_pii <- c("Sender",
                          "Message",
                          "Message_simplified",
                          "Message_words",
                          "Links",
                          "Media",
                          "Locations",
                          "System_messages")
                          
# This parameter determines the maximum filesize a chat can have to still be allowed in the upload
# 50Mb should be more than enough for all chat logs. If it's not, participants are probably trying to
# upload chats or whole zip folders exported using the "with media files" option.
options(shiny.maxRequestSize = 50*1024^2)

```

After adapting all necessary settings, you can simply copy the whole ChatDashboard directory into the directory for Rshiny apps on your server (see also [here](https://docs.posit.co/shiny-server/#host-a-directory-of-applications)). After a couple of minutes, your webapp should be running online at the corresponding address where all the shiny apps of your Rshiny server installation are running (see also [here](https://docs.posit.co/shiny-server/#host-a-directory-of-applications)).

**Importantly**, If you authenticate by forwarding, not by credentials, you can now use any ID attached to the link
of the web app as a valid username and the password set in `line 880` of `app.R`. For example, if your webapp is hosted at
`www.example-website.com/ChatDashboard/`, you can now enter the website by putting `www.example-website.com/ChatDashboard/?id=TestParticipant` into your address bar, and `TestParticipant` will be a valid user name to log in, in combination with the password set in `app.R`. This way, you can automatically generate personalized links for participants in surveys and link anonymous survey responses to anonymous data donations. Donated datasets will contain the anonymous ID in the file name.

### 6) Testing ChatDashboard (online)
If everything is set up, you can now test the web app in online mode using different chat logs created by `WhatsR::create_chatlog()` and chats that you exported yourself with the consent of your chat partners. For automated testing with a wide range o different chat logs and participant behaviors, you can use the [DashboardTester](https://github.com/gesiscss/DashboardTester/) script, which essentially simulates participants on your web app with a predefined set of artificial or testing chat logs.

**IMPORTANT:** Please test the webapp thoroughly with different types of chat logs, exporting phone settings and user behaviors before distributing links to participants and collecting data. You should not only rely on chats created with `WhatsR::create_chatlog()` but also with chats that you recently exported yourself from your phone. This is because the chat log structure can change over time and the simulated chat logs might not reflect recent, unannounced changes that WhatsApp could implement. If you encounter any issues, please open an issue [here](https://github.com/gesiscss/WhatsR/issues).






# Concierge Server

## Before starting
You guys need to read the comments of the src/hibernate-cfg.xml before doing anything. Modify it as said in the comments and then start the installation.

Once you have developed your part and you want to add files and make a merge request **do not add the hibernate-cfg.xml file to the changes** . This way, we will have a common cfg base file.

## Installation
Proceed like in the server installation of the TFG server app. Use the IDE you prefer. IntelliJ works fine.

## Docker

To launch the app server in a Docker image for development, from the base
directory of this project run:

```bash
docker run -it --rm -p 8888:8080 -v "$PWD/concierge-server/WebContent/":/usr/local/tomcat/webapps/ROOT/:ro tomcat:9.0
```

Then, you can access the web app from your browser on <http://127.0.0.1:8888>.

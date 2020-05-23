# Concierge
This repo is a migration of a private GitLab repository. It is conceived as the 
development of an app using Scrum methodology and control version for the
course Systems and Telematic Services Engineering given at Universidad 
Politécnica de Madrid (ETSIT).
It includes:
* The frontend developed in React
* The backend developed with Java EE
* H2 database
* Very cool API use: Google Maps, Stripe, TicketMaster
* Deployment using containers

## Versions
To avoid issues from the beginning I sugest to use the same versions:
* node v12.15.0
* npm 6.13.4

## Installation and workflow

### Client side
```
git clone https://git-concierge.duckdns.org/pabloi09/concierge
cd concierge
git checkout -b <your_branch_name>
cd concierge-client
npm install
npm start
```
### Server side

Follow instructions in concierge-server/README.md

You will be ready to develop :tada:

### Upload files

**Wanna upload for the first time ?**
*Use:*
```
git add <the_files>
git commit -m "Description of the new version"
git push --set-upstream origin <your_branch_name>
```

### Docker-compose for development

To launch the database, the backend and the frontend `docker-compose` can be
used. We need to compile the sources first. From the root directory of this
project run:

```bash
docker system prune
cd concierge-server; mvn clean package
cd ..; docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

The forntend will be accesible at <http://localhost:3000> and the backend at <http://localhost:8080>. From these containers, the database can be accesed with the following JDBC URL: `jdbc:mysql://db:3306/concierge`, with the credentials `concierge:concierge`.

## Contact
### Product owner
Álvaro Gómez
### Scrum master
Ana de Lucas López
### Developers
* Patricia Centenera
* Diego de Vega
* Carlos García
* Pablo Martín 

## Supervisor
* Juan Carlos Yelmo

## Helpful docs in not a specific order
* Restful API with spring: https://spring.io/guides/gs/rest-service/
* Forms with Formik and Yup: https://dev.to/finallynero/react-form-using-formik-material-ui-and-yup-2e8h
* Material-UI docs: https://material-ui.com/
* React Docs: https://es.reactjs.org/
* React Router: https://reacttraining.com/react-router
* Redux: https://es.redux.js.org/
* JavaScript: https://developer.mozilla.org/es/docs/Web/JavaScript
* Material Icons: https://material-ui.com/components/icons/#font-icons
* Formik docs: https://jaredpalmer.com/formik/docs/overview
* Material-UI palette: https://material-ui.com/customization/palette/
* Stripe API: https://stripe.com/docs/api/
* [MySQL :: MySQL Connector/J 8.0 Developer Guide :: 6.2 Connection URL Syntax](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-jdbc-url-format.html)
* [docker-node/README.md at master · nodejs/docker-node · GitHub](https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image)

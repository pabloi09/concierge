# Concierge
## Versions
To avoid issues from the beginning I sugest to use the same versions:
* node v12.15.0
* npm 6.13.4

## Installation and workflow
```
git clone https://git-concierge.duckdns.org/pabloi09/concierge
cd concierge
git checkout -b <your_branch_name>
npm install
npm start
```
You will be ready to develop :tada:

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
cd concierge-server; mvn package
cd ..; docker-compose -f docker-compose.dev.yml up
```

The forntend will be accesible at <http://localhost:3000> and the backend at <http://localhost:8080>. From these containers, the database can be accesed with the following JDBC URL: `jdbc:mysql://db:3306/concierge`, with the credentials `concierge:concierge`.

## Files
The drive shared directory is:
https://drive.google.com/drive/folders/13pPnWUftbtiQ1ur7unSofkWJ_Q8ztDBP?usp=sharing
## Contact
### Product owner
alvaro.gomezm@alumnos.upm.es
### Scrum master
ana.delucas.lopez@alumnos.upm.es
### Developers
* p.centenera@alumnos.upm.es
* diego.devegaf@alumnos.upm.es
* c.garcia-maurino@alumnos.upm.es
* pablo.martin.redondo@alumnos.upm.es

## Supervisor
* juancarlos.yelmo@upm.es

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
* [MySQL :: MySQL Connector/J 8.0 Developer Guide :: 6.2 Connection URL Syntax](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-jdbc-url-format.html)
* [docker-node/README.md at master · nodejs/docker-node · GitHub](https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image)

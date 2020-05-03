import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Typography
} from '@material-ui/core';
import DialogComponent from "../common/DialogComponent"
import Communication from "../../Communication"

const styles = () => ({
  card: {
    minWidth: 646,
    minHeight:340,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center",
    flexGrow: 1
  },
  formControl: {
      width: "100%"
  },
  block: {
    display: "block"
  },
  actions: {
    float: "right"
  },
  title: {
    fontSize: 21,
  }
});


const getItems = (events) => {
    var items = []
    var categories = [];
    var result = [];
    //organizao los eventos
    for(const [i, e] of events.entries()) {
        //to silence the warning
        if (!categories.includes(e.classifications[0].segment.name)) {
            //no esta aun, la incluyo
            categories.push(e.classifications[0].segment.name);
            var obj = {
                name: e.classifications[0].segment.name,
                events: [
                    {
                        name: e.name,
                        id: e.id,
                        date: e.dates.start.localDate,
                        time: e.dates.start.localTime,
                        address: e._embedded.venues[0].address.line1
                    },
                ]
            }
            result.push(obj);
        } else {
            //ya esta, añado el evento a su categoria
            var event = {
                name: e.name,
                id: e.id,
                date: e.dates.start.localDate,
                time: e.dates.start.localTime,
                address: e._embedded.venues[0].address.line1
            }
            var position = categories.indexOf(e.classifications[0].segment.name);
            result[position].events.push(event);
        }
    }

    //relleno el array items
    for(const [i, c] of result.entries()) {
        items.push(<ListSubheader key={i}>{c.name}</ListSubheader>);
        for(const [j, e] of result[i].events.entries()) {
            items.push(<MenuItem value={e.id} key={i+j+1}>{e.name+", "+e.date+" a las "+e.time.substring(0, 5)+"h ("+e.address+")"}</MenuItem>);
        }
    }
    return items
}

const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    items
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Solicitud de entradas para eventos
            </Typography>

            <FormControl className={classes.formControl}>
                <InputLabel>Evento</InputLabel>
                <Select defaultValue="" 
                id="eventId"
                name="eventId"
                value={values.eventId}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.people ? errors.people : ""}
                error={touched.people && Boolean(errors.people)}>
                    <MenuItem value="">
                        <em>Seleccione un evento</em>
                    </MenuItem>
                    {items}
                </Select>
            </FormControl>
            
            <TextField
                className={classes.block}
                id="people"
                name="people"
                label="Número de personas"
                type="number"
                value={values.people}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.people ? errors.people : ""}
                error={touched.people && Boolean(errors.people)}
                InputLabelProps={{shrink: true}}
                margin="dense"
                variant="outlined"
            />

            <TextField
                id="comment"
                name="comment"
                label="Añada un comentario adicional"
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.comment ? errors.comment : ""}
                error={touched.comment && Boolean(errors.comment)}
                margin="dense"
                variant="outlined"
                multiline
                fullWidth
                rows="4"
            />

          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              Submit
            </Button>
          </CardActions>
        </Card>

      </form>
    </div>
  );
};


const Form = withStyles(styles)(withFormik({
  mapPropsToValues: ({
    eventId,
    people,
    comment
  }) => {
    return {
      eventId: eventId || "",
      people: people || 1,
      comment: comment || ""
    };
  },

  validationSchema: Yup.object().shape({
    eventId: Yup.string()
      .required("Seleccione el restaurante")
      .trim(),
    people: Yup.number()
        .required("Debe seleccionar el número de comensales")
        .min(1, "Debes seleccionar al menos una persona")
        .max(10, "Contacta directamente con recepción para reservas de más de 10 entradas")
  }),

  handleSubmit: (values, { setSubmitting, props })  => {

    setTimeout(() => {
      // submit to the server
      var c = new Communication()
      c.makePostRequest("/solicitud",getJson(values, props.events))
      .then((json)=>{
        if(json["code"]===200){
           props.setSuccess()
           json["cliente"] = JSON.parse(json["cliente"]);
           props.login(json);
        }else{
          props.setError()
        }
        setSubmitting(false);
       });
    }, 1000);
  }
})(form));

const getJson = (values, events)=>{
    var event;
    for(const [i, e] of events._embedded.events.entries()) {
        if (e.id === values.eventId) {
            event = {
                name: e.name,
                id: e.id,
                date: e.dates.start.localDate,
                time: e.dates.start.localTime,
                address: e._embedded.venues[0].address.line1
            }
            break;
        }
    }
    return ({
        titulo: "Entradas",
        mensaje: "Como cliente solicito comprar entradas de " + event.name + ", ("+event.date+", "+event.time+") para "+ values.people + " persona/s. El evento tendrá lugar en "+event.address+", 28013, Madrid.\n" + values.comment
    });
}

class EventsForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {open:false, events: null}
        this.setOpen.bind(this)
    }

    setOpen(o){
        this.setState({open:o, events: this.state.events})
    }

    setSuccess(){
        this.setState({open:true,
            title: "Solicitud enviada con éxito",
            text:"Puede revisar sus solicitudes en el apartado de Solitudes",
            action1name:"OK",
            action1:()=>{
            this.setOpen(false)
            this.props.history.goBack();
        }})
    }

    setError(){
        this.setState({open:true,
            title: "Error" ,
            text:"No está autenticado en el servidor. Vuelva a entrar a la web e inténtelo de nuevo" ,
            action1name:"OK",
            action1:()=>{
            this.setOpen(false)
        }})
    }

    componentDidMount () {
        if (this.state.items ? this.state.items.length === 0:true) {
            var c = new Communication();
            c.makeGetRequest("/events", {"request": "events"})
            .then((json)=>{
                if(json["code"]===200){
                    json["data"] = JSON.parse(json["data"]);
                    this.setState({open: this.state.open, events: json["data"] ,items:  getItems(json["data"]["_embedded"]["events"])});
                   
                } else {
                    console.log("Error");
                }
            });
        }
    }

    render(){
        return(
        <div>
            <Form 
                setSuccess ={this.setSuccess.bind(this)} 
                setError = {this.setError.bind(this)} 
                events={this.state.events}
                login={this.props.login}
                items={this.state.items}/>
            <DialogComponent 
                open = {this.state.open}
                title={this.state.title}
                text={this.state.text}
                action1name={this.state.action1name}
                action1={this.state.action1}/>
        </div>);
    }
}

export default withRouter(EventsForm);

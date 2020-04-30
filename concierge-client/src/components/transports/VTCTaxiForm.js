import React from "react";
import { withFormik,useField, useFormikContext } from "formik";
import * as Yup from "yup";
import { withStyles, ListItemText } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  ListItem,
  ListItemIcon,
  Switch,
  Typography,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es"
import DialogComponent from "../common/DialogComponent"
import Communication from "../../Communication"
import GoogleMapsAutoComplete from "./GoogleMapsAutoComplete"
import TimerIcon from '@material-ui/icons/Timer';
import MapIcon from '@material-ui/icons/Map';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
const styles = () => ({
  card: {
    width:635,
    minWidth: 546,
    
    marginTop: 50
  },
  container: {
    
    display: "Flex",
    justifyContent: "center",
    flexGrow:1
  },
  actions: {
    float: "right"
  },
  title: {
    fontSize: 21,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  disclaimer: {
    fontSize:12
  }
});

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <DateTimePicker 
         {...field}
         {...props}
         selected={(field.value && new Date(field.value)) || null}
         onChange={val => {
           setFieldValue(field.name, val);
         }}/>
      </MuiPickersUtilsProvider>
  );
};


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
    update

  } = props;
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Solicitud de transporte
            </Typography>
            
            <GoogleMapsAutoComplete
                id="origin"
                name="origin"
                label="Seleccione la direccion de origen"
                value={values.origin}
                onChange={(e, value)=>{
                  handleChange(e)
                  update(value, values.destiny);
                }}
                onBlur={handleBlur}
                helperText={touched.origin ? errors.origin : ""}
                error={touched.origin && Boolean(errors.origin)}
                margin="dense"
                variant="outlined"
                fullWidth/>

            <GoogleMapsAutoComplete
                id="destiny"
                name="destiny"
                label="Seleccione la direccion de destino"
                value={values.destiny}
                onChange={(e,value)=>{
                  handleChange(e)
                  update(values.origin, value);
                  
                }}
                onBlur={handleBlur}
                helperText={touched.destiny ? errors.destiny : ""}
                error={touched.destiny && Boolean(errors.destiny)}
                margin="dense"
                variant="outlined"
                fullWidth/>
            <div>
              <FormControlLabel 
                  control={
                    <Radio  checked={values.type==="taxi"}
                            id="type"
                            name="type"
                            value="taxi"
                            onChange={handleChange}/>} 
                  label = "Taxi"/>
              <FormControlLabel 
                  control={
                    <Radio checked={values.type==="VTC"}
                            id="type"
                            name="type"
                            value="VTC"
                            onChange={handleChange}/>} 
                  label = "VTC"/>
            </div>
            
            <FormControlLabel
              label="Lo antes posible"
              control={
                <Switch
                id = "now"
                name="now"
                checked={values.now}
                onChange={handleChange}
                color="primary"
                />
              }/>
            
              <DatePickerField
               id="hour"
               name="hour"
               label="Seleccione la hora de la reserva"
               value={values.hour}
               disabled = {values.now}
               onChange={handleChange}
               onBlur={handleBlur}
               helperText={touched.hour || touched.restaurant  ? errors.hour : ""}
               error={(touched.hour || touched.restaurant) && Boolean(errors.hour)}
               margin="dense"
               minDate={getDateMin()}
               maxDate={getDateMax()}
               variant="inline"
               format ="dd/MM/yyyy HH:mm"
               allowKeyboardControl
               fullWidth
            />
            
            <TextField
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
                fullWidth
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
const getDateMin = () =>{
  var date = new Date()
  date.setTime(date.getTime() +  1 * 3600 * 1000)
  return date
}
const getDateMax = () =>{
  var date = new Date()
  date.setTime(date.getTime() + 2 * 31 * 24 * 3600 * 1000)
  return date
}

const Form = withStyles(styles)(withFormik({
  mapPropsToValues: ({
    origin,
    destiny,
    type,
    now,
    hour,
    people,
    comment
  }) => {
    return {
      origin: origin || "",
      destiny: destiny || "",
      type: type || "taxi",
      now: now || false,
      hour: hour || new Date(),
      people: people || 1,
      comment: comment || ""
    };
  },
  

  validationSchema: (props) =>{
      let schema = Yup.object().shape({
      origin: Yup.string()
        .required("Seleccione la direccion de origen")
        .trim(),
      destiny: Yup.string()
        .required("Seleccione la direccion de destino")
        .test("isDefault", "El servicio de VTC está limitado a un radio de 100km",
          function () {
            return props.distance ? props.distance.value < 100000:true
          })
        .trim(),
      type:Yup.string().required(),
      now: Yup.bool(),
      hour: Yup.date()
            .when("now", {
              is: false,
              then: Yup.date().required("Seleccione la fecha y hora de la reserva")
                              .min(getDateMin(),"Se debe de reservar con almenos 3 horas de antelación")
                              .max(getDateMax(), "No se puede reservar con mas de dos meses de antelación"),
            }),
          
      people: Yup.number()
          .required("Debe seleccionar el número de comensales")
          .min(1, "Debes seleccionar al menos una persona")
          .max(10, "Contacta directamente con recepción para reservas de más de 10 comensales")
  })
      return schema
},

  handleSubmit: (values, { setSubmitting, props })  => {
    setTimeout(() => {
      // submit to the server
      var c = new Communication()
      c.makePostRequest("/solicitud",getJson(values))
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
const transformDate = (date) =>{
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour:"numeric", minute:"numeric"};
  return date.toLocaleDateString("es-ES",options)
}
const getJson = (values)=>{
  return {
    titulo: "Reserva de transporte",
    mensaje: "Como cliente solicito un viaje en "+ values.type +" de [" + values.origin + "] a [" + values.destiny + "] para " + values.people + " persona/s " + (values.now ? "lo antes posible":"el "+ transformDate(values.hour)) + ".\n" + values.comment
  }
}

class VTCTaxiForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {open:false,restaurants:[]}
    this.setOpen.bind(this)
  }
  setOpen(o){
    this.setState({open:o})
  }
  setSuccess(){
    this.setState({open:true,
      title: "Solicitud enviada con éxito",
      text:"Puede revisar sus solicitudes en el apartado de Solitudes",
      action1name:"OK",
      action1:()=>{
        this.setOpen(false)
        this.props.goBack();
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
  estimateCost(duration,distance){
    return Math.round((3,5 + duration * 0.12 + distance * 1.01)*100)/100
  }

  render(){
    const {classes} = this.props
    return(<div>
      <Form 
        setSuccess ={this.setSuccess.bind(this)} 
        setError = {this.setError.bind(this)} 
        login={this.props.login}
        distance = {this.props.distance}
        update = {this.props.update}/>
      <div>
       {this.props.duration? 
        <div className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
                Estimaciones del viaje
              </Typography>
                <ListItem key="tiempo">
                  <ListItemIcon><TimerIcon/></ListItemIcon>
                  <ListItemText>Duración: {this.props.duration.text}</ListItemText>
                </ListItem>
                <ListItem key="distancia">
                  <ListItemIcon><MapIcon/></ListItemIcon>
                  <ListItemText>Distancia recorrida: {this.props.distance.text}</ListItemText>
                </ListItem>
                <ListItem key="precio">
                  <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
                  <ListItemText>Importe estimado: {this.estimateCost(this.props.duration.value/60, this.props.distance.value/1000)}€</ListItemText>
                </ListItem>
              <Typography className={classes.disclaimer} color="textSecondary">
                Nota: En ningún momento estas estimaciones suponen un contrato. Solo se muestran a modo de orientación,
                estimándose según la situación actual. Todas estas cifras variarán según las circunstancis de cada momento.
              </Typography>
            </CardContent>
          </Card>
          </div>:<></>}
          </div>
      <DialogComponent 
        open = {this.state.open}
        title={this.state.title}
        text={this.state.text}
        action1name={this.state.action1name}
        action1={this.state.action1}/>
    </div>)
  }




}


export default withStyles(styles)(VTCTaxiForm);

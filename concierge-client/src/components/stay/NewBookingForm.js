import React from "react";
import { withFormik,useField, useFormikContext } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  MenuItem,
  Typography
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es"
import DialogComponent from "../common/DialogComponent"
import Communication from "../../Communication"

const styles = () => ({
  card: {
    minWidth: 546,
    minHeight:340,
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
  block: {
    display: "block"
  },
  title: {
    fontSize: 21,
  },
  map: {
    width: '100%',
    height: '100%',
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
    hotels,
    onHotelClick
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Solicitud de reserva en hotel
            </Typography>
            <TextField
              id="hotel"
              name="hotel"
              label="Seleccione un hotel"
              select
              value={values.hotel.value}
              onChange={(e=>{
                onHotelClick(e.target.value.ref.props,e.target.value.ref.marker)
                handleChange(e)
                
              })}
              onBlur={handleBlur}
              helperText={touched.hotel ? errors.hotel : ""}
              error={touched.hotel && Boolean(errors.hotel)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {hotels? hotels.map((option) => (
                <MenuItem key={option.value} value={option}>
                  {option.label}
                </MenuItem>
              )) : <></>}
            </TextField>
              <DatePickerField
               id="hour"
               name="hour"
               label="Seleccione el día y hora de entrada"
               value={values.hour}
               onChange={handleChange}
               onBlur={handleBlur}
               helperText={touched.hour || touched.hotel  ? errors.hour : ""}
               error={(touched.hour || touched.hotel) && Boolean(errors.hour)}
               margin="dense"
               minDate={getDateMin()}
               maxDate={getDateMax()}
               variant="inline"
               format ="dd/MM/yyyy HH:mm"
               allowKeyboardControl
               fullWidth
            />

            <TextField
                className={classes.block}
                id="nights"
                name="nights"
                label="Número de noches"
                type="number"
                value={values.nights}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.nights ? errors.nights : ""}
                error={touched.nights && Boolean(errors.nights)}
                InputLabelProps={{shrink: true}}
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
  date.setTime(date.getTime() + 3 * 31 * 24 * 3600 * 1000)
  return date
}

const Form = withStyles(styles)(withFormik({
  mapPropsToValues: ({
    hotel,
    hour,
    nights,
    people,
    comment
  }) => {
    return {
      hotel: hotel || "",
      hour: hour || new Date(),
      nights: nights || "",
      people: people || 1,
      comment: comment || ""
    };
  },

  validationSchema: Yup.object().shape({
    hotel: Yup.string()
        .required("Seleccione el hotel")
        .trim(),
    hour: Yup.date()
        .required("Seleccione una día y una hora para continuar")
        .min(getDateMin(),"Se debe de reservar con al menos 3 horas de antelación")
        .max(getDateMax(), "No se puede reservar con mas de tres meses de antelación"),
    nights: Yup.number()
        .required("Debe seleccionar el número de noches de su estancia")
        .min(1, "Debes seleccionar al menos una noche")
        .max(15, "Contacta directamente con recepción para reservas de más de 15 noches"),
    people: Yup.number()
        .required("Debe seleccionar el número de comensales")
        .min(1, "Debes seleccionar al menos una persona")
        .max(10, "Contacta directamente con recepción para reservas de más de 10 comensales")
  }),

  handleSubmit: (values, { setSubmitting, props })  => {

    setTimeout(() => {
      // submit to the server
      var c = new Communication()
      c.makePostRequestUTF8("/solicitud",getJson(values))
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
    titulo: "Reserva en hotel",
    mensaje: "Como cliente solicito una reserva en " + values.hotel.value + " (" + values.hotel.object.formatted_address + ") para " + values.people + " persona/s. La entrada será el " + transformDate(values.hour) + " y me alojaré en él durante "+values.nights+" noches.\n" + values.comment
  }
}

class NewBookingForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {open:false,hotels:[]}
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
  render(){
    return(<div>
      <Form 
        setSuccess ={this.setSuccess.bind(this)} 
        setError = {this.setError.bind(this)} 
        onHotelClick = {this.props.onMarkerClick}
        hotels={this.props.hotels}
        login={this.props.login}/>
      <DialogComponent 
        open = {this.state.open}
        title={this.state.title}
        text={this.state.text}
        action1name={this.state.action1name}
        action1={this.state.action1}/>
    </div>)
  }
}


export default NewBookingForm;

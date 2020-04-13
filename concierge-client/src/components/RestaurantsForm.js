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
import DialogComponent from "./DialogComponent"
import Communication from "../Communication"
const styles = () => ({
  card: {
    minWidth: 746,
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
    restaurants,
    onRestaurantClick

  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Solicitud de reserva en restaurante
            </Typography>
            <TextField
              id="restaurant"
              name="restaurant"
              label="Seleccione un restaurante"
              select
              value={values.restaurant.value}
              onChange={(e=>{
                onRestaurantClick(e.target.value.ref.props,e.target.value.ref.marker)
                handleChange(e)
                
              })}
              onBlur={handleBlur}
              helperText={touched.restaurant ? errors.restaurant : ""}
              error={touched.restaurant && Boolean(errors.restaurant)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {restaurants? restaurants.map((option) => (
                <MenuItem key={option.value} value={option}>
                  {option.label}
                </MenuItem>
              )) : <></>}
            </TextField>
              <DatePickerField
               id="hour"
               name="hour"
               label="Seleccione la hora de la reserva"
               value={values.hour}
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
               fullWidth/>

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
    restaurant,
    hour,
    comment
  }) => {
    return {
      restaurant: restaurant || "",
      hour: hour || new Date(),
      comment: comment || ""
    };
  },

  validationSchema: Yup.object().shape({
    restaurant: Yup.string()
      .required("Seleccione el restaurante")
      .trim(),
    hour: Yup.date()
      .required("Seleccione una día y una hora para continuar")
      .min(getDateMin(),"Se debe de reservar con almenos 3 horas de antelación")
      .max(getDateMax(), "No se puede reservar con mas de dos meses de antelación")
  }),

  handleSubmit: (values, { setSubmitting, props })  => {

    setTimeout(() => {
      // submit to the server
      var c = new Communication()
      c.makePostRequest("/solicitud",getJson(values))
      .then((json)=>{
        if(json["code"]===200){
           props.setSuccess()
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
    titulo: "Solicitud de reserva en restaurante",
    mensaje: "Como cliente solicito una reserva en " + values.restaurant.value + "(" +values.restaurant.object.vecinity+") el " + transformDate(values.hour) + + ".\n" + values.comment
  }
}

class RestaurantsForm extends React.Component{
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
  render(){
    return(<div>
      <Form 
        setSuccess ={this.setSuccess.bind(this)} 
        setError = {this.setError.bind(this)} 
        onRestaurantClick = {this.props.onMarkerClick}
        restaurants={this.props.restaurants}/>
      <DialogComponent 
        open = {this.state.open}
        title={this.state.title}
        text={this.state.text}
        action1name={this.state.action1name}
        action1={this.state.action1}/>
    </div>)
  }



}


export default RestaurantsForm;

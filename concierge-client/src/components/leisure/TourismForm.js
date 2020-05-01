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
  Typography,
  Grid
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";
import DialogComponent from "../common/DialogComponent";
import Communication from "../../Communication";
import { withRouter } from "react-router-dom";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
const styles = () => ({
  card: {
    maxWidth: 746,
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
  },
  menuItem:{
    padding:10,
    maxWidth:700,
    whiteSpace: 'normal'
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
    tours
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Solicitud de reserva de tour
            </Typography>
            <TextField
              id="tour"
              name="tour"
              label="Seleccione un tour"
              select
              value={values.tour.value}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.tour ? errors.tour : ""}
              error={touched.tour && Boolean(errors.tour)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {tours? tours.map((tour,i) => (
                <MenuItem key={i} value={tour} className={classes.menuItem}>
                <Grid 
                    container
                    wrap="nowrap"
                    justifyContent="center"
                    spacing={2}
                    alignItems="center">
                    <Grid item xs>
                        <Typography>
                           {tour.title} 
                            </Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid container>
                        <Grid item xs>
                            <Grid container>
                                    <Grid item >
                                        <MonetizationOnIcon/>
                                    </Grid>
                                    <Grid item >
                                        <Typography color="textSecondary">
                                            {tour.price !== "¡Gratis!"?tour.price.split("?")[0]+" €/p":tour.price}
                                        </Typography>
                                    </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Grid container>
                                    <Grid item>
                                        <ScheduleIcon/>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="textSecondary">
                                            {tour.hours}
                                        </Typography>
                                    </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Grid container>
                                    <Grid item>
                                        <EmojiPeopleIcon/>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="textSecondary">
                                            {tour.guide}
                                        </Typography>
                                    </Grid>
                            </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                </Grid>
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
               helperText={touched.hour || touched.tour  ? errors.hour : ""}
               error={(touched.hour || touched.tour) && Boolean(errors.hour)}
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
    tour,
    hour,
    people,
    comment
  }) => {
    return {
      tour: tour || {},
      hour: hour || new Date(),
      people: people || 1,
      comment: comment || ""
    };
  },

  validationSchema: Yup.object().shape({
    tour: Yup.string()
        .required("Seleccione el tour")
        .trim(),
    hour: Yup.date()
        .required("Seleccione una día y una hora para continuar")
        .min(getDateMin(),"Se debe de reservar con almenos 3 horas de antelación")
        .max(getDateMax(), "No se puede reservar con mas de tres meses de antelación"),
    people: Yup.number()
        .required("Debe seleccionar el número de comensales")
        .min(1, "Debes seleccionar al menos una persona")
        .max(10, "Contacta directamente con recepción para reservas de más de 10 comensales")
  }),

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
    titulo: "Reserva de tour",
    mensaje: "Como cliente solicito el tour "+values.tour.title+" para "+values.people+" persona/s, que dura "+values.tour.hours+". Precio: " + (values.tour.price !== "¡Gratis!"?values.tour.price.split("?")[0]+" euros/p":values.tour.price) + ". El tour comenzará el " + transformDate(values.hour) + "h.\n" + values.comment
  }
}

class TourismForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {open:false}
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

  render(){
    return(<div>
      <Form 
        setSuccess ={this.setSuccess.bind(this)} 
        setError = {this.setError.bind(this)} 
        tours={this.props.tours}
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


export default withRouter(TourismForm);

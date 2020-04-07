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
import { ways, transformDate } from "../constants/shuttle"
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es"
const styles = () => ({
  card: {
    minWidth: 746,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  actions: {
    float: "right"
  },
  title: {
    fontSize: 21,
  },
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
  } = props;
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Solicitud de transporte al aeropuerto
            </Typography>
            <TextField
              id="way"
              name="way"
              label="Seleccione el sentido del trayecto"
              select
              value={values.way}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.way ? errors.way : ""}
              error={touched.way && Boolean(errors.way)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {ways.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
              <DatePickerField
               id="hour"
               name="hour"
               label="Seleccione el momento de partida"
               value={values.hour}
               onChange={handleChange}
               onBlur={handleBlur}
               helperText={touched.hour ? errors.hour : ""}
               error={touched.hour && Boolean(errors.hour)}
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
  date.setTime(date.getTime() +  3 * 3600 * 1000)
  return date
}
const getDateMax = () =>{
  var date = new Date()
  date.setTime(date.getTime() + 1 * 31 * 24 * 3600 * 1000)
  return date
}

const ShuttleForm = withFormik({
  mapPropsToValues: ({
    way,
    hour,
    comment
  }) => {
    return {
      way: way || "",
      hour: hour || new Date(),
      comment: comment || ""
    };
  },

  validationSchema: Yup.object().shape({
    way: Yup.string()
      .required("Seleccione el tipo de trayecto")
      .trim()
      .test("isDefault", "Inyección de código detectada",
        function (value) {
          if (value !== "") {
            return ways.reduce((acumulator = false, element) => acumulator = acumulator || (element["value"] === value))
          }
          return false
        })
    ,
    hour: Yup.date()
      .required("Seleccione una día y una hora para continuar")
      .test("isDefault", "Los buses solo salen a en punto. Por ejemplo: 9:00",
        function (value) {
          return value.getMinutes() === 0
        })
      .min(getDateMin(),"Se debe de reservar con almenos 3 horas de antelación")
      .max(getDateMax(), "No se puede reservar con mas de un mes de antelación")
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      values.hour = transformDate(values.hour)
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(ShuttleForm);

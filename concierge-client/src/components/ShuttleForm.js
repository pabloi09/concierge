import React from "react";
import { withFormik } from "formik";
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
import { ways, getHours } from "../constants/shuttle"
const styles = () => ({
  card: {
    minWidth: 662,
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
const hours = getHours()
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
            <TextField
              id="hour"
              name="hour"
              label="Seleccione la hora de partida "
              select
              value={values.hour}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.hour ? errors.hour : ""}
              error={touched.hour && Boolean(errors.hour)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {hours.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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

const ShuttleForm = withFormik({
  mapPropsToValues: ({
    way,
    hour,
    comment
  }) => {
    return {
      way: way || "",
      hour: hour || "",
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
    hour: Yup.string()
      .required("Seleccione una hora para continuar")
      .test("isDefault", "La hora introducida no es valida",
        function (value) {
          if (value !== "") {
            return hours.reduce((acumulator = false, element) => acumulator = acumulator || (element["value"] === value))
          }
          return false
        })
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(ShuttleForm);

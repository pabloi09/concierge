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
    Typography,
    } from '@material-ui/core';

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
    sendForm
  } = props;
  console.log("sendForm")
  return (
    <div className={classes.container}>
      <form onSubmit={(...args) => {
        handleSubmit(...args)
        sendForm()}}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Solicitud personalizada
            </Typography>
            <TextField
              aria-label="minimum height"
              placeholder="Escriba aquí su solicitud personalizada"
              id="customRequest"
              label="Solicitud personalizada"
              value={values.customRequest}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.customRequest ? errors.customRequest : ""}
              error={touched.customRequest && Boolean(errors.customRequest)}
              margin="dense"
              variant="outlined"
              multiline
              rows="5"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              ENVIAR SOLICITUD
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: ({
    customRequest,
  }) => {
    return {
      customRequest: customRequest || "",
    };
  },

  validationSchema: Yup.object().shape({
    customRequest: Yup.string()
      .required("Introduzca su solicitud")
      .max(2000, "La solicitud no puede exceder 2000 caracteres")
  }),

  handleSubmit: (values, { setSubmitting } ) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(LoginForm);

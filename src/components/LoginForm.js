import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Button
    } from '@material-ui/core';

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  actions: {
    float: "right"
  }
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
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="dni"
              label="DNI/NIE"
              value={values.dni}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.dni ? errors.dni : ""}
              error={touched.dni && Boolean(errors.dni)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              LOGIN
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: ({
    dni,
    password,
  }) => {
    return {
      dni: dni || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    dni: Yup.string()
      .required("Introduzca su DNI/NIE")
      .trim()
      .matches(/^((\d{8})([A-Z])|[XYZ]\d{7,8}[A-Z])$/ , "Introduzca un DNI/NIE válido"),
    password: Yup.string()
      .required("Introduzca su contraseña")
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default withStyles(styles)(LoginForm);

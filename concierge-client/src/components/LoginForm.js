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
import Communication from "../Communication"
import DialogComponent from "./DialogComponent"
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
              id="roomNumber"
              label="Número de habitación"
              value={values.roomNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.roomNumber ? errors.roomNumber : ""}
              error={touched.roomNumber && Boolean(errors.roomNumber)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
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

const Form = withStyles(styles)(withFormik({
  mapPropsToValues: ({
    dni,
    roomNumber,
  }) => {
    return {
      dni: dni || "",
      roomNumber: roomNumber || "",
    };
  },

  validationSchema: Yup.object().shape({
    dni: Yup.string()
      .required("Introduzca su DNI/NIE")
      .trim()
      .matches(/^((\d{8})([A-Z])|[XYZ]\d{7,8}[A-Z])$/ , "Introduzca un DNI/NIE válido"),
    roomNumber: Yup.number().typeError("Introduzca un número de habitación válido")
      .required("Introduzca su número de habitación")
      .positive("Introduzca un número de habitación válido")
      .integer("Introduzca un número de habitación válido")
      .max(999, "Introduzca un número de habitación válido")
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    setTimeout(() => {
      // submit to the server
      var c = new Communication()
      c.makePostRequest("/login",values)
      .then((json)=>{
        if(json["code"]==200){
           json["cliente"] = JSON.parse(json["cliente"])
           props.login(json)
        }else{
          props.setOpen(true)
          setSubmitting(false);
        }
       })

    }, 100);
  },
})(form));

class LoginForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {open:false}
    this.setOpen.bind(this)
  }
  setOpen(o){
    this.setState({open:o})
  }
  render(){
    return(<div>
      <Form setOpen ={(v)=>this.setOpen(v)} login={this.props.login}/>
      <DialogComponent 
        open = {this.state.open}
        title="Error" 
        text="Los datos no corresponden a ningún cliente" 
        action1name="OK" 
        action1={()=>this.setOpen(false)}/>
    </div>)
  }
}

export default LoginForm;

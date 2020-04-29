import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import {
  TextField,
  Button
} from '@material-ui/core';
import Communication from "../../Communication"
import { withRouter } from "react-router-dom"
import DialogComponent from "../common/DialogComponent"

const getJson = (values)=>{

    const jsonMessage = {
        "name": values.name
    };
    return jsonMessage;
}

const styles = () => ({
  container: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    alignItems: "center"
  }, 
  actions: {
      width: "100%"
  },
  margin: {
      marginLeft: "10px",
      marginRight: "10px",
      width: 200
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
    <form onSubmit={handleSubmit}>
        <div className={classes.container}>      
            <TextField
            id="name"
            className={classes.margin}
            name="name"
            label={"Nombre: "+props.client.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            margin="dense"
            variant="outlined" 
            size="small"
            ></TextField>
            <Button type="submit" className={classes.margin} color="primary" disabled={isSubmitting}>
                Actualizar datos
            </Button>
        </div>
    </form>
  );
};

const Form = withStyles(styles)(withFormik({
  mapPropsToValues: ({
    name
  }) => {
    return {
      name: name || ''
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
        .max(20, 'Debe tener 20 caracteres como máximo')
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    setTimeout(() => {
        // submit to the server
        var c = new Communication()
        c.makePostRequest("/updateProfile", getJson(values))
        .then((json)=>{
          if(json["code"]===200){
            props.setSuccess()
            json["cliente"] = JSON.parse(json["cliente"])
            props.login(json);
          }else{
            props.setError();
            console.log("Error: ");
          }
          setSubmitting(false);
         });
      }, 1000);
  }
})(form));

class PersonalDetailsForm extends React.Component{
    constructor(props){
      super(props)
      this.state = {open:false}
      this.setOpen.bind(this)
    }
    setOpen(o){
      this.setState({open:o})
    }
    setSuccess(invoiceURL){
      this.setState({open:true,
        title: "Datos actualizados",
        text:"Usted ha realizado la actualización de los datos correctamente.",
        action1name:"Cerrar",
        action1:()=>{
          this.setOpen(false)
          this.props.history.goBack()
        },
      })
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
        <Form setSuccess={this.setSuccess.bind(this)} setError={this.setError.bind(this)} client={this.props.client} login={this.props.login}/>
        <DialogComponent 
            open = {this.state.open}
            title={this.state.title}
            text={this.state.text}
            action1name={this.state.action1name}
            action1={this.state.action1}/>
      </div>)
    }
  }
  
  export default withRouter(PersonalDetailsForm);

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
        "name": values.name,
        "DNI": values.DNI
    };
    return jsonMessage;
}

const styles = () => ({
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
        <div style={{display: "block", paddingTop: "10px"}}>
            <TextField
            id="name"
            name="name"
            label={"Nombre: "+props.client.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            margin="dense"
            variant="outlined"
            fullWidth
            ></TextField>
            <TextField
            id="DNI"
            name="DNI"
            label={"DNI/NIF: "+props.client.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.DNI}
            helperText={touched.DNI ? errors.DNI : ""}
            error={touched.DNI && Boolean(errors.DNI)}
            margin="dense"
            variant="outlined"
            fullWidth
            ></TextField>
        </div>
        <Button type="submit" className={classes.actions} color="primary" disabled={isSubmitting}>
            Actualizar datos
        </Button>
      </form>
    </div>
  );
};

const Form = withStyles(styles)(withFormik({
  mapPropsToValues: ({
    name,
    DNI
  }) => {
    return {
      name: name || '',
      DNI: DNI || ''
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
        .max(20, 'Debe tener 20 caracteres como máximo'),
    DNI: Yup.string()
        .max(10, 'Debe tener 20 caracteres como máximo'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    setTimeout(() => {
        // submit to the server
        var c = new Communication()
        c.makePostRequest("/updatePersonalDetails", getJson(values))
        .then((json)=>{
          if(json["code"]===200){
            props.setSuccess()
            json["cliente"] = JSON.parse(json["cliente"])
            props.login(json);
          }else{
            props.setError();
            console.log("Error: ");
          }
          console.log(json);
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
      console.log(invoiceURL)
      this.setState({open:true,
        title: "Datos actualizados correctamente",
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
        <Form setSuccess={this.setSuccess.bind(this)} setError={this.setError.bind(this)} client={this.props.client}/>
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

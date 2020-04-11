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
  Typography
} from '@material-ui/core';
import Communication from "../Communication"
import { withRouter } from "react-router-dom"
import DialogComponent from "./DialogComponent"

let submitted = false;

var invoiceURL = "http://localhost:3000";

const getJson = (values)=>{

    const jsonMessage = {
        "companyName": values.companyName,
        "NIF": values.NIF,
        "phone": values.phone, 
        "email": values.email,
        "address": values.address, 
        "city": values.city, 
        "postalCode": values.postalCode
    };
    return jsonMessage;
}

const styles = () => ({
  card: {
    minWidth: 662,
    maxWidth: 1000,
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
    fontSize: 21
  },
  text: {
      fontSize: 15
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
          <CardContent styles={{padding: "10px"}}>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Página de check-out
            </Typography>
            <Typography className={classes.text} color="textPrimary">El importe a pagar es de <b>141,90 €</b>. Si desea obtener una factura, rellene el siguiente formulario y podrá recibirla por correo electrónico. Una vez generada, podrá verla y proceder al pago.</Typography>                
            <div style={{display: "block", paddingTop: "10px"}}>
                <TextField
                id="companyName"
                name="companyName"
                label="Nombre empresa o comercial(*)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
                helperText={touched.companyName ? errors.companyName : ""}
                error={touched.companyName && Boolean(errors.companyName)}
                margin="dense"
                variant="outlined"
                fullWidth
                ></TextField>
                <TextField
                id="NIF"
                name="NIF"
                label="NIF(*)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.NIF}
                helperText={touched.NIF ? errors.NIF : ""}
                error={touched.NIF && Boolean(errors.NIF)}
                margin="dense"
                variant="outlined"
                fullWidth
                ></TextField>
                <TextField
                id="phone"
                name="phone"
                label="Teléfono"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                helperText={touched.phone ? errors.phone : ""}
                error={touched.phone && Boolean(errors.phone)}
                margin="dense"
                variant="outlined"
                fullWidth
                ></TextField>
                <TextField
                id="email"
                name="email"
                label="Email(*)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                margin="dense"
                variant="outlined"
                fullWidth
                ></TextField>
                <TextField
                id="address"
                name="address"
                label="Dirección(*)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                helperText={touched.address ? errors.address : ""}
                error={touched.address && Boolean(errors.address)}
                margin="dense"
                variant="outlined"
                fullWidth
                ></TextField>
                <TextField
                id="city"
                name="city"
                label="Ciudad(*)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                helperText={touched.city ? errors.city : ""}
                error={touched.city && Boolean(errors.city)}
                margin="dense"
                variant="outlined"
                fullWidth
                ></TextField>
                <TextField
                id="postalCode"
                name="postalCode"
                label="Código Postal(*)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.postalCode}
                helperText={touched.postalCode ? errors.postalCode : ""}
                error={touched.postalCode && Boolean(errors.postalCode)}
                margin="dense"
                variant="outlined"
                fullWidth
                ></TextField>
            </div>
          </CardContent>
          <CardActions className={classes.actions}>

            <Button type="submit" color="primary" disabled={isSubmitting} onClick={() => {submitted=true;}}>
              Generar factura
            </Button>
            <a href={invoiceURL} target="_blank" style={{"textDecoration": "none"}} disabled={!submitted} rel="noopener noreferrer">
                <Button id="overview_button" color="primary" disabled={!submitted}>
                    Ver factura
                </Button>
            </a>
          </CardActions>
        </Card>

      </form>
    </div>
  );
};

const Form = withStyles(styles)(withFormik({
  mapPropsToValues: ({
    companyName,
    NIF,
    phone,
    email,
    address,
    city,
    postalCode
  }) => {
    return {
      companyName: companyName || '',
      NIF: NIF || '',
      phone: phone || '',
      email: email || '',
      address: address || '',
      city: city || '',
      postalCode: postalCode || ''
    };
  },

  validationSchema: Yup.object().shape({
    companyName: Yup.string()
        .max(20, 'Debe tener 20 caracteres como máximo')
        .required('Campo obligatorio'),
    NIF: Yup.string()
        .max(10, 'Debe tener 10 caracteres como máximo')
        .required('Campo obligatorio'),
    phone: Yup.string()
        .max(9, 'Debe tener 9 caracteres')
        .min(9, 'Debe tener 9 caracteres'),
    email: Yup.string()
        .required('Campo obligatorio'),
    address: Yup.string()
        .max(50, 'Debe tener 50 caracteres como máximo')
        .required('Campo obligatorio'),
    city: Yup.string()
        .max(50, 'Debe tener 50 caracteres como máximo')
        .required('Campo obligatorio'),
    postalCode: Yup.string()
        .max(5, 'Debe tener 5 caracteres')
        .min(5, 'Debe tener 5 caracteres')
        .required('Campo obligatorio')
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    setTimeout(() => {
        // submit to the server
        var c = new Communication()
        console.log("Petición: ")
        console.log(getJson(values))
        c.makePostRequest("/checkout", getJson(values))
        .then((json)=>{
          if(json["code"]===200){
             props.setSuccess();
             invoiceURL = json["url"];
             console.log("Respuesta: ");
             console.log(json);
          }else{
            props.setError();
            console.log("Error: ");
            console.log(json);
          }
          
          setSubmitting(false);
         });
      }, 1000);
  }
})(form));

class CheckoutForm extends React.Component{
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
        title: "Factura generada correctamente",
        text:"Usted ha realizado el check-out correctamente. Le hemos enviado la factura al correo electrónico proporcionado y puede encontrarla a continuación.",
        action1name:"OK",
        action1:()=>{
          this.setOpen(false)
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
        <Form setSuccess={this.setSuccess.bind(this)} setError={this.setError.bind(this)}/>
        <DialogComponent 
          open = {this.state.open}
          title={this.state.title}
          text={this.state.text}
          action1name={this.state.action1name}
          action1={this.state.action1}/>
      </div>)
    }
  }
  
  export default withRouter(CheckoutForm);

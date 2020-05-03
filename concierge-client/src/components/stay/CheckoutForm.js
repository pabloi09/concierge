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
import Communication from "../../Communication"
import { withRouter } from "react-router-dom"
import DialogComponent from "../common/DialogComponent"

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
var total = "";
const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent styles={{padding: "10px"}}>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Página de check-out
            </Typography>
            <Typography className={classes.text} color="textPrimary">
                {"Muchas gracias por su estancia en el Hotel Riu Plaza de España. Antes de realizar el checkout, puede solicitar un servicio de transporte en el apartado de transportes. "+
                "El importe a pagar es de "+parseFloat(total)*1.1+"0 €. Si desea obtener una factura, rellene el siguiente formulario y podrá recibirla por correo electrónico. "+
                "Una vez generada, podrá verla y proceder al pago. "+
                "Un empleado del hotel irá a ayudarle con su equipaje tan pronto como realice el check-out. Su llave de nuestras instalaciones se mantendrá activa durante los siguientes 60 minutos."}
            </Typography>                
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

            <Button type="submit" color="primary" disabled={isSubmitting}>
              Generar factura
            </Button>
            
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
        c.makePostRequest("/checkout", getJson(values))
        .then((json)=>{
          if(json["code"]===200){
             invoiceURL = json["url"];
             props.setSuccess(invoiceURL);
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
      this.state = {open:false, bill: props.bill}
      this.setOpen.bind(this)
    }
    setOpen(o){
      this.setState({open:o})
    }
    setSuccess(invoiceURL){
      this.setState({open:true,
        title: "Factura generada correctamente",
        text:"Usted ha realizado el check-out correctamente. Le hemos enviado la factura al correo electrónico proporcionado y puede encontrarla a continuación.",
        action1name:"Salir",
        action1:()=>{
            this.setOpen(false)
            var c = new Communication()
            c.makeGetRequest("/logout",{})
            .then((json)=>{
                if(json["code"]===200)
                this.props.logout()
            })
        },
        action2name:"Ver factura",
        action2:()=>{
          window.open(invoiceURL, '_blank').focus()
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
      total = this.state.bill[0].total;
      return(<div>
        <Form setSuccess={this.setSuccess.bind(this)} setError={this.setError.bind(this)}/>
        <DialogComponent 
          open = {this.state.open}
          title={this.state.title}
          text={this.state.text}
          action1name={this.state.action1name}
          action1={this.state.action1}
          action2 = {this.state.action2}
          action2name = {this.state.action2name}/>
      </div>)
    }
  }
  
  export default withRouter(CheckoutForm);

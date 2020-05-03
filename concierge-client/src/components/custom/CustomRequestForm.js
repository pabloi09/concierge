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
import { getJson } from "../../constants/customrequest"
import Communication from "../../Communication"
import { withRouter } from "react-router-dom"
import DialogComponent from "../common/DialogComponent"
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
  } = props;
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
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

const Form = withStyles(styles)(withFormik({
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

  handleSubmit: (values, { setSubmitting, props })  => {
    setTimeout(() => {
      // submit to the server
      var c = new Communication()
      console.log(getJson(values))
      c.makePostRequestUTF8("/solicitud",getJson(values))
      .then((json)=>{
        if(json["code"] === 200){
           props.setSuccess();
           json["cliente"] = JSON.parse(json["cliente"]);
           props.login(json);
        }else{
          props.setError();
        }
        setSubmitting(false);
       });
    }, 1000);
  }
})(form));

class CustomRequestForm extends React.Component{
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
        this.props.history.goBack()
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
      <Form setSuccess ={this.setSuccess.bind(this)} setError = {this.setError.bind(this)} login={this.props.login}/>
      <DialogComponent 
        open = {this.state.open}
        title={this.state.title}
        text={this.state.text}
        action1name={this.state.action1name}
        action1={this.state.action1}/>
    </div>)
  }


}


export default withRouter(CustomRequestForm);

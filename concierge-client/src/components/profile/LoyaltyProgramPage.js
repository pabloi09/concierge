import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom"
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography
} from '@material-ui/core';
import DialogComponent from "../common/DialogComponent"
import Communication from "../../Communication"

const styles = () => ({
    card: {
        width: 662,
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
    puntos: {
        fontSize: 40
    },
    margin: {
        marginTop: 25,
        marginBottom: 25
    }
});

var afiliado;

const form = props => {
    const {
        classes,
        isSubmitting,
        handleSubmit
    } = props;

    var items = [];
    if (props.client.afiliado === true) {
        items.push(
            <div className={classes.container}>
                <div className={classes.margin}>
                    <Typography className={classes.puntos} color="textPrimary">{props.client.puntos+" puntos"}</Typography>
                </div>
            </div>
        );
    }

    afiliado = props.client.afiliado;

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Programa de fidelización
                    </Typography>
                    <Typography className={classes.text} color="textPrimary">
                        {props.client.afiliado === true ? 
                        "Muchas gracias por pertenecer a nuestro programa de fidelización. Puede canjear los puntos en su próximo cobro. Contacte con recepción para más información." :
                        "Todavía no perteneces a nuestro programa de fidelización. Puedes darte de alta en el servicio y disfrutar de muchas ventajas como canjear los puntos acumulados por estancias en hoteles de nuestra cadena."}
                    </Typography>    
                    {items}            
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button type="submit" color="primary" disabled={isSubmitting}>
                        {props.client.afiliado === true ? "Darse de baja" : "Darse de alta"}
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </div>
    );
};

const Form = withStyles(styles)(withFormik({
    

    validationSchema: Yup.object().shape({

        }),

    handleSubmit: (values, { setSubmitting, props }) => {
        setTimeout(() => {
            // submit to the server
            var c = new Communication()
            c.makePostRequestUTF8("/changesLoyalty", {})
            .then((json)=>{
              if(json["code"]===200){
                 props.setSuccess()
                 json["cliente"] = JSON.parse(json["cliente"])
                 props.login(json)
              }else{
                props.setError()
              }
              setSubmitting(false);
        })    
        }, 1000);
    }
})(form));

class LoyaltyProgramPage extends React.Component{
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
        title: "Cambios realizados con éxito",
        text: afiliado === false ? "Bienvenido al programa de fidelización. Gracias por confiar en nosotros" : "Sentimos verte partir. Te esperamos pronto.",
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
        <Form setSuccess ={this.setSuccess.bind(this)} setError = {this.setError.bind(this)} login={this.props.login} client={this.props.client}/>
        <DialogComponent 
          open = {this.state.open}
          title={this.state.title}
          text={this.state.text}
          action1name={this.state.action1name}
          action1={this.state.action1}/>
      </div>)
    }
}
export default withRouter(LoyaltyProgramPage);

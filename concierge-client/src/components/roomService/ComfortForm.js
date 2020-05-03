import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import { comfort, getJson } from "../../constants/comfort";
import { withRouter } from "react-router-dom"
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Button,
    MenuItem,
    Typography
} from '@material-ui/core';
import DialogComponent from "../common/DialogComponent"
import Communication from "../../Communication"
const styles = () => ({
    card: {
        minWidth: 600,
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
        handleSubmit
    } = props;

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Solicitud de elementos de confort
                    </Typography>
                        <TextField
                            id="element"
                            name="element"
                            label="Elemento de confort"
                            select
                            value={values.element}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.element ? errors.element : ""}
                            error={touched.element && Boolean(errors.element)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        >
                        {comfort.map((option)=>(
                            <MenuItem key = {option.value} value = {option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                            id="comment"
                            name="comment"
                            label="Añade un comentario adicional"
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

const Form = withStyles(styles)(withFormik({
    mapPropsToValues: ({
        element,
        comment,
    }) => {
        return {
            element: element || "",
            comment: comment || "",
        };
    },

    validationSchema: Yup.object().shape({
        element: Yup.string()
            .required("Seleccione un elemento de comfort")
            .test("isDefault", "Inyección de código detectada", 
                function(value) {
                    if(value !== ""){
                        return comfort.reduce((acumulator = false, element)=> acumulator = acumulator || (element["value"] === value))
                    }
                    return false
                })
            
        }),

    handleSubmit: (values, { setSubmitting, props }) => {
        setTimeout(() => {
            // submit to the server
            var c = new Communication()
            c.makePostRequestUTF8("/solicitud",getJson(values))
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

class ComfortForm extends React.Component{
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


export default withRouter(ComfortForm);

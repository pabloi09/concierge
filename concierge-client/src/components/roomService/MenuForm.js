import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from "formik";
import * as Yup from "yup";
import { menu, getJson } from "../../constants/menu";
import { withRouter } from "react-router-dom"
import DialogComponent from "../common/DialogComponent"
import Communication from "../../Communication"
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Button,
    MenuItem,
    Typography,
    withStyles,
} from '@material-ui/core';
import MenuSection from "./MenuSection"

const useStyles = () => ({
    root: {
        width: '100%',
    },
    list: {
        width: '100%',
        maxWidth: 360,
    },
    card: {
        width:635,
        minWidth: 546,
        minHeight:340,
        marginTop: 50
      },
    container: {
      
      display: "Flex",
      justifyContent: "center",
      flexGrow:1
    },
    actions: {
      float: "right"
    },
    title: {
      fontSize: 21,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    disclaimer: {
      fontSize:12
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
        handleSubmit
    } = props;

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
            <Card className={classes.card}>
                {
                    menu.map((section,i)=>{
                    return(<MenuSection key={i} section = {section}/>)
                    })
                }
                
            
                </Card>
            </form>
        </div>
    );
}

const Form = withStyles(useStyles)(withFormik({
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
            .test("isDefault", "Inyección de código detectada",
                function (value) {
                    if (value !== "") {
                        return menu.reduce((acumulator = false, element) => acumulator = acumulator || (element["value"] === value))
                    }
                    return false
                })

    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        setTimeout(() => {
            // submit to the server
            var c = new Communication()
            c.makePostRequest("/solicitud", getJson(values))
                .then((json) => {
                    if (json["code"] === 200) {
                        props.setSuccess()
                        json["cliente"] = JSON.parse(json["cliente"])
                        props.login(json)
                    } else {
                        props.setError()
                    }
                    setSubmitting(false);
                })
        }, 1000);
    }
})(form));

class MenuForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.setOpen.bind(this)
    }
    setOpen(o) {
        this.setState({ open: o })
    }
    setSuccess() {
        this.setState({
            open: true,
            title: "Solicitud enviada con éxito",
            text: "Puede revisar sus solicitudes en el apartado de Solitudes",
            action1name: "OK",
            action1: () => {
                this.setOpen(false)
                this.props.history.goBack()
            }
        })
    }
    setError() {
        this.setState({
            open: true,
            title: "Error",
            text: "No está autenticado en el servidor. Vuelva a entrar a la web e inténtelo de nuevo",
            action1name: "OK",
            action1: () => {
                this.setOpen(false)
            }
        })
    }
    render() {
        return (<div>
            <Form setSuccess={this.setSuccess.bind(this)} setError={this.setError.bind(this)} login={this.props.login} />
            <DialogComponent
                open={this.state.open}
                title={this.state.title}
                text={this.state.text}
                action1name={this.state.action1name}
                action1={this.state.action1} />
        </div>)
    }


}


export default withRouter(MenuForm);
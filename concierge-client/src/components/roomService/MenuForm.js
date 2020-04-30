import React from 'react';
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
    Typography,
    withStyles,
} from '@material-ui/core';
import MenuSectionWrapper from "./MenuSectionWrapper"

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
        marginTop: 50,
        marginBottom: 50
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
        handleSubmit,
        menus
    } = props;

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Solicitud de comida
                        </Typography>

                        <MenuSectionWrapper
                            id="menu"
                            name="menu"
                            value={values.menu}
                            onChange={handleChange}
                            helperText={touched.menu ? errors.menu : ""}
                            error={touched.menu && Boolean(errors.menu)}
                            menu={menus}/>
                        
                        <TextField
                            id="comment"
                            name="comment"
                            label="Añada un comentario adicional"
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
}

const Form = withStyles(useStyles)(withFormik({
    mapPropsToValues: ({
        menu,
        comment,
    }) => {
        return {
            menu: menu || [],
            comment: comment || "",
        };
    },

    validationSchema: Yup.object().shape({
        menu: Yup.array().required("Debe de seleccionar al menos 1 comida")

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
            <Form 
                setSuccess={this.setSuccess.bind(this)} 
                setError={this.setError.bind(this)} 
                menus={menu(this.props.menu)}
                login={this.props.login} />
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
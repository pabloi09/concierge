import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import { comfort } from "../constants/comfort";

import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Button,
    MenuItem
} from '@material-ui/core';

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

    const handleSelect = (event, ...args)=>{
        values.element = event.target.value
        handleChange(event,args)

    }
    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardContent>
                        <TextField
                            id="element"
                            name="element"
                            label="Elemento de confort"
                            select
                            value={values.element}
                            onChange={handleSelect}
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

const ComfortForm = withFormik({
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

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            // submit to the server
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    }
})(form);

export default withStyles(styles)(ComfortForm);

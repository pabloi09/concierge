import React from "react";
import {
  Card,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles
} from '@material-ui/core';
import { withRouter } from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles =  makeStyles({
    root: {
        width: 662,
        marginTop: 50
    },
    container: {
        display: "Flex",
        justifyContent: "center"
    },
    title: {
        fontSize: 21
    },
    text: {
        fontSize: 15,
        textAlign: "justify"
    }
});


const PersonalDetailsPage = (props) => {

    const classes = styles();

    return (
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardContent style={{padding: "10px"}}>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Consulta de datos personales
                    </Typography>
                    <Typography className={classes.text} color="textPrimary">A continuación, puede comprobar de qué datos suyos disponemos en el Hotel Concierge.</Typography>                
                    <div style={{ paddingTop: "10px"}}>
                        <Typography className={classes.text} color="textPrimary"><b>Nombre: </b>{props.client.nombre+"."}</Typography>
                        <Typography className={classes.text} color="textPrimary"><b>DNI: </b>{props.client.dni+"."}</Typography>
                        <Typography className={classes.text} color="textPrimary"><b>Afiliado: </b>{(props.client.afiliado+'') === 'true' ? "Sí." : "No."}</Typography>
                        <Typography className={classes.text} color="textPrimary"><b>Puntos: </b>{props.client.puntos+"."}</Typography>
                        <Typography className={classes.text} color="textPrimary"><b>Habitación: </b>{(props.client.habitacion.num !== null ? props.client.habitacion.num : "Ninguna")+"."}</Typography>
                        <div style={{width: "100%", paddingTop: "10px"}}>
                            <ExpansionPanel style={{backgroundColor: 'rgba(0, 0, 0, .03)', borderBottom: '1px solid rgba(0, 0, 0, .125)'}}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography className={classes.text} color="textPrimary">Tratamiento de los datos (RGPD 2016/679)</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{display: "block"}}>
                                    <Typography><b>Responsable:</b> Hotel Concierge.</Typography>
                                    <Typography><b>Finalidad:</b> Los datos recabados serán utilizados para la gestión de estancias y mejoras en la experiencia de usuario del hotel.</Typography>
                                    <Typography><b>Legitimación:</b> RGPD: 6.1.e): el interesado ha dado su consentimiento para el tratamiento de sus datos personales para este fin específico.</Typography>
                                    <Typography><b>Destinatarios:</b> No serán utilizados en ningún otro contexto ni cedidos a terceras personas o entidades.</Typography>
                                    <Typography><b>Derechos:</b> Puede acceder, rectificar, y cancelar los datos, así como ejercer otros derechos, comunicando su intención a través de correo electrónico a {<a href="mailto:hotel.concierge.madrid@gmail.com?Subject=Derechos%20RGPD">hotel.concierge.madrid@gmail.com</a>}.</Typography>
                                    
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
    );
}
export default withRouter(PersonalDetailsPage);


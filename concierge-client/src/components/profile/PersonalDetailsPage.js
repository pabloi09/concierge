import React from "react";
import {
  Card,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  TextField
} from '@material-ui/core';
import { withRouter } from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonalDetailsForm from './PersonalDetailsForm';

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
    },
    margin: {
        marginLeft: "10px",
        marginRight: "10px",
        width: 200
    }
});


const PersonalDetailsPage = (props) => {

    const classes = styles();

    return (
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardContent style={{padding: "20px"}}>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Actualización de datos personales
                    </Typography>
                    <Typography className={classes.text} color="textPrimary">A continuación, puede comprobar de qué datos suyos disponemos en el Hotel Concierge, así como modificar algunos de ellos.</Typography>                
                    <div style={{ paddingTop: "10px"}}>
                        <PersonalDetailsForm client={props.client}/>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "10px"}}>
                            <TextField className={classes.margin} disabled size="small" label={"DNI: "+props.client.dni} margin="dense" variant="filled" ></TextField>
                            <TextField className={classes.margin} disabled size="small" label={"Afiliado: "+((props.client.afiliado+'') === 'true' ? "Sí" : "No")} margin="dense" variant="filled" ></TextField>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "10px"}}>
                            <TextField className={classes.margin} disabled size="small" label={"Puntos: "+props.client.puntos} margin="dense" variant="filled" ></TextField>
                            <TextField className={classes.margin} disabled size="small" label={"Habitación: "+(props.client.habitacion.num !== null ? props.client.habitacion.num : "Ninguna")} margin="dense" variant="filled" ></TextField> 
                        </div>
                        <div style={{width: "100%", paddingTop: "20px"}}>
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

/*

<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
    <div style={{float: "left"}}>
        <Typography className={classes.text} color="textPrimary"><b>Afiliado: </b>{(props.client.afiliado+'') === 'true' ? "Sí." : "No."}</Typography>
        <Typography className={classes.text} color="textPrimary"><b>Puntos: </b>{props.client.puntos+"."}</Typography>
        <Typography className={classes.text} color="textPrimary"><b>Habitación: </b>{(props.client.habitacion.num !== null ? props.client.habitacion.num : "Ninguna")+"."}</Typography>
    </div>
</div>

*/
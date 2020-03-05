import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class OrderStatusCard extends Component {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <ExpansionPanel style={{width: "80%"}}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content">
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "10%"}}>
                            <h2>Su solicitud de Taxi</h2>
                            <img src="assets/requests/enviada.png" style={{width: "90%"}}/>
                        </div> 
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>

        );
    }
}

export default OrderStatusCard;


/*
enviada-> en proceso -> completada
rechazada



En todas puede haber también: Su solicitud no ha sido aceptada, póngase en contacto con la recepción del hotel.
- Estancia:
    - Nueva reserva: solicitud aceptada, comprobando disponibilidad, reserva completada

- Servicio de habitaciones:
    - Incidencia: solicitud aceptada, gestionando incidencia, reparador en camino, incidencia resuelta
    - Carta: solicitud aceptada, preparando pedido, pedido en camino, ¡Listo!
    
- Ocio:
    - Restaurante: solicitud aceptada, comprobando disponibilidad, reserva completada
    - Entradas: solicitud aceptada, comprobando disponibilidad, reserva completada
    - Guía turismo: solicitud aceptada, comprobando disponibilidad, reserva completada
    - Compras: solicitud aceptada, preparando pedido, pedido en camino, ¡Listo!

- Transporte:
    - Shuttle: solicitud aceptada, comprobando disponibilidad, reserva completada
    - Taxi: solicitud aceptada, comprobando disponibilidad, reserva completada
    - VTC: solicitud aceptada, comprobando disponibilidad, reserva completada

- Personalizada: solicitud aceptada, comprobando disponibilidad, pedido completado

*/
import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class OrderStatusCard extends Component {

    render() {

        const getDate = (timestamp) => {
            // From timestamp to date
            var date = new Date(timestamp); 
            var formattedTime = date.toLocaleString();
            var newStr = formattedTime.substring(0, formattedTime.length - 3);            
            return newStr;
        };

        const items = [];

        for(const [i, m] of this.props.info.entries()) {
            if (m.emisorCliente+'' === 'true') {
                var lineas = [];
                m.cuerpo.split("\n").map((linea, j)=>{lineas.push(<p key={i+j+1}>{linea}</p>)});
                items.push(<Typography key={i}><b>{getDate(m.timestamp)} Cliente: </b>{lineas}</Typography>);
            } else {
                items.push(<Typography key={i}><b>{getDate(m.timestamp)} Empleado: </b>{m.cuerpo}</Typography>);
            }
        }

        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1%", paddingBottom: "1%"}}>
                <ExpansionPanel style={{width: "80%"}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "10%"}}>
                            <h2>{this.props.title !== "Personalizada" ? "Su solicitud de "+this.props.title : "Su solicitud personalizada"}</h2>
                            <img src={"assets/requests/"+this.props.card+".png"} alt="Estado" style={{width: "90%"}}/>
                        </div> 
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{display: "block"}}>
                            {items}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default OrderStatusCard;

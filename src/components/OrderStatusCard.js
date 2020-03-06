import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class OrderStatusCard extends Component {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1%", paddingBottom: "1%"}}>
                <ExpansionPanel style={{width: "80%"}}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content">
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "10%"}}>
                            <h2>Su solicitud de {this.props.title}</h2>
                            <img src={"assets/requests/"+this.props.card+".png"} style={{width: "90%"}}/>
                        </div> 
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {this.props.info}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default OrderStatusCard;
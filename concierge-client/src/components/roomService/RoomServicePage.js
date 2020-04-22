import React, { Component } from 'react';
import GridComponent from '../common/GridComponent';
import {roomservices} from '../../constants/roomservices'
import {
    Switch,
    Route,
  } from "react-router-dom";
import { withRouter } from "react-router-dom"
import ComfortForm from "./ComfortForm"

class RoomServicePage extends Component {
    render() {
        if(! this.props.logged){
            this.props.history.replace("/login")
        }
        return (
                <Switch>
                    <Route path="/servicio-habitaciones/confort">
                        <ComfortForm login={this.login.bind(this)}/>
                    </Route>
                    <Route path="/servicio-habitaciones">
                        <GridComponent data={roomservices} logged={this.props.logged}/>
                    </Route>
                </Switch>
        );
    }
    login(json){
        this.props.login(json)
    }
}

export default withRouter(RoomServicePage);
import React, { Component } from 'react';
import GridComponent from './GridComponent';
import {roomservices} from '../constants/roomservices'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import ComfortForm from "./ComfortForm"

class RoomServicePage extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/servicio-habitaciones/confort">
                        <ComfortForm login={this.login.bind(this)}/>
                    </Route>
                    <Route path="/servicio-habitaciones">
                        <GridComponent data={roomservices} logged={this.props.logged}/>
                    </Route>
                </Switch>
            </Router>
        );
    }

    login(json){
        this.props.login(json)
    }
}

export default RoomServicePage;
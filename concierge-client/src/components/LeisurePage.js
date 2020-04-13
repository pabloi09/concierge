import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {leisure} from "../constants/leisure"
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import MapComponent from "./MapComponent"

class LeisurePage extends Component {
    render() {
        return (
            <Router>
            <Switch>
                <Route path="/ocio/restaurantes">
                    <MapComponent/>
                </Route>
                <Route path="/ocio">
                <GridComponent data={leisure} logged={this.props.logged}/>
                </Route>
            </Switch>
        </Router>
            
        );
    }
}

export default LeisurePage;
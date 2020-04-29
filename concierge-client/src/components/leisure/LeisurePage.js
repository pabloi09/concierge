import React, { Component } from 'react';
import GridComponent from "../common/GridComponent"
import {leisure} from "../../constants/leisure"
import {
    Switch,
    Route,
  } from "react-router-dom";
  import MapRestaurantComponent from "./MapRestaurantComponent"
  import { withRouter } from "react-router-dom"
class LeisurePage extends Component {
    render() {
        if(! this.props.logged){
            this.props.history.replace("/login")
        }
        return (
            <Switch>
                <Route path="/ocio/restaurantes">
                    <MapRestaurantComponent login={this.login.bind(this)}/>
                </Route>
                <Route path="/ocio">
                    <GridComponent data={leisure} logged={this.props.logged}/>
                </Route>
            </Switch>
            
        );
    }

    login(json){
        this.props.login(json)
    }
}

export default withRouter(LeisurePage);
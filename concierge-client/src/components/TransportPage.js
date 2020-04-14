import React, { Component } from 'react';
import GridComponent from './GridComponent';
import {transports} from '../constants/transports'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import ShuttleForm from "./ShuttleForm"

class TransportPage extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/transporte/shuttle">
                        <ShuttleForm login={this.login.bind(this)}/>
                    </Route>
                    <Route path ="/transporte/">
                        <GridComponent data={transports} logged={this.props.logged}/>
                    </Route>
                </Switch>
                
            </Router>
        );
    }

    login(json){
        this.props.login(json)
    }
}

export default TransportPage;
import React, { Component } from 'react';
import GridComponent from '../common/GridComponent';
import {transports} from '../../constants/transports'
import {
    Switch,
    Route,
  } from "react-router-dom";
import ShuttleForm from "./ShuttleForm"
import VTCForm from "./VTCForm"
import { withRouter } from "react-router-dom"
class TransportPage extends Component {

    render() {
        if(! this.props.logged){
            this.props.history.replace("/login")
        }
        return (
                <Switch>
                    <Route path="/transporte/shuttle">
                        <ShuttleForm login={this.login.bind(this)}/>
                    </Route>
                    <Route path="/transporte/vtc">
                        <VTCForm login={this.login.bind(this)}/>
                    </Route>
                    <Route path ="/transporte">
                        <GridComponent data={transports} logged={this.props.logged}/>
                    </Route>
                </Switch>
        );
    }

    login(json){
        this.props.login(json)
    }
}

export default withRouter(TransportPage);
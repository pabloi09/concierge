import React, { Component } from 'react';
import GridComponent from '../common/GridComponent';
import {stay} from '../../constants/stay';
import {
    Switch,
    Route,
  } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { withRouter } from "react-router-dom";
import NewBookingPage from './NewBookingPage';

class StayPage extends Component {

    render() {
        if(! this.props.logged){
            this.props.history.replace("/login");
        }
        return (
            <Switch>
                <Route path="/estancia/checkout">
                    <CheckoutForm bill={this.props.bill}/>
                </Route>
                <Route path="/estancia/nueva-reserva">
                    <NewBookingPage login={this.login.bind(this)} hotels={this.props.hotels}/>
                </Route>
                <Route path ="/estancia">
                    <GridComponent data={stay} logged={this.props.logged}/>
                </Route>
            </Switch>
        );
    }

    login(json){
        this.props.login(json)
    }
}

export default withRouter(StayPage);
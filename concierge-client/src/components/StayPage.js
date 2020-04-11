import React, { Component } from 'react';
import GridComponent from './GridComponent';
import {stay} from '../constants/stay'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import CheckoutForm from "./CheckoutForm"

class StayPage extends Component {

    render() {
        return (
            
            <Router>
                <Switch>
                    <Route path="/estancia/checkout">
                        <CheckoutForm/>
                    </Route>
                    <Route path ="/estancia">
                        <GridComponent data={stay} logged={this.props.logged}/>
                    </Route>
                </Switch>
            </Router>
                    

        );
    }
}

export default StayPage;
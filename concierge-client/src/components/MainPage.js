import React, { Component } from 'react';
import GridComponent from "./common/GridComponent"
import {services} from "../constants/services"
import {withRouter} from "react-router-dom"

class MainPage extends Component {
    render() {
        if(! this.props.logged){
            this.props.history.replace("/login")
        }
        return (
            <GridComponent data={services} logged={this.props.logged}/>
        );
    }
}

export default withRouter(MainPage);
import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {services} from "../constants/services"
import { withRouter } from "react-router-dom"

class MainPage extends Component {
    render() {
        return (
            <GridComponent data={services} logged={this.props.logged}/>
        );
    }
}

export default MainPage;
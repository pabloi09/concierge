import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {leisure} from "../constants/leisure"

class LeisurePage extends Component {
    render() {
        return (
            <GridComponent data={leisure} logged={this.props.logged}/>
        );
    }

    login(json){
        this.props.login(json)
    }
}

export default LeisurePage;
import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {services} from "../constants/services"

class MainPage extends Component {
    render() {
        return (
            <GridComponent data={services}/>
        );
    }
}

export default MainPage;
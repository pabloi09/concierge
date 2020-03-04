import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {stay} from "../constants/stay"

class Stay extends Component {
    render() {
        return (
            <GridComponent data={stay}/>
        );
    }
}

export default Stay;
import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {stay} from "../constants/stay"

class StayPage extends Component {
    render() {
        return (
            <GridComponent data={stay} logged={this.props.logged}/>
        );
    }
}

export default StayPage;
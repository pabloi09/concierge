import React, { Component } from 'react';
import GridComponent from './GridComponent';
import {roomservices} from '../constants/roomservices'

class RoomService extends Component {
    render() {
        return (
            <GridComponent data={roomservices}/>
        );
    }
}

export default RoomService;
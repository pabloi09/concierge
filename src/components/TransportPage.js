import React, { Component } from 'react';
import GridComponent from './GridComponent';
import {transports} from '../constants/transports'

class TransportPage extends Component {

    render() {
        return (
            <GridComponent data={transports}/>
        );
    }
}

export default TransportPage;
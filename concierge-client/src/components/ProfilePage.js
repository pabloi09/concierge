import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {profile} from "../constants/profile"

class ProfilePage extends Component {
    render() {
        return (
            <GridComponent data={profile} logged={this.props.logged}/>
        );
    }
}

export default ProfilePage;
import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {profile} from "../constants/profile"

class Profile extends Component {
    render() {
        return (
            <GridComponent data={profile}/>
        );
    }
}

export default Profile;
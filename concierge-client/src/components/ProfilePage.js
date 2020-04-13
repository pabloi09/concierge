import React, { Component } from 'react';
import GridComponent from "./GridComponent"
import {profile} from "../constants/profile"
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import PersonalDetailsPage from "./PersonalDetailsPage";

class ProfilePage extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/perfil/datos">
                        <PersonalDetailsPage client={this.props.client}/>
                    </Route>
                    <Route path ="/perfil">
                        <GridComponent data={profile} logged={this.props.logged} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default ProfilePage;
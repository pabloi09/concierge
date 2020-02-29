import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import LoginUserPage from "./LoginUserPage"

class UserApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/profile">

                    </Route>
                    <Route path="/transport">
                        
                    </Route>
                    <Route path="/">
                        <LoginUserPage />
                        
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default UserApp;

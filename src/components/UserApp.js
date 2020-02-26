import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

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
                        
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default UserApp;
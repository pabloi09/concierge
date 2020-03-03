import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import MenuCard from "./MenuCard" 
import NavigationBar from "./NavigationBar"

class UserApp extends Component {
    render() {
        return (
            <div>
                <NavigationBar logged/>
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
            </div>
        );
    }
    
}

export default UserApp;
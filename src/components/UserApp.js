import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from "../theme/theme"
import LoginUserPage from "./LoginUserPage"
import NavigationBar from "./NavigationBar"
import GridComponent from "./GridComponent"
import {services} from "../constants/services"

class UserApp extends Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <NavigationBar logged/>
                        <Router>
                            <Switch>
                                <Route path="/profile">

                                </Route>
                                <Route path="/transport">
                                
                                </Route>
                                <Route path="/login">
                                    <LoginUserPage />

                                </Route>
                                <Route path="/">
                                    <GridComponent data={services}/>
                                </Route>
                            </Switch>
                        </Router>
                </ThemeProvider>
            </div>
        );
    }
    
}

export default UserApp;

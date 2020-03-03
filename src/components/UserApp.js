import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from "../theme/theme"
import LoginUserPage from "./LoginUserPage"

class UserApp extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/profile">

                        </Route>
                        <Route path="/transport">
                            
                        </Route>
                        <Route path="/login">
                            <LoginUserPage />
                            
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}

export default UserApp;

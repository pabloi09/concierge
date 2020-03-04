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
import Transport from "./Transport"
import RoomService from "./RoomService"
import LeisurePage from "./LeisurePage"

class UserApp extends Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <NavigationBar logged/>
                        <Router>
                            <Switch>
                                <Route path="/login">
                                    <LoginUserPage />
                                </Route>
                                <Route path="/perfil">

                                </Route>
                                <Route path="/estancia">

                                </Route>
                                <Route path="/servicio-habitaciones">
                                    <RoomService />
                                </Route>
                                <Route path="/ocio">

                                </Route>
                                <Route path="/transporte">
                                    <Transport />
                                </Route>
                                <Route path="/personalizada">

                                </Route>
                                <Route path="/ocio">
                                    <LeisurePage/>
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

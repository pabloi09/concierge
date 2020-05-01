import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from "../theme/theme"
import LoginUserPage from "./login/LoginUserPage"
import NavigationBar from "./NavigationBar"
import MainPage from "./MainPage"
import TransportPage from "./transports/TransportPage"
import RoomServicePage from "./roomService/RoomServicePage"
import LeisurePage from "./leisure/LeisurePage"
import ProfilePage from "./profile/ProfilePage"
import StayPage from "./stay/StayPage"
import {login, logout, setResources} from "../redux/user/actions"
import { connect } from "react-redux"
import CustomRequestPage from "./custom/CustomRequestPage"

import OrdersPage from './orders/OrdersPage';

class UserApp extends Component {

    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Router>
                        <NavigationBar logged={this.props.loggedIn} logout={this.props.logout}/>
                        <Switch>
                            <Route path="/login">
                                <LoginUserPage login={this.props.login} setResources={this.props.setResources}/>
                            </Route>
                            <Route path="/perfil">
                                <ProfilePage logged={this.props.loggedIn} login={this.props.login} client={this.props.client}/>
                            </Route>
                            <Route path="/estancia">
                                <StayPage logged={this.props.loggedIn} login={this.props.login} hotels={this.props.hotels}/>
                            </Route>
                            <Route path="/servicio-habitaciones">
                                <RoomServicePage logged={this.props.loggedIn} login={this.props.login} menu = {this.props.meals}/>
                            </Route>
                            <Route path="/ocio">
                                <LeisurePage logged={this.props.loggedIn} login={this.props.login} tours={this.props.tours}/>
                            </Route>
                            <Route path="/transporte">
                                <TransportPage logged={this.props.loggedIn} login={this.props.login}/>
                            </Route>
                            <Route path="/personalizada">
                                <CustomRequestPage logged={this.props.loggedIn} login={this.props.login}/>
                            </Route>
                            <Route path="/solicitudes">
                                <OrdersPage logged={this.props.loggedIn} client={this.props.client}/>
                            </Route>
                            <Route path="/">
                                <MainPage logged={this.props.loggedIn}/>
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </div>
        );
    }    
}



const mapStateToProps = function (state) {
    return {
      ...state
    };
}

const mapDispatchToProps = dispatch => {

    return {
      login: (json) => dispatch(login(json)),
      logout: () => dispatch(logout()),
      setResources: (json) => dispatch(setResources(json))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserApp);

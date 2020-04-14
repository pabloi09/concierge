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
import MainPage from "./MainPage"
import TransportPage from "./TransportPage"
import RoomServicePage from "./RoomServicePage"
import LeisurePage from "./LeisurePage"
import ProfilePage from "./ProfilePage"
import StayPage from "./StayPage"
import {login, logout} from "../redux/user/actions"
import { connect } from "react-redux"
import CustomRequestPage from "./CustomRequestPage"
import OrdersPage from './OrdersPage';

class UserApp extends Component {

    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Router>
                        <NavigationBar logged={this.props.loggedIn} logout={this.props.logout}/>
                        <Switch>
                            <Route path="/login">
                                <LoginUserPage login={this.props.login}/>
                            </Route>
                            <Route path="/perfil">
                                <ProfilePage logged={this.props.loggedIn} client={this.props.client}/>
                            </Route>
                            <Route path="/estancia">
                                <StayPage logged={this.props.loggedIn}/>
                            </Route>
                            <Route path="/servicio-habitaciones">
                                <RoomServicePage logged={this.props.loggedIn} login={this.props.login}/>
                            </Route>
                            <Route path="/ocio">
                                <LeisurePage logged={this.props.loggedIn} login={this.props.login}/>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserApp);

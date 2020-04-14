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
import OrderStatusCard from "./OrderStatusCard"
import {login, logout} from "../redux/user/actions"
import { connect } from "react-redux"

import CustomRequestPage from "./CustomRequestPage"



class UserApp extends Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Router>
                        <NavigationBar logged={this.props.loggedIn} logout = {this.props.logout}/>
                        <Switch>
                            <Route path="/login">
                                <LoginUserPage login={this.props.login}/>
                            </Route>
                            <Route path="/perfil">
                                <ProfilePage logged={this.props.loggedIn}/>
                            </Route>
                            <Route path="/estancia">
                                <StayPage logged={this.props.loggedIn}/>
                            </Route>
                            <Route path="/servicio-habitaciones">
                                <RoomServicePage logged={this.props.loggedIn}/>
                            </Route>
                            <Route path="/ocio">
                                <LeisurePage logged={this.props.loggedIn}/>
                            </Route>
                            <Route path="/transporte">
                                <TransportPage logged={this.props.loggedIn} login={this.props.login}/>
                            </Route>
                            <Route path="/personalizada">
                                <CustomRequestPage logged={this.props.loggedIn}/>
                            </Route>
                            <Route path="/solicitudes">
                            {this.props.loggedIn?
                                    <div>
                                    <OrderStatusCard title="Taxi" card="enviada" info="Su solicitud ha sido enviada y nuestro personal procederá a tramitarla lo ants posible. Le agradecemos la espera."/>
                                    <OrderStatusCard title="Compras" card="enproceso" info="Su solicitud está siendo procesada por nuestro personal. Si tiene algún problema, puede llamar a recepción en el 001 a través del teléfono de su habitación."/>
                                    <OrderStatusCard title="Espectáculos" card="rechazada" info="Su solicitud ha sido rechazada. Puede deberse a falta de disponibilidad, para más información llame a recepción en el 001 a través del teléfono de su habitación."/>
                                    </div>:
                                    <div/>}
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

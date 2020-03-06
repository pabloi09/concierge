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
                                    <ProfilePage />
                                </Route>
                                <Route path="/estancia">
                                    <StayPage />
                                </Route>
                                <Route path="/servicio-habitaciones">
                                    <RoomServicePage />
                                </Route>
                                <Route path="/ocio">
                                    <LeisurePage/>
                                </Route>
                                <Route path="/transporte">
                                    <TransportPage />
                                </Route>
                                <Route path="/personalizada">

                                </Route>
                                <Route path="/solicitudes">
                                    <OrderStatusCard title="Taxi" card="enviada" info="Su solicitud ha sido enviada y nuestro personal procederá a tramitarla lo ants posible. Le agradecemos la espera."/>
                                    <OrderStatusCard title="Compras" card="enproceso" info="Su solicitud está siendo procesada por nuestro personal. Si tiene algún problema, puede llamar a recepción en el 001 a través del teléfono de su habitación."/>
                                    <OrderStatusCard title="Espectáculos" card="rechazada" info="Su solicitud ha sido rechazada. Puede deberse a falta de disponibilidad, para más información llame a recepción en el 001 a través del teléfono de su habitación."/>
                                </Route>
                                <Route path="/">
                                    <MainPage />
                                </Route>
                            </Switch>
                        </Router>
                </ThemeProvider>
            </div>
        );
    }
    
}

export default UserApp;

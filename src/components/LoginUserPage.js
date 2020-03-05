import React, { Component } from 'react';
import LoginForm from "./LoginForm"
import { withRouter } from "react-router-dom"

class LoginUserPage extends Component {
    render() {
        return (
            <LoginForm login={this.login.bind(this)} />
        );

    }

    login(){
        this.props.login()
        this.props.history.push("/")
    }
}

export default withRouter(LoginUserPage);

import React, { Component } from 'react';
import LoginForm from "./LoginForm"
import { withRouter } from "react-router-dom"

class LoginUserPage extends Component {
    render() {
        return (
                <LoginForm login={this.login.bind(this)} />
        );

    }

    login(json){
        this.props.login(json)
        this.props.history.push("/")
    }
}

export default withRouter(LoginUserPage);

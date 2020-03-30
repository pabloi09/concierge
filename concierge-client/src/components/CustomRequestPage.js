import React, { Component } from 'react';
import CustomRequestForm from "./CustomRequestForm"
import { withRouter } from "react-router-dom"

class LoginUserPage extends Component {
    render() {
        return (
            <CustomRequestForm sendForm={this.sendForm.bind(this)} />
        );

    }

    sendForm(){
        console.log("sendForm")
    }
}

export default withRouter(LoginUserPage);

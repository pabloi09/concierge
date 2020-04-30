import React, { Component } from 'react';
import RequestBuyItemForm from "./RequestBuyItemForm"
import { withRouter } from "react-router-dom"

class RequestBuyItemPage extends Component {
    render() {
        if(! this.props.logged){
            this.props.history.replace("/login")
        }
        return (
            <RequestBuyItemForm
                sendForm={this.sendForm.bind(this)}
                login={this.login.bind(this)}
            />
        );

    }

    login(json){
        this.props.login(json)
    }

    sendForm(){
        console.log("sendForm")
    }
}

export default withRouter(RequestBuyItemPage);

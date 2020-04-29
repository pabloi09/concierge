import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Communication from '../../Communication';

class EventsPage extends Component {
    render() {

        var c = new Communication();
        c.makeGetRequest("/events", {"request": "events"})
        .then((json)=>{
          if(json["code"]===200){
            console.log(json);
          }else{
            console.log("Error: ");
          }
        });
        
        return (
            <div>

            </div>
        );
    }
}

export default withRouter(EventsPage);
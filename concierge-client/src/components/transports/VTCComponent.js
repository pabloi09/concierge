import React, { Component } from 'react';
import VTCForm from "./VTCForm"
import { withRouter } from "react-router-dom"
import MapVTCWrapper from "./MapVTCWrapper"



class VTCComponent extends Component {
    constructor(props){
        super(props)
        this.state = {origin:"", destiny:""}
    }


    update = (origin,destiny) =>{
        if(origin !== "" && destiny !==""){
            this.setState({
                origin,
                destiny
            })
        }
    }

    setTravelData(distance, duration){
        this.setState({...this.state, distance, duration})

    }



    render() {

        return (
            <div style ={{display:"Flex",flexDirection:"row", justifyContent:"space-around", height:"80vh",width:"100vh"}}>
                <VTCForm 
                    restaurants={this.state.restaurants} 
                    onMarkerClick={this.onMarkerClick}
                    login={this.props.login} 
                    goBack={this.props.history.goBack}
                    distance={this.state.distance}
                    duration={this.state.duration}
                    update = {this.update}/>
                <div>
                    <MapVTCWrapper 
                        setTravelData={this.setTravelData.bind(this)}
                        origin={this.state.origin}
                        destiny={this.state.destiny}/>
                </div>
            </div>
        );
    }
}

export default  (withRouter(VTCComponent));
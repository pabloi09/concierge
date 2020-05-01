import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
import { api_key, location } from "../../constants/conf";
import NewBookingForm from "./NewBookingForm";
import {
    Typography
  } from '@material-ui/core';
import { withRouter } from "react-router-dom";

class NewBookingPage extends Component {
    constructor(props){
        super(props)
        this.state = {hotels:[],showingInfoWindow: false,activeMarker: {},selectedPlace: {},}
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };

    componentDidMount () {
        var hotels = [];
        console.log(this.props.hotels);
        this.props.hotels.map((e)=>hotels.push({value:e["results"][0]["name"],label:e["results"][0]["name"],position:e["results"][0]["geometry"]["location"],object:e["results"][0]}))
        this.setState({...this.state, hotels: hotels})
        setTimeout(()=>{
            hotels = []
            this.state.hotels.map((e,i)=>hotels.push({...e,ref:this.refs["marker"+i]}))
            this.setState({...this.state, hotels: hotels})
        },10)
        
      }

    render() {
        let mapStyles = {
            width: "50%",
            height:"90%",
            position:"relative"
          };
        return (
            <div style ={{display:"Flex",flexDirection:"row", justifyContent:"space-around", height:"80vh",width:"100vh"}}>
            <NewBookingForm 
                hotels={this.state.hotels} 
                onMarkerClick={this.onMarkerClick}
                login={this.props.login} 
                goBack={this.props.history.goBack}/>
            <div >
                <Map
                google={this.props.google}
                zoom={4}
                initialCenter={{lat:location.split(",")[0], lng:location.split(",")[1]}}
                style={mapStyles}>
                {this.state.hotels.map((h,i)=>(
                <Marker
                    ref={"marker"+i}
                    onClick={this.onMarkerClick}
                    key={i}
                    name={h.label}
                    position={h.position}
                />
                ))}
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        {this.state.hotels.map((h,i)=>{
                            if(h.value === this.state.selectedPlace.name){
                                return (<div key={i}>
                                    <Typography  key={i+i+1}style ={{fontSize:18}}color="textPrimary" gutterBottom>
                                        <strong>{h.value}</strong>
                                    </Typography>
                                
                                    <Typography key={i+i+2}>
                                        {h.object.rating + " estrellas"} ({h.object.user_ratings_total} reviews)
                                    </Typography>
                                        {h.object.opening_hours ?
                                        (h.object.opening_hours.open_now?
                                                <Typography style = {{color:"#008000"}}>Abierto</Typography>:
                                                <Typography style = {{color:"#FF0000"}}>Cerrado</Typography>):
                                        <></>}
                                    <Typography key={i+i+3}>
                                        <i>{h.object.formatted_address}</i>
                                    </Typography>
                                        </div>
                                )
                            }
                            return (<div key={i}></div>)
                        })}
                    </div>
                </InfoWindow>
                </Map>
            </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey :api_key})(withRouter(NewBookingPage));
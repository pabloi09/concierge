import React, { Component } from 'react';
import { Map,  GoogleApiWrapper, Polyline } from 'google-maps-react';
import {api_key, location} from "../../constants/conf"
class MapVTCWrapper extends Component {
    
    constructor(props){
        super(props)
        this.calculateDistance = this.calculateDistance.bind(this)
        this.state = {route:[]}
    }

    componentDidUpdate(){

        if(this.props.origin !== "" && this.props.destiny !==""){

            if(this.state.origin !== this.props.origin || this.state.destiny !==this.props.destiny){
                this.calculateDistance()
            }
        }
    }

    calculateDistance = () => {
        const { google } = this.props;
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
            origin: this.props.origin,
            destination: this.props.destiny,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                var bounds = new this.props.google.maps.LatLngBounds();
                this.setState({
                    origin:this.props.origin,
                    destiny:this.props.destiny,
                    route: result.routes[0].overview_path.map(p => {
                        bounds.extend({lat:p.lat() , lng:p.lng()})
                        return {lat:p.lat() , lng:p.lng()}}),
                    bounds: bounds,
                    distance:result.routes[0].legs[0].distance,
                    duration:result.routes[0].legs[0].duration
                });
                this.props.setTravelData(this.state.distance, this.state.duration)
            } else {
                console.error(`error fetching directions ${result}`);
                console.log(result)
            }
        });
    }


    render() {
        let mapStyles = {
            width: "50%",
            height:"90%",
            position:"relative"
        };
        return (
            <Map google={this.props.google}
                 zoom={17}
                 initialCenter={{lat:location.split(",")[0], lng:location.split(",")[1]}}
                 bounds={this.state.bounds}
                 style={mapStyles}>
                 <Polyline
                    strokeColor="#0000FF"
                    strokeOpacity={0.6}
                    strokeWeight={4}
                    path = {this.state.route}/>
            </Map>
        );
    }
}

export default  GoogleApiWrapper({apiKey :api_key})(MapVTCWrapper);
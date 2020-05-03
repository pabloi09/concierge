import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
import {api_key, location,radius} from "../../constants/conf"
import RestaurantsForm from "./RestaurantsForm"
import Communication from "../../Communication"
import {
    Typography
  } from '@material-ui/core';
import { withRouter } from "react-router-dom"
class MapRestaurantComponent extends Component {
    constructor(props){
        super(props)
        this.state = {restaurants:[],showingInfoWindow: false,activeMarker: {},selectedPlace: {},}
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
    componentDidMount(){
        var c = new Communication()
        c.makeGetRequestISO("/restaurants",{location:location, radius:radius})
        .then((json => {
          var restaurants = []
          if(json["code"]===200){
            json = JSON.parse(json["data"])
            json["results"].map((e)=>restaurants.push({value:e["name"],label:e["name"],position:e["geometry"]["location"],object:e}))
            this.setState({...this.state, restaurants: restaurants})
            setTimeout(()=>{
                restaurants = []
                this.state.restaurants.map((e,i)=>restaurants.push({...e,ref:this.refs["marker"+i]}))
                this.setState({...this.state, restaurants: restaurants})
            },10)
            }
        }))
        
         
      }
    render() {
        let mapStyles = {
            width: "50%",
            height:"90%",
            position:"relative"
          };
        return (
                <div style ={{display:"Flex",flexDirection:"row", justifyContent:"space-around", height:"80vh",width:"100vh"}}>
                <RestaurantsForm 
                    restaurants={this.state.restaurants} 
                    onMarkerClick={this.onMarkerClick}
                    login={this.props.login} 
                    goBack={this.props.history.goBack}/>
                <div >
                    <Map
                    google={this.props.google}
                    zoom={17}
                    initialCenter={{lat:location.split(",")[0], lng:location.split(",")[1]}}
                    style={mapStyles}>
                    {this.state.restaurants.map((r,i)=>(
                    <Marker
                        ref={"marker"+i}
                        onClick={this.onMarkerClick}
                        key={i}
                        name={r.label}
                        position={r.position}
                    />
                    ))}
                    <InfoWindow 
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            {this.state.restaurants.map((r,i)=>{
                                if(r.value === this.state.selectedPlace.name){
                                    return (<div key={i}>
                                        <Typography  key={i+i+1}style ={{fontSize:18}}color="textPrimary" gutterBottom>
                                            <strong>{r.value}</strong> { "€".repeat(r.object.price_level) }
                                        </Typography>
                                  
                                        <Typography key={i+i+2}>
                                            {r.object.rating + " estrellas"} ({r.object.user_ratings_total} reviews)
                                        </Typography>
                                            {r.object.opening_hours ?
                                            (r.object.opening_hours.open_now?
                                                 <Typography style = {{color:"#008000"}}>Abierto</Typography>:
                                                 <Typography style = {{color:"#FF0000"}}>Cerrado</Typography>):
                                            <></>}
                                        <Typography key={i+i+3}>
                                            <i>{r.object.vicinity}</i>
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

export default GoogleApiWrapper({apiKey :api_key})(withRouter(MapRestaurantComponent));
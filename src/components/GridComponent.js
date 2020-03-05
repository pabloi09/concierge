import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuCard from './MenuCard';
import { withRouter } from "react-router-dom"

class GridComponent extends Component {

    createGrid = (history) => {
        let grid = []
        let children = [];
        let data = this.props.data;
        for (let i = 0; i < this.props.data.length; i++) { 
            children.push(
            <Grid item xs={4} key={i}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <MenuCard 
                        title={data[i]["title"]} 
                        src={data[i]["src"]} 
                        alt={data[i]["data"]} 
                        action={()=>history.push(data[i]["path"])}/>
                </div>
            </Grid>);
        }
        grid.push(
            <Grid container style={{padding: "5%", paddingTop: "2%"}} spacing={3} key={0}>
                {children}
            </Grid>);
        return grid;
    }

    render() {
        if(! this.props.logged){
            this.props.history.replace("/login")
        }
        return this.createGrid(this.props.history);
    }
}

export default withRouter(GridComponent);
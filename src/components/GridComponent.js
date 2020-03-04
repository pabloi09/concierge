import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuCard from './MenuCard';

class GridComponent extends Component {

    createGrid = () => {
        let grid = []
        let children = [];
        let data = this.props.data;
        for (let i = 0; i < this.props.data.length; i++) { 
            children.push(
            <Grid item xs={4}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <MenuCard 
                        title={data[i]["title"]} 
                        src={data[i]["src"]} 
                        alt={data[i]["data"]} 
                        action={()=>console.log(data[i]["path"])} key={i.toString()}/>
                </div>
            </Grid>);
        }
        grid.push(
            <Grid container style={{padding: "5%", paddingTop: "2%"}} spacing={3}>
                {children}
            </Grid>);
        return grid;
    }

    render() {
        return this.createGrid();
    }
}

export default GridComponent;
import React, { Component } from 'react';
import { CardActionArea,CardMedia, Typography, Card, Box } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles'
import 'typeface-roboto'

const useStyles = {
    image: {
        width: 345,
        height: 140,
        borderRadius:25           
    },
    media: {
        height: 140,
        width: 345,
        borderRadius:25
    },
    mask: {
        height: 140,
        opacity:0.15,
        borderRadius:25
    },
    actionArea: {
        height: 140,
        width: 345,
        borderRadius:25,
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    box: {
        height: 140,
        width: 345,
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius:25
    },
    text:{
        color:"white",
        zIndex: 10        
    }
}

class MenuCard extends Component {

    render() {
        const {classes} = this.props

        return (
                <Card className = {classes.image}>
                <CardActionArea onClick={this.props.action} className = {classes.actionArea}>
                    <Box className={classes.box}>                                                                                                                                                         
                        <CardMedia className = {classes.media}
                            image={this.props.src}
                            title={this.props.alt}>
                            <CardMedia className={classes.mask}
                                image="assets/black.jpg"/>
                        </CardMedia>
                    </Box>
                    <Typography className = {classes.text} variant="h5">
                        {this.props.title}
                    </Typography>
                    </CardActionArea>                
            </Card>
        );
    }
}

export default withStyles(useStyles)(MenuCard)
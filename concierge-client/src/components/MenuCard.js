import React, { Component } from 'react';
import { CardActionArea,CardMedia, Typography, Card, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import 'typeface-roboto'

const useStyles = {
    card: {
        display: "block",
        width: "100%",
        borderRadius:25           
    },
    media: {
        height: "100%",
        width: "100%",
        borderRadius:25
    },
    mask: {
        height: "100%",
        opacity:0.3,
        borderRadius:25
    },
    actionArea: {
        height: "100%",
        width: "100%",
        borderRadius:25,
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    box: {
        height: "100%",
        width: "100%",
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

    constructor(props){
        super(props)
        this.state = {height:100}
    }

    render() {
        const {classes} = this.props

        return (
            <Card ref={this.refCallback} className = {classes.card} style={{height: this.state.height}}>
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

    componentDidMount(){
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    handleResize(){
        this.setState({height: this.elementRef.getBoundingClientRect().width  / 1.618})
    }
    refCallback = element => {
        if (element) {
          this.elementRef = element
          this.handleResize()
        }
      };

}

export default withStyles(useStyles)(MenuCard)
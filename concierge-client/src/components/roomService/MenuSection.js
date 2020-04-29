import React, { Component } from 'react';
import {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    ExpansionPanel,
    withStyles,
    Typography,
    ListItem,
    ListItemText,
    TextField,
    MenuItem,
    Grid
} from '@material-ui/core'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = () => ({
    root: {
        width: '100%',
    },
    list: {
        width: '100%',
        maxWidth: 360,
    },
    card: {
        width:635,
        minWidth: 546,
        minHeight:340,
        marginTop: 50
      },
    container: {
      
      display: "Flex",
      justifyContent: "center",
      flexGrow:1
    },
    actions: {
      float: "right"
    },
    title: {
      fontSize: 21,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    disclaimer: {
      fontSize:12
    },
    menuItem:{
        padding:10,
        maxWidth:600
    },
    
});


class MenuSection extends Component {
    constructor(props){
        super(props)
        this.state = {selected:[]}
    }
    render() {
        let {classes} = this.props
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography className={classes.heading}>{this.props.section.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.root}>
                        <TextField id={this.props.section.title}
                                   name = {this.props.section.title}
                                   select
                                   value = ""
                                   label = "Añada un nuevo producto"
                                   onChange = {(e)=>{
                                        var newState = this.state.selected.map((item=>item))
                                        newState.push({number:1,item:e.target.value})
                                        this.setState({selected:newState})}}
                                   margin="dense"
                                   variant="outlined"
                                   fullWidth>
                        {this.props.section.meals.map((option,i) => {
                            return (
                                <MenuItem key={i} value={option} className={classes.menuItem}>
                                    <Grid 
                                        container
                                        wrap="nowrap"
                                        spacing={1}>
                                        <Grid item xs >
                                            <Typography>
                                                {option.descripcion}
                                            </Typography>
                                        </Grid>

                                        <Grid item >
                                            <Grid container spacing={2}>
                                                    <Grid item xs>
                                                        <MonetizationOnIcon/>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography color="textSecondary">
                                                            {option.precio/100 + "€"}
                                                        </Typography>
                                                    </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            );
                            })}
                        </TextField>
                        {this.state.selected.map((option,i)=>{
                            return(
                                <TextField id={"meal"+option.item.descripcion}
                                           name={"meal"+option.item.descripcion}
                                           label={option.item.descripcion}
                                           type="number"
                                           onChange={(e)=>{
                                                var newState = this.state.selected.map(value=>{
                                                    if(value.item.title === option.item.title){
                                                        value.number = e.target.value
                                                    } 
                                                    return value
                                                })
                                                this.setState({selected:newState})
                                           }}
                                           value={option.number}
                                           margin="dense"
                                           variant="outlined"
                                           fullWidth/>
                                           
                            )
                        })}
                    </div>
                    </ExpansionPanelDetails>
                    </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(useStyles)(MenuSection);
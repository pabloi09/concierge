import React, { Component } from 'react';
import {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    ExpansionPanel,
    withStyles,
    Typography,
    TextField,
    MenuItem,
    Grid
} from '@material-ui/core'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = () => ({
    root: {
        width: '100%',
        marginBottom:10
        
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
        maxWidth:600,
        flexGrow:1,
        whiteSpace: 'normal'
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
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography className={classes.heading} align="center">{this.props.section.title.replace(/^./, this.props.section.title[0].toUpperCase())}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.root}>
                        <TextField id={this.props.section.title}
                                   name = {this.props.section.title}
                                   select
                                   value = ""
                                   label = "Añada un nuevo producto"
                                   onChange = {(e)=>{
                                        var already = false 
                                        var newState = this.state.selected.map((item=>item))
                                        if(newState.length > 0) newState.forEach((i)=>already = already || (i.item.value === e.target.value.value))
                                        if (already) return
                                        newState.push({number:1,item:e.target.value})
                                        this.props.handleChanges("add",{number:1,item:e.target.value})
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
                                        alignItems="center"
                                        spacing={2}>
                                        <Grid item xs>
                                            <Typography>
                                               {option.descripcion} 
                                                </Typography>
                                        </Grid>

                                        <Grid item xs={1} sm ={2}>
                                            <Grid container>
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
                                           key={"meal"+option.item.descripcion}
                                           inputProps={{style: {height:40}}}
                                           onChange={(e)=>{
                                                var tmp = {}
                                                var newState = this.state.selected.map(value=>{
                                                    if(value.item.value === option.item.value){
                                                        value.number = parseInt(e.target.value)
                                                        tmp = value
                                                    } 
                                                    return value
                                                })
                                                var l = newState.length
                                                newState = newState.filter((e)=>e.number>0)
                                                if(l !== newState.length) this.props.handleChanges("rm",tmp)
                                                else this.props.handleChanges("edit",tmp)
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
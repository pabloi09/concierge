import React, { Component } from 'react';
import clsx from 'clsx';
import { withTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom"
import {navbar} from "../constants/navbar"


const drawerWidth = 240;
const useStyles = theme => ({
  root: {
    display: 'flex',
    marginBottom: 80
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});




class NavigationBar extends Component {


  handleDrawerOpen = () => {
    this.setOpen(true);
  };

  handleDrawerClose = () => {
    this.setOpen(false);
  };

  setOpen(b) {
    this.setState({ open: b && this.props.logged })
  }

  constructor(props) {
    super(props)
    this.setOpen = this.setOpen.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = { open: false }
  }

  handleClick(path){
    this.setOpen(false)
    if (path === "/login"){
      this.props.logout()
    }
    console.log(this.props.location)
    console.log(path)
    this.props.history.push(path)
  }



  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={
            clsx(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
>
          <Toolbar>
            {this.props.logged ? <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>:<div/>}
            <Typography variant="h6" noWrap onClick = {()=>this.props.history.push("/")}>
              Concierge
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {navbar.map((array,index)=>{
            return (<div key={index}>
            <List>
              {array.map((element,subindex)=>{
                return (<ListItem button key={String(index)+String(subindex)} onClick = {()=>this.handleClick(element["path"])}>
                  <ListItemIcon>{element["icon"]}</ListItemIcon>
                  <ListItemText primary={element["title"]} />
                </ListItem>)
              })}
            </List>
            <Divider/>
            </div>)

          })}

        </Drawer>
      </div>
    );
  }

  
}



export default withRouter(withTheme(withStyles(useStyles)(NavigationBar)));






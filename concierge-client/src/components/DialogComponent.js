import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function DialogComponent(props) {
  
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>{props.textButton}</Button> */}
            <Dialog open={props.open} onClose={props.action1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.action1} color="primary">{props.action1name}</Button>
                {props.action2 ? (props.action2name?  <Button onClick={props.action2} color="primary" autoFocus>{props.action2name}</Button>:<></>):<></>}
            </DialogActions>
            </Dialog>
        </div>
    );
}





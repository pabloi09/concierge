import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function DialogComponent(props) {

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
      //Acción submit
      props.submitAction();
    };
  
    const handleClose1 = () => {
      setOpen(false);
      //Acción close 1
      props.action1();
    };
  
    const handleClose2 = () => {
      setOpen(false);
      //Acción close 2
      props.action2();
    };
  
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>{props.textButton}</Button>
            <Dialog open={open} onClose={handleClose2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose1} color="primary">{props.action1name}</Button>
                <Button onClick={handleClose2} color="primary" autoFocus>{props.action2name}</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}





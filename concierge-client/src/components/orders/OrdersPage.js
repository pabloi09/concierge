import React from 'react';
import OrderStatusCard from './OrderStatusCard';
import {
    Card,
    CardContent,
    Typography,
    makeStyles
  } from '@material-ui/core';
import { withRouter } from "react-router-dom";

const styles =  makeStyles({
    root: {
        width: 662,
        marginTop: 50
    },
    container: {
        display: "Flex",
        justifyContent: "center"
    },
    title: {
        fontSize: 21
    }
});

const OrdersPage = (props) => {

    const classes = styles();
    const items = [];
    const noOrders = [];

    for(const [i, s] of props.client.solicitudes.entries()) {
        items.push(<OrderStatusCard key={i} title={s.titulo} card={s.estado} info={s.mensajes} />);
    }

    if(! props.logged){
        props.history.replace("/login")
    }

    if (items.length === 0) {
        noOrders.push(
            <div className={classes.container}>
                <Card className={classes.root}>
                    <CardContent style={{padding: "20px"}}>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Aún no ha realizado ninguna solicitud
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div>
            {items.length !== 0 ? items : noOrders}
        </div>
    );
    
}

export default withRouter(OrdersPage);
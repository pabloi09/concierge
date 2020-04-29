import React, { Component } from 'react';
import OrderStatusCard from './OrderStatusCard';
import { withRouter } from "react-router-dom"
class OrdersPage extends Component  {

    render () {

        const items = [];

        for(const [i, s] of this.props.client.solicitudes.entries()) {
            items.push(<OrderStatusCard key={i} title={s.titulo} card={s.estado} info={s.mensajes} />);
        }
        if(! this.props.logged){
            this.props.history.replace("/login")
        }

        return (
            <div>
                {items}
            </div>
        );
    }
}

export default withRouter(OrdersPage);

/*

code: 200
cliente:
dni: "05452329H"
nombre: "Prueba"
afiliado: true
puntos: 0
claseCliente: "VIP"
habitacion: {num: 158}
solicitudes: Array(4)
0:
id: 15
titulo: "Shuttle"
estado: "Pendiente"
empleado: {num: 5, name: "Ana"}
mensajes: Array(1)
0: {id: 16, emisorCliente: true, timestamp: 1586767421668, cuerpo: "Como cliente solicito un viaje al aeropuerto desde el hotel el jueves, 23 de abril de 2020 10:00.↵"}

*/
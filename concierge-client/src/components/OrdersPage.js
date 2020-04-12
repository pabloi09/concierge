import React, { Component } from 'react';
import OrderStatusCard from './OrderStatusCard';

// empleado undefined
// hacerlo en el server para tener el nombre del empleado

class OrdersPage extends Component  {
    render () {

        const items = [];

        var estado = "";

        for(const [i, s] of this.props.client.solicitudes.entries()) {
            estado = s.estado+"";
            if (estado === "Pendiente") {
                items.push(<OrderStatusCard key={i} 
                    title="Solicitud" 
                    card={s.estado} 
                    info={"Su solicitud ha sido enviada y nuestro empleado "+s.empleado+" procederá a tramitarla lo antes posible. Le agradecemos la espera."}
                />);    
            } else if (estado === "En Proceso") {
                items.push(<OrderStatusCard key={i} 
                    title="Solicitud" 
                    card={s.estado} 
                    info={"Su solicitud está siendo procesada. "+s.empleado+" sigue trabajando en ella."}
                />);
            } else if (estado === "Completada") {
                items.push(<OrderStatusCard key={i} 
                    title="Solicitud" 
                    card={s.estado} 
                    info={"Su solicitud ha sido completada. Esperamos que "+s.empleado+" le haya prestado un buen servicio."}
                />); 
            } else { // Rechazada
                items.push(<OrderStatusCard key={i} 
                    title="Solicitud" 
                    card={s.estado} 
                    info={"Lo sentimos. Su solicitud ha sido rechazada. Llame a la recepción del hotel para hablar con "+s.empleado+"."}
                />);
            }       
        }

        return (
            <div>
                {items}
            </div>
        );
    }
}

export default OrdersPage;

import java.sql.Timestamp;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import es.upm.dit.isst.concierge.dao.*;
import es.upm.dit.isst.concierge.pms.PMS;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import es.upm.dit.isst.concierge.model.Cliente;
import es.upm.dit.isst.concierge.model.Empleado;
import es.upm.dit.isst.concierge.model.Habitacion;
import es.upm.dit.isst.concierge.model.Mensaje;
import es.upm.dit.isst.concierge.model.Solicitud;
import es.upm.dit.isst.concierge.dao.SolicitudDAOImplementation;

class TestAll {
    @BeforeEach
    final void setUp() {
        syncPMS();
    }

    @Test
    final void testCliente() {
        ClienteDAO clientedao = ClienteDAOImplementation.getInstance();
        Cliente cliente = new Cliente();

        cliente.setDni("00000001T");
        cliente.setNombre("Prueba");
        cliente.setAfiliado(false);
        cliente.setPuntos(0);
        cliente.setClaseCliente("estándar");
        Habitacion habitacion = new Habitacion();
        habitacion.setNum(501);
        HabitacionDAOImplementation.getInstance().create(habitacion);
        cliente.setHabitacion(habitacion);
        clientedao.create(cliente);

        Cliente cliente_login = clientedao.login("00000001T");
        Cliente cliente_fail = clientedao.login("");

        assertEquals(cliente_login.getDni(), "00000001T");
        assertEquals(cliente_login.getHabitacion(), habitacion);
        assertNull(cliente_fail);
        clientedao.delete(cliente);
        HabitacionDAOImplementation.getInstance().delete(habitacion);
    }

    @Test
    final void testSolicitud() {
        Solicitud solicitud = new Solicitud();

        solicitud.setTitulo("Solicitud de prueba");
        solicitud.setEstado("enviada");

        ClienteDAO clientedao = ClienteDAOImplementation.getInstance();
        Cliente cliente_login = clientedao.login("00000001A");
        solicitud.setCliente(cliente_login);

        EmpleadoDAO empleadodao = EmpleadoDAOImplementation.getInstance();
        Empleado empleado_1 = empleadodao.read(1);
        solicitud.setEmpleado(empleado_1);
        SolicitudDAOImplementation.getInstance().create(solicitud);

        Mensaje mensaje_1 = new Mensaje();
        mensaje_1.setTimestamp(new Timestamp(System.currentTimeMillis()));
        mensaje_1.setSolicitud(solicitud);
        mensaje_1.setCuerpo("Cuerpo dummy");
        MensajeDAOImplementation.getInstance().create(mensaje_1);
        cliente_login = clientedao.login("00000001A");
        Solicitud solicitud2 = cliente_login.getSolicitudes().get(0);

        assertEquals(solicitud2.getTitulo(), solicitud.getTitulo());
        assertEquals(solicitud2.getEmpleado().getName(), empleado_1.getName());
        assertEquals(solicitud2.getMensajes().get(0).getCuerpo(), mensaje_1.getCuerpo());

        MensajeDAOImplementation.getInstance().delete(mensaje_1);
        SolicitudDAOImplementation.getInstance().delete(solicitud);

    }

    private void syncPMS() {
        if (HotelDAOImplementation.getInstance().readAll().size() > 0)
            return;
        HotelDAOImplementation.getInstance().create(PMS.getInstance().getHotel());
        for (Habitacion h: PMS.getInstance().getHabitaciones())
            HabitacionDAOImplementation.getInstance().create(h);
        for (Cliente c: PMS.getInstance().getClientes())
            ClienteDAOImplementation.getInstance().create(c);
        for (Empleado e: PMS.getInstance().getEmpleados())
            EmpleadoDAOImplementation.getInstance().create(e);
    }
}

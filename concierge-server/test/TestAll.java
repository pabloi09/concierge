package es.upm.dit.isst.concierge;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;

import es.upm.dit.isst.concierge.model.Cliente;
import es.upm.dit.isst.concierge.model.Habitacion;
import es.upm.dit.isst.concierge.model.Solicitud;

import es.upm.dit.isst.concierge.dao.ClienteDAO;
import es.upm.dit.isst.concierge.dao.ClienteDAOImplementation;
import es.upm.dit.isst.concierge.dao.SolicitudDAO;
import es.upm.dit.isst.concierge.dao.SolicitudDAOImplementation;

class JUnit5ExampleTest {

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
        habitacion.setNum(1);
        cliente.setHabitacion(habitacion);

        Cliente cliente_login = clientedao.login("00000001T");
        Cliente cliente_fail = clientedao.login("");

        assertEquals(cliente_login.getDni(), "00000001T");
        assertNull(cliente_fail);
        clientedao.delete(cliente);
    }

    @Test
    final void testSolicitud() {
        SolicitudDAO solicituddao = SolicitudDAOImplementation.getInstance();
        Solicitud solicitud = new Solicitud();

        solicitud.setTitulo("Solicitud de prueba");
        solicitud.setEstado("enviada");
        ClienteDAO clientedao = ClienteDAOImplementation.getInstance();
        Cliente cliente_login = clientedao.login("05452329H");
        solicitud.setCliente(cliente_login);

        assertEquals(solicitud.getCliente(), cliente_login);
    }
}

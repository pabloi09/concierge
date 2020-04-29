package es.upm.dit.isst.concierge.servlets;
import es.upm.dit.isst.concierge.dao.MensajeDAOImplementation;
import es.upm.dit.isst.concierge.dao.SolicitudDAOImplementation;
import es.upm.dit.isst.concierge.model.Mensaje;
import es.upm.dit.isst.concierge.model.Solicitud;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Timestamp;

@WebServlet("/ordersNextStep")
public class OrdersNextStep  extends HttpServlet{
	
	private static final long serialVersionUID = 1L;
	
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	
    	// Elegir el ID de la solicitud que queremos modificar y asignarlo a id
    	// Si queremos cancelar la solicitud, asignamos true a cancel
    	
    	int id = 128;
    	boolean cancel = false;
    	
    	// No tocar a partir de aquí
    	
    	Solicitud s = SolicitudDAOImplementation.getInstance().read(id);
    	if (!cancel) {
        	if (s.getEstado().equalsIgnoreCase("Pendiente")) {
        		// Pasamos a En Proceso
        		s.setEstado("En Proceso");
        		SolicitudDAOImplementation.getInstance().update(s);
        		Mensaje m = new Mensaje();
                m.setEmisorCliente(false);
                m.setSolicitud(s);
                m.setCuerpo("Su solicitud esta siendo procesada. "+s.getEmpleado().getName()+" sigue trabajando en ella.");
                m.setTimestamp( new Timestamp(System.currentTimeMillis()));
                MensajeDAOImplementation.getInstance().create(m);
        		
        	} else if (s.getEstado().equalsIgnoreCase("En Proceso")) {
        		// Pasamos a Completada
        		s.setEstado("Completada");
        		SolicitudDAOImplementation.getInstance().update(s);
        		Mensaje m = new Mensaje();
                m.setEmisorCliente(false);
                m.setSolicitud(s);
                m.setCuerpo("Su solicitud ha sido completada. Esperamos que "+s.getEmpleado().getName()+" le haya prestado un buen servicio.");
                m.setTimestamp( new Timestamp(System.currentTimeMillis()));
                MensajeDAOImplementation.getInstance().create(m);
        	}
    	} else {
    		// Pasamos a Rechazada
    		s.setEstado("Rechazada");
    		SolicitudDAOImplementation.getInstance().update(s);
    		Mensaje m = new Mensaje();
            m.setEmisorCliente(false);
            m.setSolicitud(s);
            m.setCuerpo("Lo sentimos. Su solicitud ha sido rechazada. Para más información, llame a recepción marcando 1 en el teléfono de la habitación para hablar con "+s.getEmpleado().getName()+".");
            m.setTimestamp( new Timestamp(System.currentTimeMillis()));
            MensajeDAOImplementation.getInstance().create(m);
    		
    	}
        
        resp.sendRedirect("/");
    }
}

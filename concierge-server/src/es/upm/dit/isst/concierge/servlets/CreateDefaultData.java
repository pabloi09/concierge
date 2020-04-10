package es.upm.dit.isst.concierge.servlets;
import es.upm.dit.isst.concierge.dao.ClienteDAOImplementation;
import es.upm.dit.isst.concierge.dao.EmpleadoDAOImplementation;
import es.upm.dit.isst.concierge.dao.HabitacionDAOImplementation;
import es.upm.dit.isst.concierge.dao.HotelDAOImplementation;
import es.upm.dit.isst.concierge.model.Cliente;
import es.upm.dit.isst.concierge.model.Empleado;
import es.upm.dit.isst.concierge.model.Habitacion;
import es.upm.dit.isst.concierge.model.Hotel;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/createDefault")
public class CreateDefaultData  extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	
    	// Default hotel
    	Hotel hotel = new Hotel();
    	hotel.setNombre("Hotel Concierge");
    	hotel.setCif("B38376367");
    	hotel.setDireccion("Calle hoteles 123, Madrid, 28040");
    	HotelDAOImplementation.getInstance().create(hotel);
    	
    	// Default room
        Habitacion h = new Habitacion();
        h.setNum(158);
        HabitacionDAOImplementation.getInstance().create(h);
        
        // Default client
        Cliente c =  new Cliente();
        c.setAfiliado(true);
        c.setHabitacion(h);
        c.setDni("05452329H");
        c.setNombre("Prueba");
        c.setPuntos(0);
        c.setClaseCliente("VIP");
        ClienteDAOImplementation.getInstance().create(c);
        
        //Default staff
        ArrayList<String> names = new ArrayList<String>();
        names.add("Pablo");
        names.add("Carlos");
        names.add("Patricia");
        names.add("Diego");
        names.add("Ana");
        names.add("Álvaro");
        
        for (int i = 0; i < names.size(); i++) {
            Empleado e = new Empleado();
            e.setName(names.get(i));
            e.setNum(""+i);
            EmpleadoDAOImplementation.getInstance().create(e);
            e = null;
        }
        
        resp.sendRedirect("/");
    }
}

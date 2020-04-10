package es.upm.dit.isst.concierge.servlets;
import es.upm.dit.isst.concierge.dao.ClienteDAOImplementation;
import es.upm.dit.isst.concierge.dao.HabitacionDAOImplementation;
import es.upm.dit.isst.concierge.model.Cliente;
import es.upm.dit.isst.concierge.model.Habitacion;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/createDefault")
public class CreateDefaultData  extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Habitacion h = new Habitacion();
        h.setNum(158);
        HabitacionDAOImplementation.getInstance().create(h);
        Cliente c =  new Cliente();
        c.setAfiliado(true);
        c.setHabitacion(h);
        c.setDni("05452329H");
        c.setNombre("Prueba");
        c.setPuntos(0);
        c.setClaseCliente("VIP");
        ClienteDAOImplementation.getInstance().create(c);
        resp.sendRedirect("/");
    }
}

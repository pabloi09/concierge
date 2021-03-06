package es.upm.dit.isst.concierge.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import es.upm.dit.isst.concierge.dao.ClienteDAOImplementation;
import es.upm.dit.isst.concierge.dao.EmpleadoDAOImplementation;
import es.upm.dit.isst.concierge.dao.HabitacionDAOImplementation;
import es.upm.dit.isst.concierge.dao.HotelDAOImplementation;
import es.upm.dit.isst.concierge.model.Cliente;
import es.upm.dit.isst.concierge.model.Empleado;
import es.upm.dit.isst.concierge.model.Habitacion;
import es.upm.dit.isst.concierge.pms.PMS;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;


@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = req.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        String data = buffer.toString();
        JsonReader jsonReader = Json.createReader(new StringReader(data));
        JsonObject jsonObject = jsonReader.readObject();
        syncPMS();
        Cliente c = ClienteDAOImplementation.getInstance().login(jsonObject.getString("dni"));
        
        PrintWriter out = resp.getWriter();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        if(c!=null && Integer.parseInt(jsonObject.getString("roomNumber")) == c.getHabitacion().getNum()) {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(c);
            jsonObject = Json.createObjectBuilder()
                        .add("code",200)
                        .add("cliente",json)
                        .build();
            out.print(jsonObject.toString());
            req.getSession().setAttribute("loggedin",true);
            req.getSession().setAttribute("client", c);
        }else{
            jsonObject = Json.createObjectBuilder()
                    .add("code",404)
                    .build();
            out.print(jsonObject.toString());
        }
        out.flush();
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

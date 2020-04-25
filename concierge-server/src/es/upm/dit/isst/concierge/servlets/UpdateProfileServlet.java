package es.upm.dit.isst.concierge.servlets;

import es.upm.dit.isst.concierge.dao.ClienteDAOImplementation;
import es.upm.dit.isst.concierge.model.Cliente;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;

@WebServlet("/updateProfile")
public class UpdateProfileServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        boolean loggedin = req.getSession().getAttribute("loggedin") != null &&
                            (boolean) req.getSession().getAttribute("loggedin");
        JsonObject jsonObject;
        PrintWriter out = resp.getWriter();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        Cliente c = loggedin ?
                (req.getSession().getAttribute("client")!= null?
                        (Cliente)req.getSession().getAttribute("client"):null)
                :null;
        try {
            if(loggedin && c != null){
            	
                StringBuilder buffer = new StringBuilder();
                BufferedReader reader = req.getReader();
                String line;
                while ((line = reader.readLine()) != null) {
                    buffer.append(line);
                }
                String data = buffer.toString();
                JsonReader jsonReader = Json.createReader(new StringReader(data));
                jsonObject = jsonReader.readObject();
                
                String newName = jsonObject.getString("name");
                
                if (!newName.equals(c.getNombre())) {
                	//Solo hay que actualizar
                	c.setNombre(newName);
                	ClienteDAOImplementation.getInstance().update(c);
                }
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                String json = mapper.writeValueAsString(c);
                
                jsonObject = Json.createObjectBuilder()
                        .add("code",200)
                        .add("cliente", json)
                        .build();
                
                out.print(jsonObject.toString());
            } else {
                jsonObject = Json.createObjectBuilder()
                        .add("code",401)
                        .build();
                
                out.print(jsonObject.toString());
            }
        }catch (Exception e){
	        jsonObject = Json.createObjectBuilder()
                .add("code",401)
                .add("error", e.toString())
                .build();
	        
            out.print(jsonObject.toString());
        }
        out.flush();

    }
}

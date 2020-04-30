package es.upm.dit.isst.concierge.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import es.upm.dit.isst.concierge.model.Cliente;

import javax.json.Json;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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
            if (loggedin && c != null) {
                req.getSession().removeAttribute("loggedin");
                req.getSession().removeAttribute("client");
                jsonObject = Json.createObjectBuilder()
                        .add("code",200)
                        .build();
                out.print(jsonObject.toString());
            }
        } catch(Exception e){
            jsonObject = Json.createObjectBuilder()
                    .add("code",400)
                    .build();
            out.print(jsonObject.toString());
        }
    }
}

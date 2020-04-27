package es.upm.dit.isst.concierge.servlets;

import es.upm.dit.isst.concierge.pms.PMS;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;

@WebServlet("/pms")
public class PMSServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String resource = req.getParameter("q");
        JsonObject jsonObject;
        PrintWriter out = resp.getWriter();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        String data = "";
        String path = this.getServletContext().getRealPath("/");
        switch (resource){
            case "hotels":
                data = PMS.getInstance().getHotels(path);
                break;
            case "tours":
                data = PMS.getInstance().getTours(path);
                break;
            case "meals":
                data = PMS.getInstance().getMeals(path);
                break;
            default:
                data = null;
                break;
        }
        try {
            JsonReader jsonReader = Json.createReader(new StringReader(data));
            JsonArray jsonArray = jsonReader.readArray();
            jsonObject = Json.createObjectBuilder()
                    .add("data", jsonArray.toString())
                    .add("code", 200)
                    .build();
            out.print(jsonObject.toString());
        } catch (Exception e){
            jsonObject = Json.createObjectBuilder()
                    .add("error", e.toString())
                    .add("code", 400)
                    .build();
            out.print(jsonObject.toString());
        }
    }
}

package es.upm.dit.isst.concierge.servlets;


import es.upm.dit.isst.concierge.model.Cliente;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import javax.json.Json;
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
import java.util.HashMap;


@WebServlet("/restaurants")
public class RestaurantsServlet extends HttpServlet {
    private final HashMap<String,String> params = new HashMap<String,String>();
    private final String base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    private final OkHttpClient httpClient = new OkHttpClient();
    public RestaurantsServlet() {
        super();
        params.put("key", "AIzaSyDHlwhv3o9wdxfOC18pYAYlieoecGIB4NA");
        params.put("language", "es");
        params.put("type", "restaurant");

    }

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
            if(loggedin && c != null){
                String s_url = base_url;
               params.put("location", req.getParameter("location"));
               params.put("radius",req.getParameter("radius"));
               for(String s : params.keySet()){
                    s_url +=s+"="+params.get(s)+"&";
               }
               Request request = new Request.Builder()
               .url(s_url)
               .addHeader("Content-Type","application/json; charset=UTF-8")
               .build();
                Response response = httpClient.newCall(request).execute();
                if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
                JsonReader jsonReader = Json.createReader(new StringReader(response.body().string()));
                jsonObject = jsonReader.readObject();
                jsonObject = Json.createObjectBuilder()
                        .add("data",jsonObject.toString())
                        .add("code",200)
                        .build();
                out.print(jsonObject.toString());

            } else {
                jsonObject = Json.createObjectBuilder()
                        .add("code",401)
                        .build();
                out.print(jsonObject.toString());
            }
        }catch (Exception e){
            System.out.println(e);
            jsonObject = Json.createObjectBuilder()
                    .add("code",401)
                    .build();
            out.print(jsonObject.toString());
        }
        out.flush();
    }
}

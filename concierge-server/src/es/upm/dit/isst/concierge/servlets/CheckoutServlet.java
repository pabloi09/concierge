package es.upm.dit.isst.concierge.servlets;

import es.upm.dit.isst.concierge.dao.ClienteDAOImplementation;
import es.upm.dit.isst.concierge.dao.EmpleadoDAOImplementation;
import es.upm.dit.isst.concierge.dao.MensajeDAOImplementation;
import es.upm.dit.isst.concierge.dao.SolicitudDAOImplementation;
import es.upm.dit.isst.concierge.model.Cliente;
import es.upm.dit.isst.concierge.model.Empleado;
import es.upm.dit.isst.concierge.model.Mensaje;
import es.upm.dit.isst.concierge.model.Solicitud;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonValue;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.InvoiceItem;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {
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
                
                // Genero factura
                
                JsonObject input = jsonObject;
                
             	// Conecto con mi cuenta
				Stripe.apiKey = "sk_live_i7YplZDzLLdTjltAJGHPs16t00Q0hwz8TS";
		
				// Registro nuevo cliente en mi cuenta
				
				
				Map<String, Object> clientParams = new HashMap<String, Object>();
				clientParams.put("name", jsonObject.get("companyName")+", "+jsonObject.get("NIF"));
				clientParams.put("email", "hotel.concierge.madrid@gmail.com");
				clientParams.put("description", "Cliente "+c.getClaseCliente());
				clientParams.put("phone", jsonObject.get("phone"));
				
				Map<String, Object> addressParams = new HashMap<String, Object>();
				addressParams.put("line1", jsonObject.get("address"));
				addressParams.put("city", jsonObject.get("city"));
				addressParams.put("postal_code", jsonObject.get("postalCode"));
			    
			    clientParams.put("address", addressParams);
				
				Customer cust = Customer.create(clientParams);
				 
				// Creo el o los items a cobrar
				Map<String, Object> invoiceItemParams = new HashMap<String, Object>();
				invoiceItemParams.put("customer", cust.getId());
				invoiceItemParams.put("amount", 12900);
				invoiceItemParams.put("currency", "eur");
				invoiceItemParams.put("description", "Estancia Hotel Concierge");
				
				InvoiceItem.create(invoiceItemParams);
				
				// Creo la factura con ese cliente y esos items
				Map<String, Object> invoiceParams = new HashMap<String, Object>();
				invoiceParams.put("customer", cust.getId());
				invoiceParams.put("auto_advance", true); // auto-finalize this draft after ~1 hour
				invoiceParams.put("collection_method", "send_invoice");
				invoiceParams.put("days_until_due", 30L);
				invoiceParams.put("tax_percent", 10L);
				 
				Invoice invoice = Invoice.create(invoiceParams);
				
				 
				// Mando la factura por email
				invoice.sendInvoice();
				
				String url = Invoice.retrieve(invoice.getId()).getHostedInvoiceUrl();
				
                // Eliminar cliente de la habitación

                // Después de ejecutar, vuelve a poner la habitación
                // UPDATE CLIENTE SET HABITACION_NUM=158
                c.setHabitacion(null);
                ClienteDAOImplementation.getInstance().update(c);
                
                
                jsonObject = Json.createObjectBuilder()
                        .add("code",200)
                        .add("url", url)
                        .add("WARNING", "Vuelve a asignarle una habitación al cliente en la BBDD para poder continuar probando con UPDATE CLIENTE SET HABITACION_NUM=158")
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

package es.upm.dit.isst.concierge.pms;

import es.upm.dit.isst.concierge.model.Cliente;
import es.upm.dit.isst.concierge.model.Empleado;
import es.upm.dit.isst.concierge.model.Habitacion;
import es.upm.dit.isst.concierge.model.Hotel;
import javax.json.*;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

public class PMS {
    private final HashMap<String,String> params = new HashMap<String,String>();
    private static PMS instance = null;
    private PMS(){
        params.put("key", "AIzaSyDHlwhv3o9wdxfOC18pYAYlieoecGIB4NA");
        params.put("language", "es");
    }

    public static PMS getInstance() {
        if(instance==null)
            instance = new PMS();
        return instance;
    }

    public String getHotels(String path){
        String result ="";
        try (InputStreamReader reader = new InputStreamReader(new FileInputStream(path+"hoteles.json"), "UTF-8"))
        {
            JsonReader jsonReader = Json.createReader(reader);
            JsonArray jsonarray = jsonReader.readArray();

            result = jsonarray.toString();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public String getMeals(String path){
        String result ="";
        try (InputStreamReader reader = new InputStreamReader(new FileInputStream(path+"carta.json"), "UTF-8"))
        {
            JsonReader jsonReader = Json.createReader(reader);
            JsonArray jsonarray = jsonReader.readArray();

            result = jsonarray.toString();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    public Hotel getHotel(){
        Hotel hotel = new Hotel();
        hotel.setNombre("Hotel Riu Plaza España");
        hotel.setCif("B38376367");
        hotel.setDireccion("C/ Gran Vía, 84, 28013 Madrid, España");
        return hotel;
    }

    public ArrayList<Habitacion> getHabitaciones(){
        ArrayList<Habitacion> hs = new ArrayList<Habitacion>();
        for(int i=1;i<500;i++){
            Habitacion h = new Habitacion();
            h.setNum(i);
            hs.add(h);
        }
        return hs;
    }

    public ArrayList<Cliente> getClientes(){
        ArrayList<Cliente> cs = new ArrayList<Cliente>();
        ArrayList<Habitacion> hs = new ArrayList<Habitacion>();
        for(int i=1;i<500;i++){
            Habitacion h = new Habitacion();
            h.setNum(i);
            hs.add(h);
        }
        for(int i=1;i<200;i++){
            Cliente c =  new Cliente();
            c.setAfiliado(true);
            c.setHabitacion(hs.get(i));
            c.setDni("0545"+String.format("%03d", i)+"9H");
            c.setNombre("Prueba"+i);
            Random random = new Random();
            int randomInt = random.nextInt(5000)+1;
            c.setPuntos(randomInt);
            c.setClaseCliente("VIP");
            cs.add(c);
        }
        return cs;
    }

    public ArrayList<Empleado> getEmpleados(){
        ArrayList<String> names = new ArrayList<String>();
        names.add("Pablo");
        names.add("Patricia");
        names.add("Carlos");
        names.add("Diego");
        names.add("Ana");
        names.add("Álvaro");
        ArrayList<Empleado> empleados = new ArrayList<Empleado>();
        for (int i = 0; i < names.size(); i++) {
            Empleado e = new Empleado();
            e.setName(names.get(i));
            empleados.add(e);
        }
        return empleados;

    }

    public String getTours(String path){
        String result ="";
        try (InputStreamReader reader = new InputStreamReader(new FileInputStream(path+"tours.json"), "UTF-8"))
        {
            JsonReader jsonReader = Json.createReader(reader);
            JsonArray jsonarray = jsonReader.readArray();

            result = jsonarray.toString();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
    }




package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import es.upm.dit.isst.concierge.model.Habitacion;

public interface HabitacionDAO {

	public void create(Habitacion habitacion);
	public Habitacion read(int num);
	public void update(Habitacion habitacion);
	public void delete(Habitacion habitacion);
	public Collection<Habitacion> readAll();
	
}

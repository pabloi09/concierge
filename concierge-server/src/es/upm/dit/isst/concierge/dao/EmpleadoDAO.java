package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import es.upm.dit.isst.concierge.model.Empleado;

public interface EmpleadoDAO {

	public void create(Empleado empleado);
	public Empleado read(int num);
	public void update(Empleado empleado);
	public void delete(Empleado empleado);
	public Collection<Empleado> readAll();
	
}

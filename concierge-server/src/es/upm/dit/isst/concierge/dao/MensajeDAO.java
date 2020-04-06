package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import es.upm.dit.isst.concierge.model.Mensaje;

public interface MensajeDAO {

	public void create(Mensaje mensaje);
	public Mensaje read(int id);
	public void update(Mensaje mensaje);
	public void delete(Mensaje mensaje);
	public Collection<Mensaje> readAll();
	
}

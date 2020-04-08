package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import es.upm.dit.isst.concierge.model.Cliente;

public interface ClienteDAO {

	public void create(Cliente cliente);
	public Cliente read(String dni);
	public void update(Cliente cliente);
	public void delete(Cliente cliente);
	public Collection<Cliente> readAll();
	
}

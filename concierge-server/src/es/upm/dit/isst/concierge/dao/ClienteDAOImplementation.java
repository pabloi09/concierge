package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import java.util.List;
import org.hibernate.Session;
import es.upm.dit.isst.concierge.model.Cliente;

public class ClienteDAOImplementation implements ClienteDAO {
	
	// SINGLETON
	
	private static ClienteDAOImplementation instance = null;
	
	private ClienteDAOImplementation () {
		
	}
	
	public static ClienteDAOImplementation getInstance() {
		if (instance == null)
			instance = new ClienteDAOImplementation();
		return instance;
	}

	// METHODS
	
	@Override
	public void create(Cliente cliente) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.save(cliente);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public Cliente read(String dni) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		Cliente cliente = session.load(Cliente.class, dni);
		session.getTransaction().commit();
		session.close();
		return cliente;
	}

	@Override
	public void update(Cliente cliente) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.saveOrUpdate(cliente);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public void delete(Cliente cliente) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.delete(cliente);
		session.getTransaction().commit();
		session.close();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Collection<Cliente> readAll() {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		List<Cliente> clientes = session.createQuery("from Cliente").list();
		session.getTransaction().commit();
		session.close();
		return clientes;
	}

}

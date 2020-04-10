package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import java.util.List;
import org.hibernate.Session;
import es.upm.dit.isst.concierge.model.Mensaje;

public class MensajeDAOImplementation implements MensajeDAO {
	
	// SINGLETON
	
	private static MensajeDAOImplementation instance = null;
	
	private MensajeDAOImplementation () {
		
	}
	
	public static MensajeDAOImplementation getInstance() {
		if (instance == null)
			instance = new MensajeDAOImplementation();
		return instance;
	}

	// METHODS

	@Override
	public void create(Mensaje mensaje) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.save(mensaje);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public Mensaje read(int id) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		Mensaje mensaje = session.load(Mensaje.class, id);
		session.getTransaction().commit();
		session.close();
		return mensaje;	
	}

	@Override
	public void update(Mensaje mensaje) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.saveOrUpdate(mensaje);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public void delete(Mensaje mensaje) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.delete(mensaje);
		session.getTransaction().commit();
		session.close();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Mensaje> readAll() {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		List<Mensaje> mensajes = session.createQuery("from Mensaje").list();
		session.getTransaction().commit();
		session.close();
		return mensajes;
	}

}

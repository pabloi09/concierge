package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import java.util.List;
import org.hibernate.Session;
import es.upm.dit.isst.concierge.model.Solicitud;

public class SolicitudDAOImplementation implements SolicitudDAO {
	
	// SINGLETON
	
	private static SolicitudDAOImplementation instance = null;
	
	private SolicitudDAOImplementation () {
		
	}
	
	public static SolicitudDAOImplementation getInstance() {
		if (instance == null)
			instance = new SolicitudDAOImplementation();
		return instance;
	}

	// METHODS

	@Override
	public void create(Solicitud solicitud) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.save(solicitud);
		session.getTransaction().commit();
		session.close();

	}

	@Override
	public Solicitud read(int id) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		Solicitud solicitud = session.load(Solicitud.class, id);
		session.getTransaction().commit();
		session.close();
		return solicitud;
	}

	@Override
	public void update(Solicitud solicitud) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.saveOrUpdate(solicitud);
		session.getTransaction().commit();
		session.close();

	}

	@Override
	public void delete(Solicitud solicitud) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.delete(solicitud);
		session.getTransaction().commit();
		session.close();

	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Collection<Solicitud> readAll() {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		List<Solicitud> solicitudes = session.createQuery("from Solicitud").list();
		session.getTransaction().commit();
		session.close();
		return solicitudes;
	}

}

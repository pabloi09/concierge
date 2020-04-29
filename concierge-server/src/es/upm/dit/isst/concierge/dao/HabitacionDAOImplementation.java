package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import java.util.List;
import org.hibernate.Session;
import es.upm.dit.isst.concierge.model.Habitacion;

public class HabitacionDAOImplementation implements HabitacionDAO {
	
	// SINGLETON
	
	private static HabitacionDAOImplementation instance = null;
	
	private HabitacionDAOImplementation () {
		
	}
	
	public static HabitacionDAOImplementation getInstance() {
		if (instance == null)
			instance = new HabitacionDAOImplementation();
		return instance;
	}

	// METHODS

	@Override
	public void create(Habitacion habitacion) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.save(habitacion);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public Habitacion read(int num) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		Habitacion habitacion = session.load(Habitacion.class, num);
		session.getTransaction().commit();
		session.close();
		return habitacion;
	}

	@Override
	public void update(Habitacion habitacion) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.saveOrUpdate(habitacion);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public void delete(Habitacion habitacion) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.delete(habitacion);
		session.getTransaction().commit();
		session.close();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Habitacion> readAll() {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		List<Habitacion> habitacions = session.createQuery("from Habitacion").list();
		session.getTransaction().commit();
		session.close();
		return habitacions;
	}

}

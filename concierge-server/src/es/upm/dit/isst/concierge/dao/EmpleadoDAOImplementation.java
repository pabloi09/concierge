package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import java.util.List;
import org.hibernate.Session;
import es.upm.dit.isst.concierge.model.Empleado;

public class EmpleadoDAOImplementation implements EmpleadoDAO {
	
	// SINGLETON
	
	private static EmpleadoDAOImplementation instance = null;
	
	private EmpleadoDAOImplementation () {
		
	}
	
	public static EmpleadoDAOImplementation getInstance() {
		if (instance == null)
			instance = new EmpleadoDAOImplementation();
		return instance;
	}

	// METHODS
	
	@Override
	public void create(Empleado empleado) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.save(empleado);
		session.getTransaction().commit();
		session.close();

	}

	@Override
	public Empleado read(int num) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		Empleado empleado = session.load(Empleado.class, num);
		session.getTransaction().commit();
		session.close();
		return empleado;
	}

	@Override
	public void update(Empleado empleado) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.saveOrUpdate(empleado);
		session.getTransaction().commit();
		session.close();

	}

	@Override
	public void delete(Empleado empleado) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.delete(empleado);
		session.getTransaction().commit();
		session.close();

	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Empleado> readAll() {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		List<Empleado> empleados = session.createQuery("from Empleado").list();
		session.getTransaction().commit();
		session.close();
		return empleados;
	}

}

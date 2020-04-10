package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import java.util.List;
import org.hibernate.Session;
import es.upm.dit.isst.concierge.model.Hotel;

public class HotelDAOImplementation implements HotelDAO {
	
	// SINGLETON
	
	private static HotelDAOImplementation instance = null;
	
	private HotelDAOImplementation () {
		
	}
	
	public static HotelDAOImplementation getInstance() {
		if (instance == null)
			instance = new HotelDAOImplementation();
		return instance;
	}

	// METHODS

	@Override
	public void create(Hotel hotel) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.save(hotel);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public Hotel read(String cif) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		Hotel hotel = session.load(Hotel.class, cif);
		session.getTransaction().commit();
		session.close();
		return hotel;
	}

	@Override
	public void update(Hotel hotel) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.saveOrUpdate(hotel);
		session.getTransaction().commit();
		session.close();
	}

	@Override
	public void delete(Hotel hotel) {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		session.delete(hotel);
		session.getTransaction().commit();
		session.close();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Hotel> readAll() {
		Session session = SessionFactoryService.get().openSession();
		session.beginTransaction();
		List<Hotel> hotels = session.createQuery("from Hotel").list();
		session.getTransaction().commit();
		session.close();
		return hotels;
	}

}

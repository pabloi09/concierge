package es.upm.dit.isst.concierge.dao;

import java.util.Collection;
import es.upm.dit.isst.concierge.model.Hotel;

public interface HotelDAO {

	public void create(Hotel hotel);
	public Hotel read(String cif);
	public void update(Hotel hotel);
	public void delete(Hotel hotel);
	public Collection<Hotel> readAll();
	
}

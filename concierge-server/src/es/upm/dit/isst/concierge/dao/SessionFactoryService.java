package es.upm.dit.isst.concierge.dao;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

// SINGLETON

public class SessionFactoryService {
	
	private SessionFactory sessionFactory;
	private static SessionFactoryService sfs;
	
	private SessionFactoryService() {
		sessionFactory = new Configuration().configure().buildSessionFactory();
	}
	
	public static SessionFactory get() {
	    if( null == sfs )
	    	sfs = new SessionFactoryService();
	    return sfs.sessionFactory;
    }

}

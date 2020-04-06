package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
public class Hotel implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	private String cif;
	
	private String nombre;
	private String direccion;
	
	
	
	public Hotel () {
		
	}

	public String getCif() {
		return cif;
	}

	public String getNombre() {
		return nombre;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setCif(String cif) {
		this.cif = cif;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cif == null) ? 0 : cif.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Hotel other = (Hotel) obj;
		if (cif == null) {
			if (other.cif != null)
				return false;
		} else if (!cif.equals(other.cif))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Hotel [cif=" + cif + ", nombre=" + nombre + ", direccion=" + direccion + "]";
	}	

}

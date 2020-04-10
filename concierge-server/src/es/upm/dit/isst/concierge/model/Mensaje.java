package es.upm.dit.isst.concierge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.*;

@Entity
public class Mensaje implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private int id;
	
	private boolean emisorCliente;
	private Timestamp timestamp;
	private String cuerpo;

	@JsonIgnore
	@ManyToOne
	private Solicitud solicitud;
	
	
	
	public Mensaje () {
		
	}

	public int getId() {
		return id;
	}

	public boolean isEmisorCliente() {
		return emisorCliente;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public String getCuerpo() {
		return cuerpo;
	}

	public Solicitud getSolicitud() {
		return solicitud;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setEmisorCliente(boolean emisorCliente) {
		this.emisorCliente = emisorCliente;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public void setCuerpo(String cuerpo) {
		this.cuerpo = cuerpo;
	}

	public void setSolicitud(Solicitud solicitud) {
		this.solicitud = solicitud;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
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
		Mensaje other = (Mensaje) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Mensaje [id=" + id + ", emisorCliente=" + emisorCliente + ", timestamp=" + timestamp + ", cuerpo="
				+ cuerpo + ", solicitud=" + solicitud + "]";
	}

}

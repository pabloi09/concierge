package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
public class Solicitud implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private int id;
	
	private String estado;
	private Cliente cliente;
	private Empleado empleado;
	
	public Solicitud () {
		
	}

	public int getId() {
		return id;
	}

	public String getEstado() {
		return estado;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public Empleado getEmpleado() {
		return empleado;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public void setEmpleado(Empleado empleado) {
		this.empleado = empleado;
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
		Solicitud other = (Solicitud) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Solicitud [id=" + id + ", estado=" + estado + ", cliente=" + cliente + ", empleado=" + empleado + "]";
	}

}

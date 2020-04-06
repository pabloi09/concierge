package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

@Entity
public class Solicitud implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private int id;
	
	private String estado;
	
	@ManyToOne
	private Cliente cliente;
	
	@ManyToOne
	private Empleado empleado;

	@OneToMany(mappedBy = "solicitud",fetch = FetchType.EAGER)
	private List<Mensaje> mensajes;


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

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public List<Mensaje> getMensajes() {
		return mensajes;
	}

	public void setMensajes(List<Mensaje> mensajes) {
		this.mensajes = mensajes;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Solicitud solicitud = (Solicitud) o;
		return id == solicitud.id &&
				estado.equals(solicitud.estado) &&
				cliente.equals(solicitud.cliente) &&
				empleado.equals(solicitud.empleado) &&
				mensajes.equals(solicitud.mensajes);
	}

	@Override
	public String toString() {
		return "Solicitud{" +
				"id=" + id +
				", estado='" + estado + '\'' +
				", cliente=" + cliente +
				", empleado=" + empleado +
				", mensajes=" + mensajes +
				'}';
	}
}

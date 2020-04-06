package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

@Entity
public class Cliente implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String dni;
	
	private String nombre;
	private boolean afiliado;
	private int puntos;
	private String claseCliente;
	
	@OneToOne
	private Habitacion habitacion;

	@OneToMany(mappedBy = "cliente",fetch = FetchType.EAGER)
	private List<Solicitud> solicitudes;
	
	
	
	public Cliente () {
		
	}

	public String getDni() {
		return dni;
	}

	public String getNombre() {
		return nombre;
	}

	public boolean isAfiliado() {
		return afiliado;
	}

	public int getPuntos() {
		return puntos;
	}

	public String getClaseCliente() {
		return claseCliente;
	}
	
	public Habitacion getHabitacion() {
		return habitacion;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setAfiliado(boolean afiliado) {
		this.afiliado = afiliado;
	}

	public void setPuntos(int puntos) {
		this.puntos = puntos;
	}

	public void setClaseCliente(String claseCliente) {
		this.claseCliente = claseCliente;
	}
	
	public void setHabitacion(Habitacion habitacion) {
		this.habitacion = habitacion;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((dni == null) ? 0 : dni.hashCode());
		return result;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public List<Solicitud> getSolicitudes() {
		return solicitudes;
	}

	public void setSolicitudes(List<Solicitud> solicitudes) {
		this.solicitudes = solicitudes;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Cliente cliente = (Cliente) o;
		return afiliado == cliente.afiliado &&
				puntos == cliente.puntos &&
				dni.equals(cliente.dni) &&
				nombre.equals(cliente.nombre) &&
				claseCliente.equals(cliente.claseCliente) &&
				habitacion.equals(cliente.habitacion) &&
				solicitudes.equals(cliente.solicitudes);
	}

	@Override
	public String toString() {
		return "Cliente{" +
				"dni='" + dni + '\'' +
				", nombre='" + nombre + '\'' +
				", afiliado=" + afiliado +
				", puntos=" + puntos +
				", claseCliente='" + claseCliente + '\'' +
				", habitacion=" + habitacion +
				", solicitudes=" + solicitudes +
				'}';
	}
}

package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

@Entity
public class Empleado implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String num;
	
	private String name;

	@OneToMany(mappedBy = "empleado",fetch = FetchType.EAGER)
	private List<Solicitud> solicitudes;
	
	
	public Empleado() {
		
	}

	public String getNum() {
		return num;
	}

	public String getName() {
		return name;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public void setName(String name) {
		this.name = name;
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
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((num == null) ? 0 : num.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Empleado empleado = (Empleado) o;
		return num.equals(empleado.num) &&
				name.equals(empleado.name) &&
				solicitudes.equals(empleado.solicitudes);
	}

	@Override
	public String toString() {
		return "Empleado{" +
				"num='" + num + '\'' +
				", name='" + name + '\'' +
				", solicitudes=" + solicitudes +
				'}';
	}
}

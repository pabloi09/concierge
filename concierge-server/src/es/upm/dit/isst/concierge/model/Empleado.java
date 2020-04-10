package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.*;

@Entity
public class Empleado implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private int num;
	
	private String name;

	@OneToMany(mappedBy = "empleado",fetch = FetchType.EAGER)
	private List<Solicitud> solicitudes;
	
	
	public Empleado() {
		
	}

	public int getNum() {
		return num;
	}

	public String getName() {
		return name;
	}

	public void setNum(int num) {
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
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Empleado empleado = (Empleado) o;
		return num == empleado.num &&
				name.equals(empleado.name) &&
				Objects.equals(solicitudes, empleado.solicitudes);
	}

	@Override
	public int hashCode() {
		return Objects.hash(num, name, solicitudes);
	}

	@Override
	public String toString() {
		return "Empleado{" +
				"num=" + num +
				", name='" + name + '\'' +
				", solicitudes=" + solicitudes +
				'}';
	}
}

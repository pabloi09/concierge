package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
public class Empleado implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String num;
	
	private String name;
	
	
	
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((num == null) ? 0 : num.hashCode());
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
		Empleado other = (Empleado) obj;
		if (num == null) {
			if (other.num != null)
				return false;
		} else if (!num.equals(other.num))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Empleado [num=" + num + ", name=" + name + "]";
	}
	
}

package es.upm.dit.isst.concierge.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
public class Habitacion implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	private int num;
	
	
	
	public Habitacion () {
		
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + num;
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
		Habitacion other = (Habitacion) obj;
		if (num != other.num)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Habitacion [num=" + num + "]";
	}

}

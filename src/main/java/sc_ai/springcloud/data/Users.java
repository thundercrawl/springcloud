package sc_ai.springcloud.data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Users {

	public String name;
	@Id
	public String id;
	public String sex;
	public String credential;
	
	public String email;
	public Integer age;
}

package sc_ai.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ServerRegisters 
{
    public static void main( String[] args )
    {
        System.out.println( ServerRegisters.class.getName()+" online" );
        SpringApplication.run(ServerRegisters.class, args);

    }
}

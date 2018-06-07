package org.gnss_register;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class CentralRegisterServer 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(CentralRegisterServer.class, args);
    }
}

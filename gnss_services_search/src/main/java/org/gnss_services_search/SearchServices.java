package org.gnss_services_search;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class SearchServices 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(SearchServices.class, args);
    }
    
    @Value("${server.port}")
    String port;
    @RequestMapping("/search")
    public String search(@RequestParam String content,@RequestParam String type) {
        return "searchServices"+content+",i am from port:" +port;
    }
}

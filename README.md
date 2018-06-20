# springcloud 

#eurake 
#ribbon clients with load balance.

use the recently used spring cloud features

1.go to register directory
mvn spring-boot:run start the central register server.

2.got to search directory to startup two eurake client to work as a microservice provider
mvn spring-boot:run

3.run the rest point and get the result again and again, ribbon will retrieve the results from different microservice provider
mvn spring-boot:run
http://localhost:8764/search?name=jj
searchServicesjj,i am from port:8762
searchServicesjj,i am from port:8763


Continued update include more features in spring-cloud

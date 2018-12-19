# Example service registry/discovery 

## Goal

Working with service discovery
* Service discovery with [Eureka](https://github.com/Netflix/eureka)
* Service1 (port=3002)
* Service2 (port=3003)
* Service1 call service2 with Service discovery

## Steps

### Start Eureka server
```
$cd eureka-server-java
$mvnw spring-boot:run
```
Open url=http://localhost:8761/ in browser

### Working with services

1. `npm install` and `npm start`
2. Call http://localhost:3002
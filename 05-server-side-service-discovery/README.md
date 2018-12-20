# Example Server-side discovery

## Goal

Working with service discovery
* Service discovery with [Eureka](https://github.com/Netflix/eureka)
* Service1 (port=3002)
* API gateway
* Client call service1 via API gateway


## Steps



### Run services with node

1. `npm install` and `npm start`
2. Call http://localhost:3001/
3. Call http://localhost:3001/service1
5. Call `curl -H "Content-Type:application/xml" http://localhost:3001`

### Run with API gateway ([Zuul](https://github.com/Netflix/zuul))

```
$cd api-gateway-java
$mvnw spring-boot:run
```

Check zuul-service at Service Registry server (Eureka)
* Call service1 = http://localhost:8762/api/service1
* Call service2 = http://localhost:8762/api/service2

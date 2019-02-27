# Example of CQRS

## Goal

Implementation of CQRS pattern

## Steps

Step 1 :: Start RabbitMQ with Docker
```
$docker container run -d -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Open url=http://localhost:15672 in browser with
* user=guest
* password=guest

Step 2 :: Call services

1. `npm install` and `npm start`
2. See result in console
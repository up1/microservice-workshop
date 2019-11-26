# Example of logging service

## Goal

Logging of service

## Start ELK stack with Docker compose
```
$docker-compose up -d
$docker-compose ps
$docker-compose logs --follow
```

## Step with Node.JS

1. `npm install` and `npm start`
2. Open url=http://localhost:3001/ in browser
3. Stop service

## Start service with logging (debug mode)

1. `LOG_LEVEL=debug npm start`
2. Open url=http://localhost:3001/ in browser
3. See log message in console
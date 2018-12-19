# Example Health check API

## Goal

Create /healthz in each service

## Steps

1. `npm install` and `npm start`
2. Call http://localhost:3002/healthz
3. Start redis service with Docker
```
$docker container run --rm -p 6379:6379 redis:5
```
# Example tracing your services

## Goal

Distributed tracing with [Jaeger](http://jaeger.readthedocs.io/) and [OpenTracing](http://opentracing.io/)

## Steps

### Run Tracing server(Jaeger)   on Docker
```
$docker container run -d --rm -p 5775:5775/udp -p 6831:6831/udp -p 6832:6832/udp -p 5778:5778 -p 16686:16686 -p 14268:14268 jaegertracing/all-in-one:latest

```
Open Jaeger UI at http://localhost:16686/

### Run your service

1. `npm install` and `npm start`
2. Call http://localhost:3002
3. Call http://localhost:3003
4. See detail of tracing service at http://localhost:16686/
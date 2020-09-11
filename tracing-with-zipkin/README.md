# Example tracing your services with Zipkin

## Goal

Distributed tracing with [Zipkin](https://zipkin.io/) and [OpenTracing](http://opentracing.io/)

## Steps

### Run Tracing server(Zinkin) on Docker or Download from [Zipkin](https://zipkin.io/pages/quickstart)

```
$docker container run -d -p 9411:9411 openzipkin/zipkin

```

Open Zipkin UI at http://localhost:9411/

### Run your service

1. `npm install` and `npm start`
2. Call http://localhost:9000
3. See detail of tracing service at http://localhost:9411/

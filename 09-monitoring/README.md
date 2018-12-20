# Example monitoring with prometheus and grafana

## Goal

Create monitoring system of service

## Steps

1. `npm install` and `npm start`
2. Call http://localhost:3002

## Setup [prometheus](https://prometheus.io/) and [grafana](https://grafana.com/) with docker


### Prometheus
```
// For windows
$docker run -p 9090:9090 -v "$pwd/prometheus-data:/prometheus-data prom/prometheus" --config.file=/prometheus-data/prometheus.yml

// For Unix/Mac
$docker run -p 9090:9090 -v $(pwd)/prometheus-data:/prometheus-data prom/prometheus --config.file=/prometheus-data/prometheus.yml

```
Open url=http://localhost:9090 in browser


### Grafana

```
$docker run -d -i -p 3000:3000 grafana/grafana
```

Open url=http://localhost:3000 in browser
* Username=admin
* Password=admin


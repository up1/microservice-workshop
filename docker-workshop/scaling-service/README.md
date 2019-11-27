# Scaling with Docker

## 1. Scaling with docker compose
```
$docker-compose up -d
$docker-compose ps
$docker-compose logs --follow
$docker-compose down
```

Open url=http://localhost:8080/  in web browser

### Try to scaling
```
$docker-compose down
$docker-compose up -d --scale web=5
```

Open url=http://localhost:8080/  in web browser

## 2. Scaling with docker swarm
```
// Create swarm cluster
$docker swarm init
$docker node ls

// Deploy services
$docker stack deploy --compose-file docker-compose-swarm.yml demostack
$docker stack services demostack
$docker service ls
```
Open url=http://localhost:8080/  in web browser

### Scaling services
```
$docker service scale demostack_web=5
$docker service ls
```
Open url=http://localhost:8080/  in web browser

### Healing feature
Try to delete some container of service=web

### Delete swarm cluster
```
$docker swarm leave -f
```
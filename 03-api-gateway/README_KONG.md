## API gataway with Kong

Step 1 :: Create Docker network
```
$docker network create kong-net
```

Step 2 :: Create database for Knong
```
$docker run -d --name kong-database \
    --network=kong-net \
    -p 5432:5432 \
    -e "POSTGRES_USER=kong" \
    -e "POSTGRES_DB=kong" \
    postgres:9.6
```

Step 3 :: Migrate data in database for Kong
```
$docker run --rm \
     --network=kong-net \
     -e "KONG_DATABASE=postgres" \
     -e "KONG_PG_HOST=kong-database" \
     -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
     kong:latest kong migrations bootstrap
```

Step 4 :: Start API Gateway server
```
$docker run -d --name kong \
     --network=kong-net \
     -e "KONG_DATABASE=postgres" \
     -e "KONG_PG_HOST=kong-database" \
     -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
     -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
     -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
     -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
     -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
     -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
     -p 8000:8000 \
     -p 8443:8443 \
     -p 8001:8001 \
     -p 8444:8444 \
     kong:latest
```

Open url=http://localhost:8001/ in browser

Step 5 :: Create new service in API Gateway
```
$curl -i -X POST \
  --url http://localhost:8001/services/ \
  --data 'name=service-2' \
  --data 'url=http://172.16.6.2:3002'
```

Step 6 :: Create routes for service
```
$curl -i -X POST \
  --url http://localhost:8001/services/service-2/routes \
  --data 'hosts[]=somkiat.cc' \
  --data 'paths[]=/api/v1/sample' \
  --data 'methods[]=GET'
```

List of routes
```
$curl -i http://localhost:8001/routes/
```

Step 7 :: Try to use API/service via API Gateway
```
curl -X GET \
  http://localhost:8000/api/v1/sample/bworld/id/1 \
  -H 'Host: somkiat.cc' \
  -H 'cache-control: no-cache'
```

Step 8 :: Delete route and service

```
$curl -i -X DELETE --url http://localhost:8001/routes/<route id>

$curl -i -X DELETE --url http://localhost:8001/services/<service name>
```

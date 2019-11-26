## Step 1 :: Start service registry (consul)
```
$docker container run --rm --name=consul -p 8500:8500 consul

or

$consul agent -dev -client 0.0.0.0
```

Open url=http://localhost:8500 in browser

## Step 2 :: Start service1 and service2

```
$npm install
$node service1.js  9001
$node service2.js  9002
$node service2.js  9003
```

Open url=http://localhost:9001/ in browser


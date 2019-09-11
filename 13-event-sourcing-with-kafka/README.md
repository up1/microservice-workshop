# Example of Event Sourcing with [Apache Kafka](https://kafka.apache.org/)

## Goal

Demo of Event Sourcing with Apache Kafka

## Steps

### Step 1 :: Start KafKa services
$docker-compose up -d
$docker-compose ps

Open Kafka UI http://127.0.0.1:3030 in browser

### Step 2 :: Create hello topic in Kafka
$docker run --rm -it --net=host landoop/fast-data-dev kafka-topics --zookeeper 127.0.0.1:2181 --topic hello --replication-factor 1 --partitions 100 --create

### Step 3 :: Start consumer
$node consumer

### Step 4 :: Start producer
$node producer

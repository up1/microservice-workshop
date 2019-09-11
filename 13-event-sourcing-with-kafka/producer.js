const config = require('./config')
const kafka = require("kafka-node")
const client = new kafka.KafkaClient(config.kafka_server);

const Producer = kafka.Producer
const producer = new Producer(client);
const sentMessage = JSON.stringify("Hello kafka");

producer.on('ready', function () {
    console.log('Producer is ready');
    send(sentMessage)
});

function send(sentMessage) {
    payloads = [
        { topic: config.kafka_topic, messages:sentMessage , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
       console.log("send data ",sentMessage)
    });
} 
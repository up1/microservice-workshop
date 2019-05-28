const kafka = require("kafka-node")
const client = new kafka.KafkaClient("localhost:2181");

const Producer = kafka.Producer
const producer = new Producer(client);
const sentMessage = JSON.stringify("Hello kafka");

producer.on('ready', function () {
    console.log('Producer is ready');
    send(sentMessage)
});

function send(sentMessage) {
    payloads = [
        { topic: "hello", messages:sentMessage , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
       console.log("send data ",sentMessage)
    });
} 
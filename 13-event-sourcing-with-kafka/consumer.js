const kafka = require("kafka-node")
const client = new kafka.KafkaClient("localhost:2181")

const Consumer = kafka.Consumer
const consumer = new Consumer(client, [{
  topic: 'hello',
  offset: 0
}], {
  autoCommit: true
});

consumer.on('message', function (message) {
  console.log(message);
});

consumer.on('error', function (err) {
  console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:', err);
})
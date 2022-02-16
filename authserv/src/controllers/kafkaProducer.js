const kafka = require("../../../kafka/kafka");
const producer = kafka.producer();

async function KafkaProducerInit() {
  await producer.connect();
}

async function sendKafkaMsg(topic, messages) {
  const arraymsg = [messages];
  await producer.send({
    topic,
    messages: arraymsg,
  });
}

async function disconnectKafka() {
  await producer.disconnect();
}

module.exports = {
  KafkaProducerInit,
  sendKafkaMsg,
  disconnectKafka,
};

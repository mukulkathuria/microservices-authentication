const kafka = require("../../../kafka/kafka");
const consumer = kafka.consumer({ groupId: "testkafkagrp" });

async function KafkaConsumerInit() {
  await consumer.connect();
}

async function getKafkaMsgs(topic, cb) {
  consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ message }) => cb(message),
  });
}

async function disconnectKafka() {
  await producer.disconnect();
}

module.exports = {
  KafkaConsumerInit,
  getKafkaMsgs,
  disconnectKafka,
};

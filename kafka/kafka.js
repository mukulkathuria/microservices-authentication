const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'testing-kakfa',
  brokers: ['localhost:9092', 'localhost:9092'],
  logLevel: logLevel.ERROR
});

module.exports = kafka;
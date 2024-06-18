import { Kafka } from 'kafkajs';
import * as kafkaProducer from './kafkaProducer';
import * as kafkaConsumer from './kafkaConsumer';
import * as kafkaAdmin from './kafkaAdmin';

function createKafkaInstance(brokersURL: string[], clientId: string, ssl?: boolean | Record<string, unknown>) {
  return new Kafka({
    brokers: brokersURL,
    clientId,
    connectionTimeout: 5000,
    ssl,
  });
}

export { createKafkaInstance, kafkaProducer, kafkaConsumer, kafkaAdmin };

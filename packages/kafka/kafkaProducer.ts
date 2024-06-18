import { Kafka, Producer } from 'kafkajs';

function createProducer(kafka: Kafka) {
  return kafka.producer();
}

async function checkProducerConnection(kafkaProducer: Producer) {
  await kafkaProducer.connect();
}

async function produceData(kafkaProducer: Producer, topic: string, payload: Record<string, unknown>, key?: string) {
  await kafkaProducer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(payload),
      },
    ],
  });
}

async function produceDataInSpecificPartition(
  kafkaProducer: Producer,
  topic: string,
  partition: number,
  payload: string | Record<string, unknown>,
  key?: string,
) {
  await kafkaProducer.send({
    topic,
    messages: [
      {
        partition,
        key,
        value: JSON.stringify(payload),
      },
    ],
  });
}

export { createProducer, checkProducerConnection, produceData, produceDataInSpecificPartition };

import { Kafka, Consumer } from 'kafkajs';

function createConsumer(kafka: Kafka, groupId: string) {
  return kafka.consumer({ groupId });
}

async function checkConsumerConnectionToKafka(kafkaConsumer: Consumer) {
  await kafkaConsumer.connect();
}

async function subscribeToTopic(kafkaConsumer: Consumer, topic: string, fromBeginning?: boolean) {
  await kafkaConsumer.subscribe({
    topic,
    fromBeginning,
  });
}

async function pauseConsumer(kafkaConsumer: Consumer, topic: string) {
  await kafkaConsumer.pause([{ topic }]);
}

async function resumeConsumer(kafkaConsumer: Consumer, topic: string) {
  await kafkaConsumer.resume([{ topic }]);
}

export { createConsumer, checkConsumerConnectionToKafka, subscribeToTopic, pauseConsumer, resumeConsumer };

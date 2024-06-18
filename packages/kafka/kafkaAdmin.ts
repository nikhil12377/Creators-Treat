import { Admin, Kafka } from 'kafkajs';

function createKafkaAdmin(kafka: Kafka) {
  return kafka.admin();
}

async function listAllTopics(kafkaAdmin: Admin) {
  await kafkaAdmin.listTopics();
}

async function describeCluster(kafkaAdmin: Admin) {
  await kafkaAdmin.describeCluster();
}

export { createKafkaAdmin, listAllTopics, describeCluster };

import createCeleryInstance from "@creators/celery";
import { createKafkaInstance, kafkaConsumer, kafkaProducer } from '@creators/kafka';
import logger from "@creators/logger";
import config from '../config';

const celery = createCeleryInstance(config.RABBITMQ_HOST, config.REDIS_HOST);

const kafka = createKafkaInstance(config.KAFKA_HOST.split(','), 'upload-ms');

const uploadMsProducer = kafkaProducer.createProducer(kafka);

const uploadsConsumer = kafkaConsumer.createConsumer(kafka, 'orders');

const produceDataToKafka = async (topic: string, payload: Record<string, unknown>, key?: string) => {
  try {
    await kafkaProducer.produceData(uploadMsProducer, topic, payload, key);
  } catch (err) {
    logger.log(`[Upload-MS] Error producing data to topic: ${topic}`);
    logger.error(err);
  }
};

// This function should be imported from
// Social package
// function uploadContentCeleryTask() { }

const syncUploadsInBackground = async () => {
  try {
    kafkaConsumer.checkConsumerConnectionToKafka(uploadsConsumer)

    await kafkaConsumer.subscribeToTopic(uploadsConsumer, "uploads", false);

    await uploadsConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Send message to celery
        // celery.createCeleryTask(uploadContentCeleryTask,message);
      }
    })
  } catch (error) {
    logger.log('Some Error Occurred while consuming from uploads');
    logger.error(error);
  }
}

export {
  kafka,
  produceDataToKafka,
  syncUploadsInBackground
};

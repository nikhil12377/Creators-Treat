import celeryManager from "./celery";

function createCeleryInstance(RABBITMQ_HOST: string, REDIS_HOST: string) {
    return new celeryManager(RABBITMQ_HOST, REDIS_HOST);
}

export default createCeleryInstance;
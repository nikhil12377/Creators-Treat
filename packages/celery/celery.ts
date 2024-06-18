import * as Celery from "celery-ts";
import { Payload } from "./types/uploadTypes";

class CeleryManager {
    client: Celery.Client;

    constructor(RABBITMQ_HOST: string, REDIS_HOST: string) {
        this.client = Celery.createClient({
            brokerUrl: RABBITMQ_HOST,
            resultBackend: REDIS_HOST
        });
    }

    createCeleryTask(celeryTask: Celery.Task<Payload>, payload: Payload) {
        const args = [payload];
        const eta = new Date(Date.now() + payload.time);

        return celeryTask.applyAsync({
            args: args,
            eta: eta,
            kwargs: {}
        });
    }
}

export default CeleryManager;

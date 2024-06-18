import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from '../config';
import routes from '../api';
import helmet from 'helmet';
import logger from "@creators/logger";

export default async ({ app }: { app: Application }) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(routes());
    app.use(helmet());


    app
        .listen(config.UPLOAD_MS_PORT, () => {
            logger.log('---------------------------------------------------')
            console.log('\n\x1b[33m%s\x1b[0m', `Upload Service started on port ${config.UPLOAD_MS_PORT}`, '\u001b[0m\n');
            logger.log('---------------------------------------------------')
        })
        .on('error', (err) => {
            logger.error(err);
            process.exit(1);
        });
};
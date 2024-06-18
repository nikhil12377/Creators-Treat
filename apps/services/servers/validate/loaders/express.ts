import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from '../config';
import routes from '../api';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).send('It Works Fine');
  });

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(routes());

  app
    .listen(config.PORT, () => {
      console.log('---------------------------------------------------');
      console.log('\n\x1b[32m%s\x1b[0m', `Validate Service started on port ${config.PORT}!`, '\u001b[0m\n');
      console.log('---------------------------------------------------');
    })
    .on('error', (err) => {
      console.error('Error in Validate Service ', err);
      process.exit(1);
    });
};

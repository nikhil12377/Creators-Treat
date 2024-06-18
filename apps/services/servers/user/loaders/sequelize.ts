import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.POSTGRES_DATABASE, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
  host: config.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
});

async function sequelizeLoader() {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to PostgresDB!');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the PostgresDB:', error);
    process.exit(1);
  }
}

export { sequelize, sequelizeLoader };

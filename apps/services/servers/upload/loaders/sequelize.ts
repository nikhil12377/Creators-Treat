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
        console.log('Successfully connected to Postgres!');
        await sequelize.sync({ alter: true });
    } catch (err) {
        console.log('Unable to connect to Postgres ', err);
        process.exit(1);
    }
}

export { sequelizeLoader, sequelize };
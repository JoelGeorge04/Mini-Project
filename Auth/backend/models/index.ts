import { Sequelize, Options } from 'sequelize'

require('dotenv').config();
const options: Options = {

    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    sync: { alter: true },
    //logging: true

}
const sequelize = new Sequelize(options);

export default sequelize
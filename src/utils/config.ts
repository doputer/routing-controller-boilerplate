import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

export const configs = {
  port: process.env.PORT || 3000,
};

export const ormconfigs: ConnectionOptions = {
  type: 'mysql',
  host: process.env.HOST || 'localhost',
  port: process.env.DBPORT ? parseInt(process.env.DBPORT) : 3306,
  username: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || 'root',
  database: process.env.DATABASE || 'toy',
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/**/entities/**/*.{ts,js}`],
};

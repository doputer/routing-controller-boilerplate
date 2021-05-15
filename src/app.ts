import express from 'express';
import 'reflect-metadata';
import morgan from 'morgan';
import { logger, stream } from './log/winston';
import { configs, ormconfigs } from './utils/config';
import { routingConfigs } from './utils/routingConfig';
import { useContainer } from 'typeorm';
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from 'routing-controllers';
import { createConnection } from 'typeorm';
import { Container } from 'typedi';

const app = express();

app.use(
  morgan(
    'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',
    { stream },
  ),
);

createConnection(ormconfigs)
  .then(() => {
    logger.debug('mysql connection success');

    useContainer(Container);
    routingUseContainer(Container);
    useExpressServer(app, routingConfigs);

    app.listen(configs.port, () =>
      logger.debug(`app listening on port ${configs.port}`),
    );
  })
  .catch(err => {
    logger.error('mysql connection fail');
    console.log(err);
  });

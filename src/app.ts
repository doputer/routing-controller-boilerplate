import express from 'express';
import 'reflect-metadata';
import morgan from 'morgan';
import { logger, stream } from './log/winston';
import { configs, ormconfigs } from './utils/config';
import { routingConfigs } from './utils/routingConfig';
import {
  createExpressServer,
  useContainer as routingUseContainer,
} from 'routing-controllers';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

useContainer(Container);
routingUseContainer(Container);

const app = createExpressServer(routingConfigs);

app.use(
  morgan(
    'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',
    { stream },
  ),
);

createConnection(ormconfigs)
  .then(() => {
    logger.debug('mysql connection success');

    app.listen(configs.port, () =>
      logger.debug(`app listening on port ${configs.port}`),
    );
  })
  .catch(err => {
    logger.error('mysql connection fail');
    console.log(err);
  });

import 'reflect-metadata';
import morgan from 'morgan';
import { logger, stream } from './log/winston';
import { configs, ormconfigs } from './utils/config';
import { routingConfigs } from './utils/routingConfig';
import {
  useContainer as routingUseContainer,
  getMetadataArgsStorage,
  useExpressServer,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

import { UserController} from './controllers/UserController';

useContainer(Container);
routingUseContainer(Container);

const app = express();

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {
    controllers: [UserController],
  },
  {
    info: {
      description: 'Toy Project API DOCS',
      title: 'Toy Project',
      version: '0.0.1',
    },
  },
);

app.use('/api', swaggerUi.serve, swaggerUi.setup(spec));

app.use(
  morgan(
    'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',
    { stream },
  ),
);

useExpressServer(app, routingConfigs);

createConnection(ormconfigs)
  .then(() => {
    logger.debug('mysql connection success');

    app.listen(configs.port, () =>
      logger.debug(`app listening on port ${configs.port}`),
    );
  })
  .catch((err) => {
    logger.error('mysql connection fail');
    console.log(err)
  });

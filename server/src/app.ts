import 'reflect-metadata';
import morgan from 'morgan';
import { logger, stream } from './log/winston';
import cors from 'cors';
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
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

import { UserController } from './controllers/UserController';
import { PostController } from './controllers/PostController';

useContainer(Container);
routingUseContainer(Container);

const app = express();

const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: '#/components/schemas/',
});
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {
    controllers: [UserController, PostController],
  },
  {
    components: {
      schemas,
      securitySchemes: {
        basicAuth: {
          scheme: 'basic',
          type: 'http',
        },
      },
    },
    info: {
      description: 'Webfold Project API DOCS',
      title: 'Webfold Project',
      version: '0.0.1',
    },
  },
);

app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

app.use(express.json());

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
  .catch(err => {
    logger.error('mysql connection fail');
    console.log(err);
  });

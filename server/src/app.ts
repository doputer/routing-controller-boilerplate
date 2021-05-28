import 'reflect-metadata';
import morgan from 'morgan';
import { logger, stream } from './log/winston';
import bodyParser from 'body-parser';
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
import passport from 'passport';
import session from 'express-session';
import { UserController } from './controllers/UserController';
import google = require('passport-google-oauth20');
import naver = require('passport-naver');
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

app.use(express.json());

app.use(
  morgan(
    'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',
    { stream },
  ),
);
app.use(
  session({ secret: 'SECRET_CODE', resave: true, saveUninitialized: false }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new google.Strategy(
    {
      callbackURL: 'http://localhost:3000/user/google/callback',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
    (_accessToken, _refreshToken, profile, done) => {
      console.log(profile + 'profile');
      return done(null, profile);
    },
  ),
);

passport.use(
  new naver.Strategy(
    {
      callbackURL: 'http://localhost:3000/user/naver/callback',
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    },
    (_accessToken, _refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  '/user/google',
  passport.authenticate('google', { scope: ['profile'] }),
);

app.get('/user/naver', passport.authenticate('naver', { scope: ['profile'] }));

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

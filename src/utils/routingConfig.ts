export const routingConfigs = {
  controllers: [`${__dirname}/../controllers/*.{ts,js}`],
  middlewares: [`${__dirname}/../middlewares/*.{ts,js}`],
  defaultErrorHandler: false,
  classTransformer: true,
  validation: true,
};

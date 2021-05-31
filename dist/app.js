"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("./log/winston");
const config_1 = require("./utils/config");
const routingConfig_1 = require("./utils/routingConfig");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const TestController_1 = require("./controllers/TestController");
typeorm_1.useContainer(typedi_1.Container);
routing_controllers_1.useContainer(typedi_1.Container);
const app = express_1.default();
const storage = routing_controllers_1.getMetadataArgsStorage();
const spec = routing_controllers_openapi_1.routingControllersToSpec(storage, {
    controllers: [TestController_1.TestController],
}, {
    info: {
        description: 'Toy Project API DOCS',
        title: 'Toy Project',
        version: '0.0.1',
    },
});
app.use('/api', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
app.use(morgan_1.default('HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms', { stream: winston_1.stream }));
routing_controllers_1.useExpressServer(app, routingConfig_1.routingConfigs);
typeorm_1.createConnection(config_1.ormconfigs)
    .then(() => {
    winston_1.logger.debug('mysql connection success');
    app.listen(config_1.configs.port, () => winston_1.logger.debug(`app listening on port ${config_1.configs.port}`));
})
    .catch(() => {
    winston_1.logger.error('mysql connection fail');
});
//# sourceMappingURL=app.js.map
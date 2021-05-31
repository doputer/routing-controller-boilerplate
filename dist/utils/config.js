"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormconfigs = exports.configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configs = {
    port: process.env.PORT || 3000,
};
exports.ormconfigs = {
    type: 'mysql',
    host: process.env.HOST || 'localhost',
    port: process.env.DBPORT ? parseInt(process.env.DBPORT) : 3306,
    username: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE || 'toy',
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/../entities/*.{ts,js}`],
};
//# sourceMappingURL=config.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
require("moment-timezone");
const { combine, printf } = winston_1.format;
const logDir = 'logs';
const logLevels = {
    error: 0,
    warn: 1,
    info: 3,
    http: 4,
    debug: 5,
};
const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'green',
    debug: 'blue',
};
winston_1.default.addColors(logColors);
moment_1.default.tz.setDefault('Asia/Seoul');
const timeStamp = () => moment_1.default().format('YYYY-MM-DD HH:mm:ss');
const loggingFormat = printf(({ level, message }) => {
    if (typeof message === 'object') {
        message = JSON.stringify(message, null, 2);
    }
    return `${timeStamp()} ${level} : ${message}`;
});
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const dailyRotateFileTransport = new winston_daily_rotate_file_1.default({
    level: 'http',
    filename: `${logDir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: '14d',
    maxSize: '20m',
    format: combine(loggingFormat),
});
const logger = winston_1.createLogger({
    levels: logLevels,
    transports: [
        new winston_1.transports.Console({
            level: 'debug',
            format: combine(winston_1.format.colorize(), loggingFormat),
        }),
        dailyRotateFileTransport,
    ],
});
exports.logger = logger;
const stream = {
    write: (message) => {
        logger.http(message);
    },
};
exports.stream = stream;
//# sourceMappingURL=winston.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const winston_1 = require("../log/winston");
class Error {
    constructor(status, message) {
        this.status = status;
        this.message = message;
        winston_1.logger.error(`${this.status} / ${this.message}`);
    }
    toJSON() {
        return {
            status: this.status,
            message: this.message,
        };
    }
}
exports.Error = Error;
//# sourceMappingURL=Error.js.map
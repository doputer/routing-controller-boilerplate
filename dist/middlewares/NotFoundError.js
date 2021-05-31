"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
const Error_1 = require("../errors/Error");
const typedi_1 = require("typedi");
let NotFoundError = class NotFoundError {
    use(req, res, next) {
        if (!res.headersSent) {
            const error = new Error_1.Error(404, 'Not Found Error');
            return res.status(404).send(error);
        }
        res.end();
    }
};
NotFoundError = __decorate([
    typedi_1.Service(),
    routing_controllers_1.Middleware({ type: 'after' })
], NotFoundError);
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map
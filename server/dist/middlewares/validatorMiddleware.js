"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMiddleware = void 0;
const responseObject_1 = require("../utils/responseObject");
const validatorMiddleware = (res, schema, data, next) => {
    try {
        schema.parse(data);
        next();
    }
    catch (e) {
        (0, responseObject_1.errorResponseObject)(res, JSON.parse(e.message), 400, "not valid input");
    }
};
exports.validatorMiddleware = validatorMiddleware;

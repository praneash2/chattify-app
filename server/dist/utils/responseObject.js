"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponseObject = exports.successResponseObject = void 0;
const successResponseObject = (res, data, statusCode, message) => {
    res.status(statusCode).json({ data: data, error: {}, message: message });
};
exports.successResponseObject = successResponseObject;
const errorResponseObject = (res, error = {}, statusCode, message) => {
    res.status(statusCode).json({ data: {}, error: error, message: message });
};
exports.errorResponseObject = errorResponseObject;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashFunction = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashFunction = (userId, N) => {
    const hash = crypto_1.default.createHash('sha256');
    hash.update(userId.toString());
    const hashValue = parseInt(hash.digest('hex'), 16);
    return hashValue % N;
};
exports.hashFunction = hashFunction;

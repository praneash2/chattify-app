"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controllers/UsersController");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
const users_1 = require("../validators/users");
exports.usersRouter = express_1.default.Router();
const usersController = new UsersController_1.UsersController();
exports.usersRouter.get('/', (req, res, next) => { (0, validatorMiddleware_1.validatorMiddleware)(res, users_1.getUsersSchema, req === null || req === void 0 ? void 0 : req.query, next); }, usersController.getUsers);
exports.usersRouter.post('/', (req, res, next) => { (0, validatorMiddleware_1.validatorMiddleware)(res, users_1.getUsersSchema, req === null || req === void 0 ? void 0 : req.body, next); }, usersController.createUser);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRouter = void 0;
const express_1 = __importDefault(require("express"));
const FriendsController_1 = require("../controllers/FriendsController");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
const friends_1 = require("../validators/friends");
exports.friendsRouter = express_1.default.Router();
const friendsController = new FriendsController_1.FriendsController();
exports.friendsRouter.get('/', (req, res, next) => {
    (0, validatorMiddleware_1.validatorMiddleware)(res, friends_1.getAllFriendsSchema, req === null || req === void 0 ? void 0 : req.cookies, next);
}, friendsController.getAllFriends);
exports.friendsRouter.post('/', (req, res, next) => { (0, validatorMiddleware_1.validatorMiddleware)(res, friends_1.addFriendSchema, req === null || req === void 0 ? void 0 : req.body, next); }, friendsController.addFriend);

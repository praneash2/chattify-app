"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRouter = void 0;
const express_1 = __importDefault(require("express"));
const FriendsController_1 = require("../controllers/FriendsController");
exports.friendsRouter = express_1.default.Router();
const friendsController = new FriendsController_1.FriendsController();
exports.friendsRouter.get('/', friendsController.getAllFriends);
exports.friendsRouter.post('/', friendsController.addFriend);

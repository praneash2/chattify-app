"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const UserService_1 = require("../services/UsersService/UserService");
const responseObject_1 = require("../utils/responseObject");
class UsersController {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId);
                let data = yield this.usersService.getUser(userId);
                (0, responseObject_1.successResponseObject)(res, data, 200, "fetched messages successfully");
            }
            catch (error) {
                (0, responseObject_1.errorResponseObject)(res, error, 500, error.message);
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.usersService.createUser(req.body);
                if ((data === null || data === void 0 ? void 0 : data.result) === "Already Exists") {
                    (0, responseObject_1.successResponseObject)(res, data, 200, "User not created");
                }
                else {
                    (0, responseObject_1.successResponseObject)(res, data, 200, "Created user successfully");
                }
            }
            catch (error) {
                (0, responseObject_1.errorResponseObject)(res, error, 500, error.message);
            }
        });
        this.usersService = new UserService_1.UsersService();
    }
}
exports.UsersController = UsersController;

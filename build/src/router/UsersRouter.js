"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controller/UsersController");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.post('/signup', new UsersController_1.UsersController().signUp);
exports.usersRouter.post('/login', new UsersController_1.UsersController().login);
exports.usersRouter.post('/admin', new UsersController_1.UsersController().signUpAdmin);
exports.usersRouter.post('/approveBand', new UsersController_1.UsersController().approveBand);
exports.usersRouter.get("/allBands", new UsersController_1.UsersController().getAllBands);

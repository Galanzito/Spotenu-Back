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
const UserBusiness_1 = require("../business/UserBusiness");
const UserDataBase_1 = require("../data/UserDataBase");
const hashManager_1 = require("../services/hashManager");
const tokenManager_1 = require("../services/tokenManager");
const idGenerator_1 = require("../services/idGenerator");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
class UsersController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, nickname, password, type, description } = req.body;
            try {
                const result = yield UsersController.UsersBusiness.signUp(name, email, nickname, password, type, description);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
            finally {
                yield UserDataBase_1.UserDataBase.destroyConnection();
            }
        });
    }
    signUpAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, nickname, password } = req.body;
            try {
                const token = req.headers.Authorization;
                const tokenData = new tokenManager_1.TokenManager().verify(token);
                if (tokenData.type !== "ADMIN") {
                    throw new UnauthorizedError_1.UnauthorizedError("Access Denied");
                }
                const result = yield UsersController.UsersBusiness.signUpAdmin(name, email, nickname, password);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
            finally {
                yield UserDataBase_1.UserDataBase.destroyConnection();
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, nickname } = req.body;
            try {
                const result = yield UsersController.UsersBusiness.login(password, email, nickname);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
            finally {
                yield UserDataBase_1.UserDataBase.destroyConnection();
            }
        });
    }
    getAllBands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.Authorization;
                const tokenData = new tokenManager_1.TokenManager().verify(token);
                if (tokenData.type !== "ADMIN") {
                    throw new UnauthorizedError_1.UnauthorizedError("Access Denied");
                }
                const result = yield UsersController.UsersBusiness.getAllBands();
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
            finally {
                yield UserDataBase_1.UserDataBase.destroyConnection();
            }
        });
    }
    approveBand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.Authorization;
                const tokenData = new tokenManager_1.TokenManager().verify(token);
                if (tokenData.type !== "ADMIN") {
                    throw new UnauthorizedError_1.UnauthorizedError("Access Denied");
                }
                const idBand = req.body.id;
                yield UsersController.UsersBusiness.approveBand(idBand);
                res.status(200).send("Banda Aprovada!");
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
            finally {
                yield UserDataBase_1.UserDataBase.destroyConnection();
            }
        });
    }
}
exports.UsersController = UsersController;
UsersController.UsersBusiness = new UserBusiness_1.UsersBusiness(new UserDataBase_1.UserDataBase(), new hashManager_1.HashManager(), new tokenManager_1.TokenManager(), new idGenerator_1.IdGenerator());

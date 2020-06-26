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
exports.UsersBusiness = void 0;
const InvalidParameterError_1 = require("../errors/InvalidParameterError");
const NotFoundError_1 = require("../errors/NotFoundError");
class UsersBusiness {
    constructor(usersDataBase, hashManager, tokenManager, idGenerator) {
        this.usersDataBase = usersDataBase;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
    }
    signUp(name, email, nickname, password, type, description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !password || !type || !nickname) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing Input");
            }
            if (password.length < 6) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Password");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(password);
            yield this.usersDataBase.signUp(id, name, email, nickname, hashPassword, type, description);
            const accessToken = this.tokenManager.generate({ id, type });
            return ({
                accessToken: accessToken,
                type: type
            });
        });
    }
    signUpAdmin(name, email, nickname, password, type = "ADMIN") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !password || !nickname) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing Input");
            }
            if (password.length < 10) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Password");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(password);
            yield this.usersDataBase.signUpAdmin(id, name, email, nickname, hashPassword, type);
            const accessToken = this.tokenManager.generate({ id, type });
            return ({
                accessToken: accessToken,
                type: type
            });
        });
    }
    login(password, email, nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing Input");
            }
            const user = yield this.usersDataBase.login(email, nickname);
            if (!user) {
                throw new NotFoundError_1.NotFoundError("User Not Found");
            }
            const comparePassword = yield this.hashManager.compareHash(password, user.password);
            if (!comparePassword) {
                throw new Error("Invalid Email or Password");
            }
            const accessToken = this.tokenManager.generate({
                id: user.id,
                type: user.type
            });
            return ({
                accessToken: accessToken,
                type: user.type,
                isAproved: this.usersDataBase.convertTinyIntToBoolean(user.isAproved)
            });
        });
    }
    getAllBands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersDataBase.getAllBands();
            return result;
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid ID");
            }
            yield this.usersDataBase.approveBand(id);
        });
    }
}
exports.UsersBusiness = UsersBusiness;
;

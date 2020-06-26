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
exports.UserDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class UserDataBase extends BaseDataBase_1.BaseDataBase {
    signUp(id, name, email, nickname, password, type, description) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getConnection.call(this).raw(`
            INSERT INTO ${BaseDataBase_1.BaseDataBase.USERS_TABLE_NAME} (id, name, email, nickname, password, type, description)
            VALUES('${id}', '${name}', '${email}', '${nickname}', '${password}', '${type}', '${description}')
        `);
        });
    }
    signUpAdmin(id, name, email, nickname, password, type = 'ADMIN') {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getConnection.call(this).raw(`
            INSERT INTO ${BaseDataBase_1.BaseDataBase.USERS_TABLE_NAME} (id, name, email, nickname, password, type)
            VALUES('${id}', '${name}', '${email}', '${nickname}', '${password}', '${type}')
        `);
        });
    }
    login(email, nickname) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield _super.getConnection.call(this).raw(`
                SELECT * FROM ${BaseDataBase_1.BaseDataBase.USERS_TABLE_NAME} WHERE email = '${email}' OR nickname = '${nickname}'
            `);
            return user[0][0];
        });
    }
    getAllBands() {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _super.getConnection.call(this).raw(`
            SELECT
                id,
                name,
                email,
                nickname,
                isAproved
            FROM ${BaseDataBase_1.BaseDataBase.USERS_TABLE_NAME} WHERE type = "BAND"
        `);
            return result[0];
        });
    }
    approveBand(id) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.getConnection.call(this).raw(`
            UPDATE ${BaseDataBase_1.BaseDataBase.USERS_TABLE_NAME}
            SET isAproved = 1 WHERE id = '${id}'
        `);
        });
    }
}
exports.UserDataBase = UserDataBase;

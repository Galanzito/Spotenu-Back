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
exports.MusicalGenresDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class MusicalGenresDataBase extends BaseDataBase_1.BaseDataBase {
    addGenre(id, name) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.getConnection.call(this).raw(`
            INSERT INTO ${BaseDataBase_1.BaseDataBase.MUSICAL_GENRES_TABLE_NAME}(id, name)
            VALUES ('${id}', '${name}')
        `);
        });
    }
    getAllGenres() {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _super.getConnection.call(this).raw(`
            SELECT * FROM ${BaseDataBase_1.BaseDataBase.MUSICAL_GENRES_TABLE_NAME}
        `);
            return result[0];
        });
    }
}
exports.MusicalGenresDataBase = MusicalGenresDataBase;
;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataBase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
dotenv_1.default.config();
class BaseDataBase {
    getConnection() {
        if (BaseDataBase.KNEX_CONNECTION === null) {
            BaseDataBase.KNEX_CONNECTION = knex_1.default({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME,
                },
            });
        }
        return BaseDataBase.KNEX_CONNECTION;
    }
    static destroyConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (BaseDataBase.KNEX_CONNECTION !== null) {
                yield BaseDataBase.KNEX_CONNECTION.destroy();
            }
            BaseDataBase.KNEX_CONNECTION = null;
        });
    }
    convertBooleanToTinyInt(value) {
        return value ? 1 : 0;
    }
    convertTinyIntToBoolean(value) {
        return value === 1;
    }
}
exports.BaseDataBase = BaseDataBase;
BaseDataBase.KNEX_CONNECTION = null;
BaseDataBase.USERS_TABLE_NAME = 'UsersSpotenu';
BaseDataBase.MUSICAL_GENRES_TABLE_NAME = 'MusicalGenres';
;

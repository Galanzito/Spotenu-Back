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
exports.MusicalGenresController = void 0;
const MusicalGenresBusiness_1 = require("../business/MusicalGenresBusiness");
const MusicalGenresDataBase_1 = require("../data/MusicalGenresDataBase");
const idGenerator_1 = require("../services/idGenerator");
const tokenManager_1 = require("../services/tokenManager");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
class MusicalGenresController {
    addGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.Authorization || req.headers.authorization;
                const tokenData = new tokenManager_1.TokenManager().verify(token);
                if (tokenData.type !== "ADMIN") {
                    throw new UnauthorizedError_1.UnauthorizedError("Access Denied");
                }
                yield MusicalGenresController.MusicalGenresBusiness.addGenre(req.body.name);
                res.status(200).send();
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
            finally {
                MusicalGenresDataBase_1.MusicalGenresDataBase.destroyConnection();
            }
        });
    }
    ;
    getAllGenres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.Authorization || req.headers.authorization;
                const tokenData = new tokenManager_1.TokenManager().verify(token);
                if (tokenData.type === "ADMIN" || tokenData.type === "BAND") {
                    const result = yield MusicalGenresController.MusicalGenresBusiness.getAllGenres();
                    res.status(200).send({ result });
                }
                else {
                    throw new UnauthorizedError_1.UnauthorizedError("Acces Denied");
                }
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
            finally {
                MusicalGenresDataBase_1.MusicalGenresDataBase.destroyConnection();
            }
        });
    }
    ;
}
exports.MusicalGenresController = MusicalGenresController;
MusicalGenresController.MusicalGenresBusiness = new MusicalGenresBusiness_1.MusicalGenresBusiness(new MusicalGenresDataBase_1.MusicalGenresDataBase(), new idGenerator_1.IdGenerator());

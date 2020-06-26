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
exports.MusicalGenresBusiness = void 0;
const InvalidParameterError_1 = require("../errors/InvalidParameterError");
class MusicalGenresBusiness {
    constructor(genresDataBase, idGenerator) {
        this.genresDataBase = genresDataBase;
        this.idGenerator = idGenerator;
    }
    addGenre(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing Input");
            }
            const id = this.idGenerator.generate();
            yield this.genresDataBase.addGenre(id, name);
            return { message: "Adicionado com Sucesso" };
        });
    }
    getAllGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.genresDataBase.getAllGenres();
            return result;
        });
    }
}
exports.MusicalGenresBusiness = MusicalGenresBusiness;

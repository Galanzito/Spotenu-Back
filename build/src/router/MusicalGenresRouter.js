"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicalGenresRouter = void 0;
const express_1 = __importDefault(require("express"));
const MusicalGenresController_1 = require("../controller/MusicalGenresController");
exports.musicalGenresRouter = express_1.default.Router();
exports.musicalGenresRouter.post("/add", new MusicalGenresController_1.MusicalGenresController().addGenre);
exports.musicalGenresRouter.get("/all", new MusicalGenresController_1.MusicalGenresController().getAllGenres);

import express from 'express';
import { MusicalGenresController } from '../controller/MusicalGenresController';

export const musicalGenresRouter = express.Router();

musicalGenresRouter.post("/add", new MusicalGenresController().addGenre);

musicalGenresRouter.get("/all", new MusicalGenresController().getAllGenres);
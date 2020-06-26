import { Request, Response } from 'express'
import { MusicalGenresBusiness } from '../business/MusicalGenresBusiness'
import { MusicalGenresDataBase } from '../data/MusicalGenresDataBase'
import { IdGenerator } from '../services/idGenerator'
import { TokenManager } from '../services/tokenManager'
import { UnauthorizedError } from '../errors/UnauthorizedError'

export class MusicalGenresController {
    private static MusicalGenresBusiness = new MusicalGenresBusiness(
        new MusicalGenresDataBase(),
        new IdGenerator()
    )

    async addGenre(req: Request, res: Response) {
        try {
            const token = req.headers.Authorization as string || req.headers.authorization as string;

            const tokenData = new TokenManager().verify(token)

            if (tokenData.type !== "ADMIN") {
                throw new UnauthorizedError("Access Denied")
            }

            await MusicalGenresController.MusicalGenresBusiness.addGenre(req.body.name)

            res.status(200).send()
        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message })
        } finally {
            MusicalGenresDataBase.destroyConnection();
        }
    };

    async getAllGenres(req: Request, res: Response) {
        try {
            const token = req.headers.Authorization as string || req.headers.authorization as string;

            const tokenData = new TokenManager().verify(token)

            if (tokenData.type === "ADMIN" || tokenData.type === "BAND") {

                const result = await MusicalGenresController.MusicalGenresBusiness.getAllGenres();

                res.status(200).send({ result })
            } else {
                throw new UnauthorizedError("Acces Denied")
            }

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message })
        } finally {
            MusicalGenresDataBase.destroyConnection();
        }
    };
}
import { MusicalGenresDataBase } from "../data/MusicalGenresDataBase";
import { IdGenerator } from "../services/idGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";

export class MusicalGenresBusiness {
    constructor(
        private genresDataBase: MusicalGenresDataBase,
        private idGenerator: IdGenerator
    ){}

    public async addGenre(name:string){
        if(!name){
            throw new InvalidParameterError("Missing Input")
        }

        const id = this.idGenerator.generate();

        await this.genresDataBase.addGenre(id, name)

        return {message: "Adicionado com Sucesso"}
    }

    public async getAllGenres(){
        const result = await this.genresDataBase.getAllGenres();

        return result
    }
}
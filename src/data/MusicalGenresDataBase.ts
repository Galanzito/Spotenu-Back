import { BaseDataBase } from "./BaseDataBase";

export class MusicalGenresDataBase extends BaseDataBase {
    public async addGenre(id: string, name: string): Promise <any> {
        await super.getConnection().raw(`
            INSERT INTO ${BaseDataBase.MUSICAL_GENRES_TABLE_NAME}(id, name)
            VALUES ('${id}', '${name}')
        `)
    }

    public async getAllGenres(): Promise <any> {
        const result = await super.getConnection().raw(`
            SELECT * FROM ${BaseDataBase.MUSICAL_GENRES_TABLE_NAME}
        `)

        return result[0]
    }
};
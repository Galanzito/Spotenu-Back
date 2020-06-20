import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {
    public async signUp(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: string,
        description?: string
    ): Promise <any> {
        return await super.getConnection().raw(`
            INSERT INTO ${BaseDataBase.USERS_TABLE_NAME} (id, name, email, nickname, password, type, description)
            VALUES('${id}', '${name}', '${email}', '${nickname}', '${password}', '${type}', '${description}')
        `)
    }

    public async login(email?: string, nickname?: string):Promise <any> {
            const user = await super.getConnection().raw(`
                SELECT * FROM ${BaseDataBase.USERS_TABLE_NAME} WHERE email = '${email}' OR nickname = '${nickname}'
            `)

            return user[0][0]
    }

}
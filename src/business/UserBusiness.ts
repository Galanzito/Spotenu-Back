import { UserDataBase } from "../data/UserDataBase";
import { HashManager } from "../services/hashManager";
import { TokenManager } from "../services/tokenManager";
import { IdGenerator } from "../services/idGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";

export class UsersBusiness {
    constructor(
        private usersDataBase: UserDataBase,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ){}

    public async signUp(
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: string,
        description?: string
    ){
        if(!name || !email || !password || !type || !nickname){
            throw new InvalidParameterError("Missing Input");
        }

        if(password.length < 6) {
            throw new InvalidParameterError("Invalid Password");
        }

        const id = this.idGenerator.generate();
        const hashPassword = await this.hashManager.hash(password);

        await this.usersDataBase.signUp(
            id, name, email, nickname, hashPassword, type, description
        )

        const accessToken = this.tokenManager.generate({id, type});

        return ({
            accessToken: accessToken,
            type: type
        })

    }
};
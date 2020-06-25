import { UserDataBase } from "../data/UserDataBase";
import { HashManager } from "../services/hashManager";
import { TokenManager } from "../services/tokenManager";
import { IdGenerator } from "../services/idGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";

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

    public async signUpAdmin(
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: string = "ADMIN"
    ){
        if(!name || !email || !password || !nickname){
            throw new InvalidParameterError("Missing Input");
        }

        if(password.length < 10) {
            throw new InvalidParameterError("Invalid Password");
        }

        const id = this.idGenerator.generate();
        const hashPassword = await this.hashManager.hash(password);

        await this.usersDataBase.signUpAdmin(
            id, name, email, nickname, hashPassword, type
        )

        const accessToken = this.tokenManager.generate({id, type})

        return({
            accessToken: accessToken,
            type: type
        })
    }

    public async login(password: string, email?: string, nickname?: string){
        if(!password){
            throw new InvalidParameterError("Missing Input")
        }

        const user = await this.usersDataBase.login(email, nickname)
        if(!user){
            throw new NotFoundError("User Not Found")
        }

        const comparePassword = await this.hashManager.compareHash(password, user.password)
        if(!comparePassword){
            throw new Error("Invalid Email or Password")
        }

        const accessToken = this.tokenManager.generate({
            id: user.id, 
            type: user.type
        })

        return ({
            accessToken: accessToken,
            type: user.type,
            isAproved: this.usersDataBase.convertTinyIntToBoolean(user.isAproved)
        })
    }

    public async getAllBands(){
        const result = await this.usersDataBase.getAllBands()

        return result
    }

    public async approveBand(id: string){
        if(!id){
            throw new InvalidParameterError("Invalid ID")
        }

        await this.usersDataBase.approveBand(id)
    }
};
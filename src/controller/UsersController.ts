import { Request, Response } from 'express'
import { UsersBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";
import { HashManager } from "../services/hashManager";
import { TokenManager } from "../services/tokenManager";
import { IdGenerator } from "../services/idGenerator";


export class UsersController {
    private static UsersBusiness = new UsersBusiness(
        new UserDataBase(),
        new HashManager(),
        new TokenManager(),
        new IdGenerator()
    )

    async signUp(req: Request, res: Response) {
        const { name, email, nickname, password, type, description } = req.body;
        try{
            const result = await UsersController.UsersBusiness.signUp(
                name,
                email,
                nickname,
                password,
                type,
                description
            )
            res.status(200).send(result);
        }catch(err){
            res.status(err.erroCode || 400).send({message: err.message})
        }finally{
            await UserDataBase.destroyConnection();
        }
    }
}
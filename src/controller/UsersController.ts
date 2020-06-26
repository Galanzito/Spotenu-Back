import { Request, Response } from 'express'
import { UsersBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";
import { HashManager } from "../services/hashManager";
import { TokenManager } from "../services/tokenManager";
import { IdGenerator } from "../services/idGenerator";
import { UnauthorizedError } from '../errors/UnauthorizedError';

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
            res.status(err.errorCode || 400).send({message: err.message})
        }finally{
            await UserDataBase.destroyConnection();
        }
    }

    async signUpAdmin(req: Request, res: Response) {
        const { name, email, nickname, password } = req.body;
        try{
            const token = req.headers.Authorization as string || req.headers.authorization as string;

            const tokenData = new TokenManager().verify(token);

            if(tokenData.type !== "ADMIN"){
                throw new UnauthorizedError("Access Denied")
            }

            const result = await UsersController.UsersBusiness.signUpAdmin(
                name,
                email,
                nickname,
                password
            )

            res.status(200).send(result)
        }catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }finally{
            await UserDataBase.destroyConnection();
        }
    }

    async login(req: Request, res: Response) {
        const { email, password, nickname } = req.body;
        try{
            const result = await UsersController.UsersBusiness.login(password,email, nickname);

            res.status(200).send(result);
        }catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }finally{
            await UserDataBase.destroyConnection();
        }
    }

    async getAllBands(req: Request, res: Response) {
        try{
            const token = req.headers.Authorization as string || req.headers.authorization as string;

            const tokenData = new TokenManager().verify(token);

            if(tokenData.type !== "ADMIN"){
                throw new UnauthorizedError("Access Denied")
            }

            const result = await UsersController.UsersBusiness.getAllBands()

            res.status(200).send(result)
        }catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }finally{
            await UserDataBase.destroyConnection();
        }
    }

    async approveBand(req: Request, res: Response) {
        try{
            const token = req.headers.Authorization as string || req.headers.authorization as string;

            const tokenData = new TokenManager().verify(token);

            if(tokenData.type !== "ADMIN"){
                throw new UnauthorizedError("Access Denied")
            }

            const idBand = req.body.id
            
            await UsersController.UsersBusiness.approveBand(idBand)

            res.status(200).send("Banda Aprovada!")
        }catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }finally{
            await UserDataBase.destroyConnection();
        }
    }
}
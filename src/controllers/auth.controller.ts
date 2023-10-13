import {NextFunction, Request, Response} from "express";
import {authService} from "../services/auth.service";
import {IToken, ITokenPair, ITokenPayload} from "../types/token.type";
import {tokenRepository} from "../repositories/token.repository";

class AuthController{
 public async register(req:Request, res:Response, next:NextFunction):Promise<Response<void>>{
     try{
      await authService.register(req.body);
      return res.sendStatus(201)
     }catch (e) {
      next(e)
     }
 }
 public async login(req:Request, res:Response, next:NextFunction):Promise<Response<ITokenPair>>{
     try {
         const tokensPair = await authService.login(req.body)

         return res.json(tokensPair)
     }catch (e){
         next(e)
     }
 }
 public async refresh(req:Request, res:Response, next:NextFunction):Promise<Response<ITokenPair>>{
     try {
        const tokenPayload =req.res.locals.tokenPayload as ITokenPayload;
        const refreshToken =req.res.locals.refreshToken as string;

         const tokensPair = await authService.refresh(tokenPayload,refreshToken)
         return res.status(201).json(tokensPair)
     }catch (e){
         next(e)
     }
 }
}

export const authController = new AuthController()
import {ITokenPayload, ITokenPair} from "../types/token.type";
import * as jwt from "jsonwebtoken"
import {configs} from "../configs/config";
import {ApiError} from "../errors/api.errors";
class TokenService{
public  generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET,{
        expiresIn:'30s'
    })
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET,{
        expiresIn:'50s'
    });
    return{accessToken, refreshToken };
}
public  checkToken(token: string, type: "access" | "refresh"): ITokenPayload {
   try{
    let secret: string;
    switch (type){
        case "access":
            secret=configs.JWT_ACCESS_SECRET;
            break;
        case "refresh":
            secret=configs.JWT_REFRESH_SECRET;
            break;
        default:
    }
    return jwt.verify(token, secret) as ITokenPayload

   }catch(e){
       throw new ApiError('Invalid token type', 401)
    }
}
}
export const tokenService = new TokenService()
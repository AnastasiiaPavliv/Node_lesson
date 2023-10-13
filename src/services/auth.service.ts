import {IUserCredentials} from "../types/user.type";
import {ApiError} from "../errors/api.errors";
import {userRepository} from "../repositories/user.repository";
import {passwordService} from "./password.service";
import {IToken, ITokenPair, ITokenPayload} from "../types/token.type";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";

class AuthService{
public async register(dto:IUserCredentials):Promise<void>{
    try{
        const hashedPassword = await passwordService.hash((dto.password))
        await userRepository.register({...dto, password:hashedPassword})
    }catch (e) {
    throw new ApiError(e.message, e.status)
    }
}
public async login(dto:IUserCredentials):Promise<ITokenPair>{
    try {
        const user = await userRepository.getOneByParams({email: dto.email})
        if(!user){
            throw new ApiError ('Invalid credentials provided', 401)
        }

        const isMatched = await passwordService.compare(dto.password, user.password)
        if(!isMatched){
            throw new ApiError ('Invalid credentials provided', 401)
        }

        const tokensPair= tokenService.generateTokenPair(
            {userId: user._id, name:user.name})
        await tokenRepository.create({ ...tokensPair, _userId: user._id });
        return tokensPair
    }catch (e) {
        throw new ApiError(e.message, e.status)
    }
}
public async refresh(payload:ITokenPayload, refreshToken:string):Promise<ITokenPair>{
    try {
        const tokensPair= tokenService.generateTokenPair({userId: payload.userId, name:payload.name})
        await Promise.all([
            tokenRepository.create({ ...tokensPair, _userId: payload.userId }),
        tokenRepository.deleteOne({ refreshToken}),
    ])
        return tokensPair
    }catch (e) {
        throw new ApiError(e.message, e.status)
    }
}

}
export const authService = new AuthService();
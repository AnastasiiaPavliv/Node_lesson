import { Token } from "../models/Token.model";
import {IToken} from "../types/token.type";
import {FilterQuery} from "mongoose"

export class TokenRepository {
    public async create(dto: FilterQuery<IToken>): Promise<IToken> {
        return await Token.create(dto);
    }
}

export const tokenRepository = new TokenRepository();
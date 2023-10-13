import {model, Schema, Types} from "mongoose";
import {User} from "./user.model";
import {IToken} from "../types/token.type";

const tokensSchema = new Schema({
    accessToken:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        required:true
    },
    _userId:{
        type:Types.ObjectId,
        required:true,
        ref:User
    }
},  { timestamps: true, versionKey: false },);

export const Token = model<IToken>("token", tokensSchema);
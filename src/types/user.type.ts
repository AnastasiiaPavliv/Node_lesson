import {EGenders} from "../enums/EGenders.enum";
import {Document} from 'mongoose'

export interface IUser extends Document{
    name?:string;
    age?:number;
    genders?:EGenders;
    email?:string;
    password:string;
}

export type IUserCredentials= Pick<IUser, 'email' | 'password'>
import joi from 'Joi'
import {EGenders} from "../enums/EGenders.enum";
export class UserValidator{
    static create=joi.object({
        name:joi.string().min(2).max(50).trim().required(),
        age:joi.string().min(18).max(150).required(),
        genders:joi.valid(...Object.values(EGenders)),
        email: ,
        password: ,
    })
}
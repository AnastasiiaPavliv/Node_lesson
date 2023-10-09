import {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import {ApiError} from "../errors/api.errors";
import {ObjectSchema} from "Joi";
class CommonMiddleware{
    public  isValidId(field:string) {
        return (req:Request, res:Response, next:NextFunction) =>  {
        try{
            const  id  = req.params[field]
            if (!mongoose.isObjectIdOrHexString(id)) {
                throw new ApiError("User not found", 400);
            }
            next()
        }catch (e) {
            next(e)
        }
    }}
    public isBodyValidId(validator:ObjectSchema){
        return (req:Request, res:Response, next:NextFunction)=>{
        try{
            const {error, value} =validator.validate(req.body);

            if (error) {
                throw new ApiError(error.message, 400);
            }
            req.body=value;
            next();
        }catch (e) {
            next(e)
        }
    }}
}

export const commonMiddleware = new CommonMiddleware()
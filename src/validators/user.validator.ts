import joi from "Joi";

import { regexConstant } from "../const/regexp.const";
import { EGenders } from "../enums/EGenders.enum";

export class UserValidator {
  static firstName = joi.string().min(2).max(50).trim();
  static age = joi.number().min(18).max(150).required();
  static email =  joi.string().regex(regexConstant.EMAIL).trim().required();
  static password = joi.string().regex(regexConstant.PASSWORD).trim().required();
  static genres = joi.valid(...Object.values(EGenders));
  static create = joi.object({
    name: this.firstName.required(),
    age: this.age,
    genders: this.genres,
    email: this.email,
    password: this.password,
  });
  static update = joi.object({
    name: this.firstName,
    age: this.age,
    genders: this.genres,
  });
  static register = joi.object({
    email: this.email,
    password: this.password
  })
}

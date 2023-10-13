import joi from "Joi";

import { regexConstant } from "../const/regexp.const";
import { EGenders } from "../enums/EGenders.enum";

export class UserValidator {
  static firstName = joi.string().min(2).max(50).trim();
  static age = joi.number().min(18).max(150);
  static email =  joi.string().regex(regexConstant.EMAIL).trim();
  static password = joi.string().regex(regexConstant.PASSWORD).trim();
  static genders = joi.valid(...Object.values(EGenders));
  static update = joi.object({
    name: this.firstName,
    age: this.age,
    genders: this.genders,
  });
  static register = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    genders: this.genders.required(),
    email: this.email.required(),
    password: this.password.required(),
  })
  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}

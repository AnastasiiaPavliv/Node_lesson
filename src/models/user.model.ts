import { model, Schema } from "mongoose";

import { EGenders } from "../enums/EGenders.enum";
import {IUser} from "../types/user.type";

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    min: [1, "Minimum age is 1"],
    max: [99, "Maximum age is 99"],
  },
  genders: {
    type: String,
    enum: EGenders,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>("user", userSchema);

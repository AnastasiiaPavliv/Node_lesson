import {IUser, IUserCredentials} from "../types/user.type";
import {User} from "../models/user.model";
import {FilterQuery} from "mongoose"

class UserRepository {
 public async getAll(): Promise<IUser[]>{
  return await User.find()
 }
 public async getOneByParams(params:FilterQuery<IUser>): Promise<IUser>{
  return await User.findOne(params)
 }
 public async findById(userId: string): Promise<IUser>{
  return await User.findById(userId)
 }
 public async register(dto:IUserCredentials):Promise<IUser>{
  return await User.create(dto)
 }
  public async  createUser(dto: IUser): Promise<IUser>{
   return await User.create(dto);
  }
 public async  updateUser(userId:string, dto: Partial<IUser>): Promise<IUser[]>{
  return await User.findByIdAndUpdate(userId, dto, {returnDocument: "after"});

  }
 public async deleteUser(userId: string):Promise<void>{
  await User.deleteOne({ _id:userId })
 }
}

export const userRepository = new UserRepository()
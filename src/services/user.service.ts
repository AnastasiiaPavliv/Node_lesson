import {IUser} from "../types/user.type";
import {userRepository} from "../repositories/user.repository";
import {User} from "../models/user.model";
import {UserValidator} from "../validators/user.validator";

class UserService{
 public async getAll(): Promise<IUser[]> {
     const users = await userRepository.getAll();
     return users;
 }
 public async updateUser(userId:string, dto: Partial<IUser>): Promise<any> {
     return await userRepository.updateUser(userId, dto);
 }
 public async createUser(dto: IUser): Promise<any> {
     return await userRepository.getOneByParams({email:dto.email});
     return await userRepository.createUser(dto);
 }
 public async deleteUser(userId:string){
    await userRepository.deleteUser(userId);
 }
}

export const userService = new UserService()
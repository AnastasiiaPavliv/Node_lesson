import {IUser} from "../types/user.type";
import {userRepository} from "../repositories/user.repository";

class UserService{
 public async getAll(): Promise<IUser[]> {
     const users = await userRepository.getAll();
     return users;
 }
 public async updateUser(userId:string, dto: Partial<IUser>): Promise<any> {
     return await userRepository.updateUser(userId, dto);
 }

 public async deleteUser(userId:string){
    await userRepository.deleteUser(userId);
 }
}

export const userService = new UserService()
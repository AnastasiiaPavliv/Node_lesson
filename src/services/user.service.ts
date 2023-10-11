import {IUser} from "../types/user.type";
import {userRepository} from "../repositories/user.repository";
import {User} from "../models/user.model";
import {UserValidator} from "../validators/user.validator";
import {ApiError} from "../errors/api.errors";

class UserService{
 public async getAll(): Promise<IUser[]> {
     const users = await userRepository.getAll();
     return users;
 }
 public async updateUser(userId:string, dto: Partial<IUser>): Promise<any> {
     return await userRepository.updateUser(userId, dto);
 }
 public async createUser(dto: IUser): Promise<any> {
     await this.isEmailUniq(dto.email);
     // return await userRepository.getOneByParams({email:dto.email});
     return await userRepository.createUser(dto);
 }
 public async deleteUser(userId:string){
    await userRepository.deleteUser(userId);
 }
    private async isEmailUniq(email: string): Promise<void> {
        const user = await userRepository.getOneByParams({ email });
        if (user) {
            throw new ApiError("Email already exist", 409);
        }
    }
}

export const userService = new UserService()
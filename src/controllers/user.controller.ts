import {User} from "../models/user.model";
import {NextFunction, Request, Response} from "express";
import {IUser} from "../types/user.type";
import {userService} from "../services/user.service";
import mongoose from "mongoose";
import {ApiError} from "../errors/api.errors";
import {UserValidator} from "../validators/user.validator";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction):
        Promise<Response<IUser[]>> {
        try {
            const users = await userService.getAll();

            return res.json(users);

        } catch (e) {
            next(e)
        }
    }

    // public async createUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const createUser = await userService.createUser(req.body);
    //         res.status(201).json(createUser);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.res.locals;

            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.deleteUser(req.params.userId);
        } catch (e) {
            next(e)
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
                const user = await userService.updateUser(req.params.userId, req.body);
                res.status(201).json(user)
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();

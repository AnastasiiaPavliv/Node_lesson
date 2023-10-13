import {Response, Router} from "express";

import { User } from "../models/user.model";
import { UserValidator } from "../validators/user.validator";
import {userController} from "../controllers/user.controller";
import {IUser} from "../types/user.type";
import {userMiddleware} from "../middlewares/user.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidId("userId"),
    userMiddleware.getByIdOrThrow,
    userController.getById);

router.put("/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidId('userId'),
    commonMiddleware.isBodyValidId(UserValidator.update),
    userController.updateUser);

router.delete("/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidId('userId'),
    userController.deleteById)
export const userRouter = router;
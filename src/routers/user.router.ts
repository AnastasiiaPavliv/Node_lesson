import {Response, Router} from "express";

import { User } from "../models/user.model";
import { UserValidator } from "../validators/user.validator";
import {userController} from "../controllers/user.controller";
import {IUser} from "../types/user.type";
import {userMiddleware} from "../middlewares/user.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAll);

router.post("/",
    commonMiddleware.isBodyValidId(UserValidator.create),
    userController.createUser);

router.get("/:userId",
    commonMiddleware.isValidId("userId"),
    userMiddleware.getByIdOrThrow,
    userController.getById);

router.delete("/:userId",
    commonMiddleware.isValidId('userId'),
    userMiddleware.getByIdOrThrow,
    userController.deleteById)
router.put("/:userId",
    commonMiddleware.isValidId('userId'),
    userController.updateUser);
export const userRouter = router;
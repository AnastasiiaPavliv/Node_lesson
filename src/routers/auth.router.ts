import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {userMiddleware} from "../middlewares/user.middleware";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.post('/register',
    commonMiddleware.isBodyValidId(UserValidator.register),
    userMiddleware.isEmailUniq,
    authController.register);
router.post('/login',
    commonMiddleware.isBodyValidId(UserValidator.login),
    authController.login);
router.post('/refresh',
     authMiddleware.checkRefreshToken,
    authController.refresh);


export const authRouter = router
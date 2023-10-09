import express, {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { userRouter } from "./routers/user.router";
import {authRouter} from "./routers/auth.router";
import {ApiError} from "./errors/api.errors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((error:ApiError,req:Request, res:Response, next:NextFunction)=>{
    const status = error.status || 500;
    res.status(status).json({
        message:error.message,
        status: error.status
    })
})

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server OK ${configs.PORT}`);
});

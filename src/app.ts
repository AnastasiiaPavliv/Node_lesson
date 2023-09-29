import express, { NextFunction, Request } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/user.model";
import { UserValidator } from "./validators/user.validator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res, next) => {
  try {
    const { error, value } = UserValidator.create.validate(req.body);
    if (error) {
      throw new Error(error.message);
    }
    const createUser = await User.create(value);
    res.status(201).json(createUser);
  } catch (e) {
    next(e);
  }
});

app.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await User.deleteOne({ _id: id });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
app.put("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = UserValidator.update.validate(req.body);
    if (error) {
      throw new Error(error.message);
    }
    const user = await User.findByIdAndUpdate(id, value);

    if (!user) {
      throw new Error("User not found");
    }
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server OK ${configs.PORT}`);
});

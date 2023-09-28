import express, {Request} from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import * as fsService from "./fs.service";
import {User} from "./models/user.model";
import {IUser} from "./types/user.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const users = await User.find();
   res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!name || name.length < 2) {
      throw new Error("wrong name!");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Wrong email!");
    }
    const users = await fsService.reader();
    const newUser = { name, email, id: users[users.length - 1].id };
    users.push(newUser);
    await fsService.writer(users);
    res.status(201).json(newUser);
  } catch {
    res.status(400).json();

  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const users = await fsService.reader();
  const user = users.find((user) => user.id === Number(id));
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const users = await fsService.reader();
  users.splice(+id - 1, 1);

  await fsService.writer(users);

  res.sendStatus(204);
});

const PORT = 5000;
app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server OK ${PORT}`);
});

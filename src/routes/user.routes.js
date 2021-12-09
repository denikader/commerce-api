import { Router } from "express";
import User from "../models/user.model.js";

const userRouter = Router();

userRouter.get("/users", (rea, res) => {
  res.send("hello User");
});

userRouter.post("/users", async (req, res) => {
  const user = new User(req, body);
  await user.save();
  res.json({ massage: "User Crated" });
});
export default userRouter;

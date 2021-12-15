import { Router } from "express";
import User from "../models/user.model.js";
import userValidate from "../validations/user.validate.js";
import jwt from "jsonwebtoken";
import { isAdmin } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/users", (rea, res) => {
  res.send("hello User");
});

userRouter.post("/users", isAdmin, async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = new User(req.body);
  await user.save();
  res.json({ massage: "User Crated" });
});

userRouter.delete("/users", (req, res) => {
  User.deleteMany({}).then(() => {
    console.log("deleted");
  });
  res.json({ massage: "delete" });
});

// login token

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    // generate token

    const token = jwt.sign(JSON.stringify(user, process.env.JWT_KEY));

    res.json({ token });
  } else {
    res.status(400).json({ error: "invalid authentication data" });
  }
});

export default userRouter;

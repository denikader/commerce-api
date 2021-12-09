import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (rea, res) => {
  res.send("hello");
});

export default userRouter;

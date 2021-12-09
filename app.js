import express from "express";
import userRouter from "./src/routes/user.routes.js";
import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/commerce_api");
  const app = express();

  //parse the body am dera yak jar anusret
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // setup routes
  app.use(userRouter);

  app.listen(5000, () => {
    console.log("listening. on http://localhost:5000");
  });
}

main();

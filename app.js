import express from "express";
import user from "./src/routes/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.routes.js";
import cors from "cors";
import productt from "./src/routes/product.js";

async function main() {
  // setup dotenv
  dotenv.config("dotenv");

  // mongo setup connect
  await mongoose.connect(process.env.MONGO_URL);
  const app = express();

  app.use(cors());

  //parse the body am dera yak jar anusret
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // setup routes
  app.use(user);
  app.use(authRouter);
  app.use(productt);

  app.listen(process.env.PORT, () => {
    console.log("listening. on http://localhost:" + process.env.PORT);
  });
}

main();

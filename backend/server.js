import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const PORT = 3000;
dotenv.config();

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB, App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

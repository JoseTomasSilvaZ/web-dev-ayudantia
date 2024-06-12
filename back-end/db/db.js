import mongoose from "mongoose";

const URL = process.env.DB_CONNECTION;
mongoose
  .connect(URL)
  .then(() => console.log("database connected"))
  .catch((error) => console.log("Error connecting to db: ", error));
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    index: { unique: true },
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;

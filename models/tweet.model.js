import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  author: String,
  body: String,
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const tweetModel = mongoose.model("Tweet", tweetSchema);

export default tweetModel;

import { Router } from "express";
import tweetModel from "../models/tweet.model.js";

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const tweets = await tweetModel.find();
    res.render("tweets", {
      tweets,
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
});

export default router;

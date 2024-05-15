import { Router } from "express";
import tweetModel from "../models/tweet.model.js";

const router = new Router();
router.patch("/posts/:id/like", async (req, res) => {
  try {
    const tweet = await tweetModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found.",
        tweet: null,
      });
    }

    res.json({
      message: "Like added successfully",
      tweet,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/posts", async (req, res) => {
  try {
    const newTweet = new tweetModel(req.body);
    await newTweet.save();
    res.status(201).json({
      tweet: newTweet,
      message: "Tweet added successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const tweets = await tweetModel.find();
    res.json({
      tweets,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const tweet = await tweetModel.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        tweet: null,
      });
    }
    res.json({
      tweet,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.patch("/posts/:id", async (req, res) => {
  try {
    const tweet = await tweetModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found.",
        tweet: null,
      });
    }
    res.json({
      tweet,
      message: "Like added successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedTweet = await tweetModel.findByIdAndRemove(req.params.id);
    if (!deletedTweet) {
      return res.status(404).json({
        message: "Tweet not found.",
        tweet: null,
      });
    }
    res.json({
      message: "Tweet deleted successfully",
      tweet: deletedTweet,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;

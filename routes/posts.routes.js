import { Router, text } from "express";
import { tweetsDB } from "../database/tweets.js";
const router = new Router();

router.post("/posts/:id/like", (req, res) => {
  const id = +req.params.id;
  const indexOfTweet = tweetsDB.findIndex((tweet) => tweet.id === id);
  if (indexOfTweet === -1) {
    return res.status(404).json({
      message: "Tweet not found.",
      tweet: null,
    });
  }
  tweetsDB[indexOfTweet].likes = tweetsDB[indexOfTweet].likes + 1;
  return res.json({
    message: "Like added to tweet",
    tweet: tweetsDB[indexOfTweet],
  });
});

router.get("/posts", (req, res) => {
  return res.json({
    tweets: tweetsDB,
  });
});

router.get("/posts/:id", (req, res) => {
  const id = +req.params.id;
  const tweet = tweetsDB.find((tw) => tw.id === id);
  if (!tweet) {
    return res.status(404).json({
      message: "Tweet not found",
      tweet: null,
    });
  }
  return res.json({
    tweet,
  });
});

router.post("/posts", (req, res) => {
  const post = req.body;
  const tweet = { ...post, id: tweetsDB.length + 1 };
  tweetsDB.push(tweet);
  return res.json({
    tweet,
    message: "Tweet added to db",
  });
});

router.patch("/posts/:id", (req, res) => {
  const id = +req.params.id;
  const body = req.body.body;
  const indexOfTweet = tweetsDB.findIndex((tweet) => tweet.id === id);
  if (indexOfTweet === -1) {
    return res.status(404).json({
      message: "Tweet not found.",
      tweet: null,
    });
  }
  tweetsDB[indexOfTweet] = { ...tweetsDB[indexOfTweet], body };
  return res.status(201).json({
    tweet: tweetsDB[indexOfTweet],
    message: "Tweet updated",
  });
});

router.delete("/posts/:id", (req, res) => {
  const id = +req.params.id;
  const indexOfTweet = tweetsDB.findIndex((tweet) => tweet.id === id);
  if (indexOfTweet === -1) {
    return res.status(404).json({
      message: "Tweet not found.",
      tweet: null,
    });
  }
  const deletedTweet = tweetsDB[indexOfTweet];
  tweetsDB.splice(indexOfTweet, 1);
  return res.json({
    message: "Tweet deleted",
    tweet: deletedTweet,
  });
});

export default router;

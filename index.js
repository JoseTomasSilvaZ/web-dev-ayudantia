import express from "express";
import postsRouter from "./routes/posts.routes.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

app.use("/api/v1", postsRouter);

app.listen(3000, () => {
  console.log(`Server listening on port 3000 🚀`);
});

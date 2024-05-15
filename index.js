import express from "express";
import handlebars from "express-handlebars";
import "./db/db.js";
import tweetRoutes from "./routes/tweet.routes.js";
import tweetViewerRoutes from "./routes/tweet-viewer.routes.js";
const PORT = 3000;
const app = express();
app.use(express.json());
app.engine(
  "handlebars",
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      formatDate: (date) => {
        return new Date(date).toLocaleDateString();
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

/* Healthcheck */
app.get("/healthcheck", (req, res) => {
  return res.json({
    ok: true,
  });
});
app.use(tweetViewerRoutes);
app.use("/api/v1/", tweetRoutes);

app.use(express.static("public"));
app.listen(3000, () => console.log("Express listening on 3000"));

import express from "express";
import handlebars from "express-handlebars";
import authRouter from "./routes/auth.routes.js";
import authViewsRouter from "./routes/auth-views.routes.js";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/auth.js";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine(
  "handlebars",
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
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

app.use(authViewsRouter);
app.use("/api/v1", authRouter);
app.use(express.static("public"));
app.listen(3000, () => console.log("Express listening on 3000"));

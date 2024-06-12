import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";
import "./db/db.js";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1", productsRoutes);

/* Healthcheck */
app.get("/healthcheck", (req, res) => {
  return res.json({
    ok: true,
  });
});

app.listen(3000, () => console.log("Express listening on 3000"));

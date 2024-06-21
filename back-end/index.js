import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import cors from "cors";
import "./db/db.js";

const PORT = 3001;
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", walletRoutes);

/* Healthcheck */
app.get("/healthcheck", (req, res) => {
  return res.json({
    ok: true,
  });
});

app.listen(PORT, () => console.log("Express listening on 3001"));

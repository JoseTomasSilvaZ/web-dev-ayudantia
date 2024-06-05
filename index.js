import express from "express";
import handlebars from "express-handlebars";
import authRouter from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import cookieParser from "cookie-parser";
import adminRoutes from './routes/administration.routes.js'
import shopRoutes from './routes/shop.routes.js'
import cartRoutes from './routes/cart.routes.js'
import "./db/db.js";
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
app.use(express.static("public"));

/* Healthcheck */
app.get("/healthcheck", (req, res) => {
  return res.json({
    ok: true,
  });
});

app.use(authRouter);
app.use(productRoutes);
app.use(adminRoutes)
app.use(shopRoutes)
app.use(cartRoutes)
app.listen(3000, () => console.log("Express listening on 3000"));

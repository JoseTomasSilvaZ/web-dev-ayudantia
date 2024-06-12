import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user";
import cartModel from "../models/cart";

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("sign-in", { layout: "auth", error: "Bad request" });
  }
  const dbUser = await userModel.findOne({ email });
  if (!dbUser) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  if (!bcrypt.compareSync(password, dbUser.password)) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign({ id: dbUser.id }, "secret", {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return res.json({
    ok: true,
  });
});

router.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Bad request",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const userCart = new cartModel({
    user: newUser._id,
    products: [],
  });
  await userCart.save();

  return res.json({
    ok: true,
  });
});

router.post("/auth/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({
    ok: true,
  });
});

export default router;

import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import cartModel from "../models/cart.js";

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      message: "Bad request",
    });
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
    secure: true,
    sameSite: "none",
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

router.get("/auth/me", (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  jwt.verify(token, "secret", async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const user = await userModel.findById(decoded.id);
    return res.json({
      user,
    });
  });
});

export default router;

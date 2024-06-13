import { Router } from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import cartModel from "../models/cart.js";

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({
      message: "Bad Request",
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
      user: {
        name: user.name,
        email: user.email,
      },
    });
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

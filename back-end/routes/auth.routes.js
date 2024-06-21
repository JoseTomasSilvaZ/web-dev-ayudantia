import { Router } from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cartModel from "../models/cart.js";
import walletModel from "../models/wallet.js";

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Bad Request",
      success: false,
    });
  }

  const dbUser = await userModel.findOne({ email });

  if (!dbUser) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
    });
  }

  if (!bcrypt.compareSync(password, dbUser.password)) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
    });
  }

  const token = jwt.sign({ id: dbUser.id, role: dbUser.isAdmin }, "secret", {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return res.json({
    success: true,
    jwt: token,
  });
});

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({
      email,
      password: hashedPassword,
      name,
    });
    await newUser.save();
    const userCart = new cartModel({
      user: newUser._id,
      products: [],
    });
    await userCart.save();

    const wallet = new walletModel({
      user: newUser._id,
      balance: 0,
    });

    await wallet.save();

    return res.json({
      success: true,
    });
  } catch (error) {
    if (error.errorResponse.code === 11000) {
      return res.status(400).json({
        message: "Email already in use",
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
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

export default router;

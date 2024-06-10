import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import cartModel from "../models/cart.js";
const router = Router();

router.post("/auth/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("sign-in", { layout: "auth", error: "Bad request" });
  }
  const dbUser = await userModel.findOne({ email });
  if (!dbUser) {
    return res.render("sign-in", {
      layout: "auth",
      error: "Invalid credentials",
    });
  }
  if (!bcrypt.compareSync(password, dbUser.password)) {
    return res.render("sign-in", {
      layout: "auth",
      error: "Invalid credentials",
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
  return res.redirect("/shop");
});

router.post("/auth/sign-up", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.render("sign-up", { layout: "auth", error: "Bad request" });
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
    })
    await userCart.save()
    return res.redirect("/auth/sign-in");
  } catch (error) {
    console.log(error);
  }
});

router.get("/auth/sign-in", (req, res) => {
  res.render("sign-in", { layout: "auth" });
});

router.get('/auth/sign-up', (req, res) => {
  res.render('sign-up', { layout: 'auth' });
})

router.post("/auth/sign-out", (req, res) => {
  res.clearCookie("token");
  return res.json({
    ok: true,
  });
});

export default router;

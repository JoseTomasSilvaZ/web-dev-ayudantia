import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import userModel from "../models/user.js";
const router = Router();

router.get("/profile", authenticate, async (req, res) => {
  console.log(req.user);
  const user = await userModel.findById({ _id: req.user.id });
  console.log(user);
  res.render("profile", { layout: "auth", user });
});

export default router;

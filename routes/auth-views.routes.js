import { Router } from "express";
const router = Router();

router.get("/auth/sign-in", (req, res) => {
  res.render("sign-in");
});

export default router;

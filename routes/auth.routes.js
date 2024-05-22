import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();

router.post("/auth/sign-in", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Bad Request" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  console.log(req.body);
  const dbUser = {
    id: 1,
    email: "email@gmail.com",
    name: "tomas",
    password: "123123",
  };
  if (!bcrypt.compareSync(password, dbUser.password)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = jwt.sign({ id: dbUser.id }, "secret", {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
  return res.json({ token });
});

export default router;

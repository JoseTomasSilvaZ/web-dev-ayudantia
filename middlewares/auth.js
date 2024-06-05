import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/sign-in')
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.redirect('/auth/sign-in')
      return;
    }
    req.user = decoded;
    next();
  });
};
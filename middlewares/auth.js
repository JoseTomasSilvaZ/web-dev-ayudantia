import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    req.user = decoded;
    next();
  });
};

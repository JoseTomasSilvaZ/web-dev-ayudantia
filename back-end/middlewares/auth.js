import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Cookie not found",
    });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
      });
    }
    req.user = decoded;
    next();
  });
};

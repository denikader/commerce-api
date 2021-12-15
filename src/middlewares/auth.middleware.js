import jwt from "jsonwebtoken";

export function isAuth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
  } catch (error) {
    return res.ststus(401).json({ error: "not authorization" });
  }
  next();
}

export function isAdmin(req, res, next) {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    if (!user.isAdmin) {
      return res.status(401).json({ error: "not authorization" });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).json({ error: "not authorization" });
  }
  next();
}

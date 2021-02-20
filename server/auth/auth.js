import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("auth_token");
  console.log(token)

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified)
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

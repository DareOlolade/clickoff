const jwt = require("jsonwebtoken");
const User = require("../models/User")

const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ message: "unauthorised" });
  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "unauthorised" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password")
    req.user = user
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorised" });
  }
}
module.exports = protect;

const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_secret_key";

exports.auth = async (req, res, next) => {
  const authHeader = req.headers["token"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      console.log(req.user, "is user");
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

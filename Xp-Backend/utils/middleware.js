const jwt = require("jsonwebtoken");
const { encodeKey } = require("./token");

const extractToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, encodeKey);
      req.user = decodedToken.user;
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return res.status(401).json({ data: "Invalid token", success: false });
    }
  } else {
    return res.status(401).json({ data: "Unauthorized", success: false });
  }

  next();
};

module.exports = extractToken;

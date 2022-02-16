const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const authtoken = req.headers["authorization"];
  const token = authtoken && authtoken.split(" ");

  if (!token || !token.length) {
    return res.status(401).json({ error: "UnAuthenticated" });
  }

  if (token[0] !== "JWT") {
    return res.status(401).json({ error: "UnAuthenticated" });
  }

  if (!token[1]) {
    return res.status(401).json({ error: "UnAuthenticated" });
  }

  try {
    const verifiedUser = jwt.verify(token[1], process.env.secret);
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(403).json({ error: "InValid Token" });
  }
};

module.exports = auth;
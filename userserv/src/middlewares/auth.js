const Jwt = require("../tokens/Jwt");

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
    const decoded = JSON.parse(atob(token[1].split(".")[1]));
    if (!decoded) {
			console.log(decoded);
      return res.status(403).json({ error: "InValid Token" });
    }

    const { success, error } = Jwt.checkValidToken(decoded);
    if (error) {
      return res.status(403).json({ error });
    } else if (success) {
      next();
    }
  } catch (err) {
    return res.status(403).json({ error: "InValid Token" });
  }
};

module.exports = auth;

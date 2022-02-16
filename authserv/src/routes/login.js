const loginroutes = require("express").Router();
const jwt = require("jsonwebtoken");
const generatedId = require("../utils/generateId");
require("dotenv").config();

(async () => {
  loginroutes.post("/login", async (req, res) => {
    const usedpassword = "Test@123";
    const usedusername = "admin@mksoft.com";
    const { username, password } = req.body;
    if (!username) {
      return res.status(422).json({ error: "username is required" });
    } else if (!password) {
      return res.status(422).json({ error: "password is required" });
    }
    if (username !== usedusername || password !== usedpassword) {
      return res
        .status(422)
        .json({ error: "username and password is invalid" });
    }
    const refreshTokenId = generatedId();
    const token = jwt.sign(
      { username, reId: refreshTokenId },
      process.env["secret"],
      {
        expiresIn: "10m",
        algorithm: "HS256",
      }
    );
    const refreshtoken = jwt.sign(
      { username, reId: refreshTokenId },
      process.env["refreshsecret"],
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );
    const refreshTokenArr = refreshtoken.split('.'); 
    refreshTokenArr[1] = btoa(refreshTokenArr[1] + refreshTokenId);

    res.json({
      success: true,
      access_token: token,
      refresh_token: btoa(refreshTokenArr.join('.')),
    });
  });
})();

module.exports = loginroutes;

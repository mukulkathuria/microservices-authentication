const refreshtokenroutes = require("express").Router();
const jwt = require("jsonwebtoken");
const Jwt = require("../tokens/Jwt");

(() => {
  refreshtokenroutes.post("/refreshtoken", async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(422).json({ error: "Required Token" });
    }

    const tokenarr = atob(refresh_token).split(".");

    if (tokenarr.length < 3) {
      return res.status(422).json({ error: "Invalid Token" });
    }

    try {
      tokenarr[1] = atob(tokenarr[1]).slice(0, -5);
      const verfied = jwt.verify(
        tokenarr.join("."),
        process.env["refreshsecret"]
      );
      if (verfied) {
        const { error } = Jwt.checkValidToken(verfied);
        if (error) {
					return res.status(422).json({ error: 'token expired' })
        } else {
          const token = jwt.sign(
            { username: verfied.username, reId: verfied.reId },
            process.env["secret"],
            {
              expiresIn: "10m",
              algorithm: "HS256",
            }
          );
          res.json({ success: true, access_token: token });
        }
      }
    } catch (error) {
      return res.status(422).json({ error: "Invalid Token" });
    }
  });
})();

module.exports = refreshtokenroutes;

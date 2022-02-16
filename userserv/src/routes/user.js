const userroutes = require("express").Router();
const auth = require("../middlewares/auth");

(async () => {
  userroutes.get("/user", auth ,(req, res) => {
    res.json({
			success: true,
      user_details: {
        user: "Mukul",
        age: 23,
      },
    });
  });
})();

module.exports = userroutes;

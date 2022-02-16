const logoutroutes = require("express").Router();
const { sendKafkaMsg } = require("../controllers/kafkaProducer");
const auth = require("../middleware/auth");
const Jwt = require("../tokens/Jwt");

(() => {
  logoutroutes.post("/logout", auth, async (req, res) => {
    try {
      Jwt.addExpireTokens(req.user.reId, JSON.stringify(req.user));
      await sendKafkaMsg("testkafkatopic", {
        key: req.user.reId,
        value: JSON.stringify(req.user),
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
})();

module.exports = logoutroutes;

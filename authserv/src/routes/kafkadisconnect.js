const kafkaroutes = require("express").Router();
const { disconnectKafka } = require("../controllers/kafkaProducer");


(() => {
  kafkaroutes.get("/disconnect", async (req, res) => {
    try {
      await disconnectKafka();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
})();

module.exports = kafkaroutes;

const express = require("express");
const { KafkaProducerInit } = require("./controllers/kafkaProducer");
const kafkaroutes = require("./routes/kafkadisconnect");
const loginroutes = require("./routes/login");
const logoutroutes = require("./routes/logout");
const refreshtokenroutes = require("./routes/refreshtoken");
require("dotenv").config();

(async () => {
  try {
    const app = await express();
    const PORT = process.env["PORT"];
    if (!PORT) {
      throw Error("Undefined PORT");
    }
    await KafkaProducerInit();
    app.use(express.json());
    app.use("/auth", loginroutes);
    app.use("/auth", logoutroutes);
    app.use("/auth", kafkaroutes);
    app.use("/auth", refreshtokenroutes);

    await app.listen(PORT);
    console.log(`Server is running on port:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
})();

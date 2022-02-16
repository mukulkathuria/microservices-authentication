const express = require("express");
const {
  KafkaConsumerInit,
  getKafkaMsgs,
} = require("./controllers/kafkaConsumer");
const userroutes = require("./routes/user");
const Jwt = require("./tokens/Jwt");
require("dotenv").config();

(async () => {
  try {
    const app = await express();
    await KafkaConsumerInit();
    const PORT = process.env["PORT"];
    if (!PORT) {
      throw Error("Undefined PORT");
    }
    app.use(express.json());
    app.use("/api", userroutes);

    await app.listen(PORT);
    console.log(`Server is running on port:${PORT}`);

    await getKafkaMsgs("testkafkatopic", (message) => {
      const values = {
        key: message.key.toString(),
        value: message.value.toString(),
      };
      Jwt.addExpireTokens(values.key, values.value);
    });
  } catch (err) {
    console.log(err.message);
  }
})();

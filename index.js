const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost/spending-db", { useNewUrlParser: true });

app.use(bodyParser.json());
app.use("/api", require("./api"));

app.listen(4000, () => {
  console.log("server is listening");
});

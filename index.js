const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const url = "mongodb://localhost:27017/blogDb";

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes);

  app.listen(8000, () => {
    console.log("Server Connected and App Is Running.....");
  });
});

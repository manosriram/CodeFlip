const express = require("express");
const app = express();
const db = require("./DB");
const cookieparser = require("cookie-parser");
const path = require("path");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

app.use(express.json());
app.use(cookieparser());
app.use("/auth", require("./Routes/Auth"));
app.use("/card", require("./Routes/Card"));
app.use(express.static(__dirname + "/public"));

const Port = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(Port, () => console.log(`Server at ${Port}`));

module.exports = app;

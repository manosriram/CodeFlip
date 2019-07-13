const express = require("express");
const app = express();
const db = require("./DB");

app.use(express.json());
app.use("/auth", require("./Routes/Auth"));

const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`Server at ${Port}`));

module.exports = app;

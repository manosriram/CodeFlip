const express = require("express");
const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use("/auth", require("./Routes/Auth"));

app.listen(Port, () => console.log(`Server at ${Port}`));

module.exports = app;

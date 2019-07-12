const express = require("express");
const app = express();
const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`Server at ${Port}`));

module.exports = app;

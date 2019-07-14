const express = require("express");
const app = express();
require("./DB");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());
app.use("/auth", require("./Routes/Auth"));
app.use("/card", require("./Routes/Card"));
app.use(express.static(__dirname + "/public"));

const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`Server at ${Port}`));

module.exports = app;

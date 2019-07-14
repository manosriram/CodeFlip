const express = require("express");
const router = express.Router();
const db = require("../DB");

const validateEmail = email => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

router.post("/register", (req, res) => {
  let { username, email, password } = req.body.userData;

  if (!email || !validateEmail(email))
    return res.json({ success: false, message: "Not a valid email" });

  if (!password || password.length < 3)
    return res.json({ success: false, message: "Password too short." });

  if (!username || username.length < 3)
    return res.json({ success: false, message: "Username too short." });

  let vls = {
    username: `${username}`,
    email: `${email}`,
    password: `${password}`
  };
  let qry = "INSERT INTO USER SET ?";

  db.query(qry, vls, (err, rest) => {
    if (!err) {
      return res.json({
        success: true,
        message: "User succesfully Registered."
      });
    } else {
      if (err.sqlState === 23000) {
        return res.json({
          success: false,
          message: "User Already Registered."
        });
      }
    }
  });
});

module.exports = router;

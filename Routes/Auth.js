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

  const det = { username: username, email: email, password: password };
  let qry = "INSERT INTO USER(username, email, password) VALUES(?, ?, ?))";
  db.query(qry, det, (err, rest) => {
    if (!err) {
      return res.json({
        success: true,
        message: "User succesfully Registered."
      });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

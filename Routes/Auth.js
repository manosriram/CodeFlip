const express = require("express");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const knex = require("../Database/knex");

const validateEmail = email => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

router.get("/getUserInfo", (req, res) => {
  jsonwt.verify(req.cookies.scTk, "sec1234", (err, user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      return res.json({ success: true, user });
    }
  });
});

router.get("/isLoggedIn", (req, res) => {
  jsonwt.verify(req.cookies.scTk, "sec1234", (err, user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      return res.json({ success: true });
    }
  });
});

router.post("/register", (req, res) => {
  let { username, email, password } = req.body.userData;

  if (!email || !validateEmail(email))
    return res.json({ success: false, message: "Not a valid email" });

  if (!password || password.length <= 3)
    return res.json({ success: false, message: "Password too short." });

  if (!username || username.length <= 3)
    return res.json({ success: false, message: "Username too short." });

  let vls = {
    username: `${username}`,
    email: `${email}`,
    password: `${password}`
  };

  knex("user")
    .insert(vls)
    .then(resp => {
      return res.json({ success: true, message: "User Registered !" });
    })
    .catch(err => {
      if (err.code === "ER_DUP_ENTRY") {
        return res.json({
          success: false,
          message: "User already Registered."
        });
      }
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body.userData;

  if (req.cookies.scTk)
    return res.json({ success: false, message: "User already logged-in" });
  if (!email)
    return res.json({ success: false, message: "Not a Valid Email." });

  if (!password)
    return res.json({ success: false, message: "Not a Valid Password" });

  if (password.length <= 3)
    return res.json({ success: false, message: "Password Too Short !" });

  let vls = {
    email: `${email}`,
    password: `${password}`
  };

  let qry = `SELECT * FROM user WHERE EMAIL = '${email}' AND PASSWORD = '${password}'`;

  knex
    .raw(qry)
    .then(rest => {
      if (rest[0][0]) {
        var payload = {
          username: rest[0][0].USERNAME,
          email: rest[0][0].EMAIL
        };
        jsonwt.sign(
          payload,
          "sec1234",
          { expiresIn: 90000000 },
          (err, token) => {
            res.cookie("scTk", token, { maxAge: 90000000 });
            return res.json({ success: true, message: "Logged In" });
          }
        );
      }
      if (!rest[0]) {
        return res.json({ success: false, message: "No User Found." });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;

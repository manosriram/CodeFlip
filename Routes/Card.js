const express = require("express");
const router = express.Router();
const db = require("../DB");
const jsonwt = require("jsonwebtoken");

router.get("/showCards", (req, res) => {
  jsonwt.verify(req.cookies.scTk, "sec1234", (err, user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      const email = user.email;

      let qry =
        "SELECT CARD.TITLE, CARD.CODE FROM CARD INNER JOIN USER ON CARD.CREATED_BY = '" +
        email +
        "'";

      db.query(qry, (err, rest) => {
        if (!err) {
          return res.json({ success: true, rest });
        } else {
          console.log(err);
          return res.json({
            success: false,
            message: "Error Occured !",
            statusCode: err.code
          });
        }
      });
    }
  });
});

router.post("/addCard", (req, res) => {
  const userEmail = req.body.userData.user.email;
  const { code, title, language } = req.body.cardData;
  if (!code || !title)
    return res.json({ success: false, message: "Fill all fields" });

  let vls = {
    title: `${title}`,
    code: `${code}`,
    created_by: `${userEmail}`,
    language: `${language}`
  };

  let qry = "INSERT INTO CARD SET ?";

  db.query(qry, vls, (err, rest) => {
    if (!err) {
      return res.json({
        success: true,
        message: "Card Added !"
      });
    } else {
      console.log(err);
      return res.json({
        success: false,
        message: "Error Occured."
      });
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const knex = require("../Database/knex");

router.get("/editCard", (req, res) => {});

router.get("/showCards", (req, res) => {
  jsonwt.verify(req.cookies.scTk, "sec1234", (err, user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      const email = user.email;

      let qry =
        "SELECT CARD.TITLE, CARD.CODE FROM CARD INNER JOIN userschema ON CARD.CREATED_BY = '" +
        email +
        "'";

      knex
        .raw(qry)
        .then(rest => {
          const cards = rest[0].filter((card, cardIndex) => {
            return cardIndex < rest[0].length / 2;
          });
          return res.json({ success: true, rest: cards });
        })
        .catch(err => console.log(err));
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

  knex("userschema")
    .insert(vls)
    .then(console.log("Inserted !"))
    .catch(err => {
      console.log(err);
      return res.json({ success: false, message: "Error Occured !" });
    });

  return res.json({ success: true, message: "Card Added." });
});

module.exports = router;

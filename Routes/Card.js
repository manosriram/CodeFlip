const express = require("express");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const knex = require("../Database/knex");

router.get("/showCards", (req, res) => {
  jsonwt.verify(req.cookies.scTk, "sec1234", (err, user) => {
    if (!user) {
      return res.json({ success: false });
    } else {
      const email = user.email;

      let qry = `SELECT card.title, card.code, card.language FROM card WHERE card.created_by = ${email}`;

      // let qry =
      //   "SELECT card.title, card.code, card.language FROM card INNER JOIN userschema ON card.created_by = '" +
      //   email +
      //   "'";

      knex
        .raw(qry)
        .then(rest => {
          console.log(rest.rows);
          console.log(
            "-----------------------------------------------------------------"
          );
          console.log(rest);
          return res.json({ success: true, rest: rest.rows });
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

  knex("card")
    .insert(vls)
    .then(() => {
      console.log(`Card Inserted by ${userEmail}`);
      return res.json({ success: true, message: "Card Added." });
    })
    .catch(err => {
      return res.json({ success: false, message: "Error Occured !" });
    });
});

module.exports = router;

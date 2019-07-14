const express = require("express");
const router = express.Router();
const db = require("../DB");

router.post("/addCard", (req, res) => {
  const userEmail = req.body.userData.user.email;
  const { code, title } = req.body.cardData;
  if (!code || !title)
    return res.json({ success: false, message: "Fill all fields" });

  let vls = {
    title: `${title}`,
    code: `${code}`,
    created_by: `${userEmail}`
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

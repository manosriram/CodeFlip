const mysql = require("mysql");

const db = mysql.createConnection({
  host: "ec2-23-21-177-102.compute-1.amazonaws.com",
  user: "czlzitibxhsqad",
  password: "debfc3a696bbd7155fc38a1b7d60bb218d0cb8c25951687243350d03ef014d45",
  database: "d6h777og4vt21l"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Database Connected.");
});

module.exports = db;

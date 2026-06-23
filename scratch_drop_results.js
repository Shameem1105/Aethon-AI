const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost", user: "root", password: "", database: "portfolio"
});

db.connect(err => {
  if (err) { console.error(err); process.exit(1); }

  db.query("DROP TABLE IF EXISTS results", (err) => {
    if (err) console.error(err);
    console.log("Successfully dropped results table.");
    process.exit(0);
  });
});

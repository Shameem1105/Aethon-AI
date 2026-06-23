const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost", user: "root", password: "", database: "portfolio"
});

db.connect(err => {
  if (err) { console.error(err); process.exit(1); }
  db.query("DESCRIBE student_answers", (err, res1) => {
    db.query("DESCRIBE student_results", (err, res2) => {
      db.query("DESCRIBE results", (err, res3) => {
        console.log("student_answers", res1);
        console.log("student_results", res2);
        console.log("results", res3);
        process.exit(0);
      });
    });
  });
});

const db = require("./db");
const bcrypt = require("bcrypt");

async function run() {
  const studentHash = await bcrypt.hash("shameem123", 10);
  const adminHash = await bcrypt.hash("password123", 10);

  db.query("UPDATE users SET password = ? WHERE email = ?", [studentHash, "shameem123@gmail.com"], (err) => {
    if (err) console.error(err);
    console.log("Updated shameem123@gmail.com password to shameem123");

    db.query("UPDATE admin_users SET password = ? WHERE email = ?", [adminHash, "laxman123@gmail.com"], (err) => {
      if (err) console.error(err);
      console.log("Updated admin laxman123@gmail.com password to password123");
      process.exit(0);
    });
  });
}

run();

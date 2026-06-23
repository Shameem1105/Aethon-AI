const db = require("./db");

db.query("SELECT * FROM users", (err, users) => {
  if (err) console.error(err);
  console.log("Users:", users);

  db.query("SELECT * FROM admin_users", (err, admins) => {
    if (err) console.error(err);
    console.log("Admins:", admins);
    process.exit(0);
  });
});

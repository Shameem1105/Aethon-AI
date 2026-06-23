const db = require('./db');
const fs = require('fs');

db.query('SHOW TABLES', async (err, tables) => {
  if (err) throw err;
  let schema = '';
  for (let i = 0; i < tables.length; i++) {
    const tableName = Object.values(tables[i])[0];
    const createTableStmt = await new Promise((res, rej) => {
      db.query(`SHOW CREATE TABLE ${tableName}`, (e, result) => {
        if (e) rej(e);
        else res(result[0]['Create Table']);
      });
    });
    schema += createTableStmt + ';\n\n';
  }
  fs.writeFileSync('schema.sql', schema);
  console.log('Schema saved to schema.sql');
  process.exit(0);
});

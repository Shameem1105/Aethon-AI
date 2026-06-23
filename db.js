const mysql = require("mysql2");
require("dotenv").config(); // Load .env for DB connections

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio",
  ssl: process.env.DB_HOST && process.env.DB_HOST.includes("planetscale") 
        ? { rejectUnauthorized: true } 
        : false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL Pool Connected");

module.exports = db;
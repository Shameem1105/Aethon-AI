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

// Helper to run column migrations automatically
function addColumnIfNotExists(table, column, definition) {
  db.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, (err) => {
    if (err) {
      if (err.code === 'ER_DUP_FIELDNAME' || err.message.includes("Duplicate column")) {
        // Column already exists, safe to ignore
      } else {
        console.error(`Error adding column ${column} to ${table}:`, err);
      }
    } else {
      console.log(`Column ${column} added to table ${table}`);
    }
  });
}

addColumnIfNotExists('assigned_students', 'auto_submitted', 'TINYINT(1) DEFAULT 0 AFTER submitted');
addColumnIfNotExists('student_results', 'auto_submitted', 'TINYINT(1) DEFAULT 0 AFTER score');

// Create student_answers table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS student_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assessment_id INT NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    question_id INT NOT NULL,
    selected_option VARCHAR(255) DEFAULT NULL,
    code_submitted TEXT DEFAULT NULL,
    is_correct TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_student_question (assessment_id, student_email, question_id),
    CONSTRAINT fk_answers_assessment FOREIGN KEY (assessment_id) REFERENCES assessments (id) ON DELETE CASCADE,
    CONSTRAINT fk_answers_question FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
`, (err) => {
  if (err) console.error("Error creating student_answers table:", err);
  else {
    console.log("student_answers table verified/created.");
    
    // Make assessment 60 live and reset submitted status
    console.log("Running automatic database updates on startup for assessment 60...");
    db.query(`
      UPDATE assessments 
      SET start_time = NOW(), 
          end_time = DATE_ADD(NOW(), INTERVAL 24 HOUR) 
      WHERE id = 60
    `, (errUpdate) => {
      if (errUpdate) console.error("Error updating assessment times:", errUpdate);
      else console.log("Assessment 60 start/end times updated successfully.");
    });

    db.query("DELETE FROM student_results WHERE assessment_id = 60 AND student_email = 'shameem123@gmail.com'", (errDel) => {
      if (errDel) console.error("Error cleaning student_results:", errDel);
    });

    db.query("DELETE FROM student_answers WHERE assessment_id = 60 AND student_email = 'shameem123@gmail.com'", (errDel2) => {
      if (errDel2) console.error("Error cleaning student_answers:", errDel2);
    });

    db.query("UPDATE assigned_students SET submitted = 0, auto_submitted = 0 WHERE assessment_id = 60 AND student_email = 'shameem123@gmail.com'", (errReset) => {
      if (errReset) console.error("Error resetting assigned_students status:", errReset);
      else console.log("Reset submission status for shameem123@gmail.com successfully.");
    });
  }
});

module.exports = db;
const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS student_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT,
  student_email VARCHAR(255),
  question_id INT,
  answer_text TEXT,
  score INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_answer (assessment_id, student_email, question_id)
);
`;

db.query(sql, (err) => {
  if (err) console.error(err);
  else console.log("student_answers table created successfully");
  process.exit(err ? 1 : 0);
});

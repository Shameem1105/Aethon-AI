const db = require('./db');

const q1 = "CREATE TABLE IF NOT EXISTS admin_chat_sessions (id INT AUTO_INCREMENT PRIMARY KEY, admin_email VARCHAR(255) NOT NULL, title VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (admin_email) REFERENCES admin_users(email) ON DELETE CASCADE);";

const q2 = "CREATE TABLE IF NOT EXISTS admin_chat_messages (id INT AUTO_INCREMENT PRIMARY KEY, session_id INT NOT NULL, role ENUM('user', 'assistant') NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (session_id) REFERENCES admin_chat_sessions(id) ON DELETE CASCADE);";

db.query(q1, (e1) => {
    if (e1) {
        console.error("Error creating sessions table:", e1);
        process.exit(1);
    }
    db.query(q2, (e2) => {
        if (e2) {
            console.error("Error creating messages table:", e2);
            process.exit(1);
        }
        console.log("Chat history tables created successfully");
        process.exit(0);
    });
});

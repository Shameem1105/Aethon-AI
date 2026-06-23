import { useState } from "react";

function ContentPanel({ question, hideTitle }) {
  const [bookmarked, setBookmarked] = useState(false);

  if (!question) {
    return (
      <div className="panel-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <i className="ri-loader-4-line ri-spin" style={{ fontSize: "28px", color: "var(--primary-light)" }}></i>
          <span>Loading question details...</span>
        </div>
      </div>
    );
  }

  // Determine badges dynamically
  const difficulty = question.difficulty || "Medium";
  const points = question.marks || 10;
  const category = question.question_type === "coding" ? "Coding" : "Objective";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%", paddingBottom: "40px" }}>
      
      {/* BADGES & BOOKMARK ROW */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="desc-badge-row">
          <span className="desc-badge orange">{difficulty}</span>
          <span className="desc-badge blue">{category}</span>
          <span className="desc-badge grey">{points} Points</span>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          style={{ background: "transparent", border: "none", color: bookmarked ? "var(--yellow)" : "var(--text-muted)", cursor: "pointer", fontSize: "18px" }}
          title={bookmarked ? "Bookmarked" : "Bookmark Question"}
        >
          <i className={bookmarked ? "ri-bookmark-fill" : "ri-bookmark-line"}></i>
        </button>
      </div>

      {/* HEADING TITLE */}
      {!hideTitle && (
        <h1 style={{ color: "var(--white)", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>
          {question.question_title}
        </h1>
      )}

      {/* DETAILED TEXT DESCRIPTION */}
      <div style={{ color: "#c5c9db", fontSize: "14px", lineHeight: "1.7", whiteSpace: "pre-line" }}>
        {question.question_text}
      </div>

      {/* REQUIREMENTS CARD */}
      <div className="desc-section-card">
        <div className="desc-section-title green">
          <i className="ri-checkbox-circle-fill"></i>
          Requirements
        </div>
        <ul className="desc-list">
          <li>Ensure the solution covers edge cases like empty bounds or negative inputs.</li>
          <li>Code must compile and run successfully within standard compiler limits.</li>
          <li>Solution should prioritize modular logic and readability.</li>
        </ul>
      </div>

      {/* CONSTRAINTS CARD */}
      <div className="desc-section-card">
        <div className="desc-section-title yellow">
          <i className="ri-error-warning-fill"></i>
          Constraints
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="desc-constraint-row">
            <span className="desc-constraint-label">Time Limit</span>
            <span className="desc-constraint-val">1500ms</span>
          </div>
          <div className="desc-constraint-row">
            <span className="desc-constraint-label">Memory Limit</span>
            <span className="desc-constraint-val">256 MB</span>
          </div>
          <div className="desc-constraint-row">
            <span className="desc-constraint-label">Supported Languages</span>
            <span className="desc-constraint-val">Python, Java, C++, JS</span>
          </div>
        </div>
      </div>

      {/* SAMPLE TEST CASE Monospace terminal */}
      {question.sample_input && (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px", color: "var(--white)", display: "flex", alignItems: "center", gap: "8px" }}>
            <i className="ri-terminal-box-line" style={{ color: "var(--primary-light)", fontSize: "16px" }}></i>
            Sample Test Case
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Input Block */}
            <div className="terminal-block">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: "var(--blue)" }}></div>
                <span className="terminal-title">Sample Input</span>
              </div>
              <pre className="terminal-content">{question.sample_input}</pre>
            </div>

            {/* Output Block */}
            <div className="terminal-block">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: "var(--green)" }}></div>
                <span className="terminal-title">Expected Output</span>
              </div>
              <pre className="terminal-content" style={{ color: "var(--green)" }}>{question.sample_output}</pre>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM STATUS ROW */}
      <div className="desc-footer-status">
        <div className="status-online-pill">
          <div className="status-online-dot"></div>
          Online proctored
        </div>
        <div className="status-media-buttons">
          <div className="status-media-btn active" title="Microphone Active">
            <i className="ri-mic-fill"></i>
          </div>
          <div className="status-media-btn active" title="Webcam Active">
            <i className="ri-webcam-fill"></i>
          </div>
          <div className="status-media-btn" title="View Keyboard Shortcuts">
            <i className="ri-keyboard-line"></i>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContentPanel;
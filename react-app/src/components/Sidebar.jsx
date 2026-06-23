function Sidebar({
  questions = [],
  selected,
  setSelected,
  answers = {},
  flaggedQuestions = [],
  toggleFlagQuestion,
  clearAnswer,
  submittedCodingQuestions = []
}) {
  const totalCount = questions.length;
  const answeredCount = questions.filter((q) => {
    if (q.question_type === "coding") {
      return submittedCodingQuestions.includes(q.id);
    }
    return answers && answers[q.id] !== undefined && answers[q.id] !== "";
  }).length;
  const remainingCount = totalCount - answeredCount;
  const flaggedCount = flaggedQuestions.length;

  const pct = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;
  const strokeDashoffset = 150.796 - (pct / 100) * 150.796;

  const isCurrentFlagged = selected && flaggedQuestions.includes(selected.id);

  return (
    <div className="sidebar-wrapper" style={{ display: "flex", flexDirection: "column", gap: "24px", height: "100%" }}>
      
      {/* ASSESSMENT OVERVIEW */}
      <div>
        <h3 className="sidebar-title">Assessment Overview</h3>
        <div className="progress-widget">
          <div className="progress-ring-box">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                className="progress-ring-circle"
                cx="30"
                cy="30"
                r="24"
                stroke="var(--primary)"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="150.796"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="progress-text-center">{pct}%</div>
          </div>

          <div className="progress-stats-table">
            <div className="progress-stat-row">
              <span className="progress-stat-label">Total</span>
              <span className="progress-stat-val">{totalCount}</span>
            </div>
            <div className="progress-stat-row">
              <span className="progress-stat-label">Answered</span>
              <span className="progress-stat-val" style={{ color: "var(--green)" }}>{answeredCount}</span>
            </div>
            <div className="progress-stat-row">
              <span className="progress-stat-label">Remaining</span>
              <span className="progress-stat-val">{remainingCount}</span>
            </div>
            <div className="progress-stat-row">
              <span className="progress-stat-label">Flagged</span>
              <span className="progress-stat-val" style={{ color: "var(--yellow)" }}>{flaggedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUESTION NAVIGATOR */}
      <div>
        <h3 className="sidebar-title">Question Navigator</h3>
        <div className="navigator-grid">
          {questions.map((q, idx) => {
             const isSelected = selected && selected.id === q.id;
             const isAnswered = q.question_type === "coding"
               ? submittedCodingQuestions.includes(q.id)
               : (answers && answers[q.id] !== undefined && answers[q.id] !== "");
             const isFlagged = flaggedQuestions.includes(q.id);

             let btnClass = "nav-circle-btn";
             if (isSelected) btnClass += " current";
             else if (isAnswered) btnClass += " answered";
             if (isFlagged) btnClass += " flagged";

             return (
               <button
                 key={q.id}
                 className={btnClass}
                 onClick={() => setSelected && setSelected(q)}
                 title={q.question_title}
               >
                 {idx + 1}
               </button>
             );
           })}
        </div>

        {/* Legend */}
        <div className="navigator-legend">
          <div className="legend-item">
            <div className="legend-dot current" />
            <span>Current</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot answered" />
            <span>Answered</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot unvisited" />
            <span>Unvisited</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot flagged" />
            <span>Flagged</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="sidebar-actions">
        <button
          className={`action-outline-btn ${isCurrentFlagged ? "active" : ""}`}
          onClick={() => selected && toggleFlagQuestion && toggleFlagQuestion(selected.id)}
        >
          <i className={isCurrentFlagged ? "ri-flag-fill" : "ri-flag-line"}></i>
          {isCurrentFlagged ? "Unflag Review" : "Flag for Review"}
        </button>

        <button
          className="action-outline-btn"
          onClick={() => selected && clearAnswer && clearAnswer(selected.id)}
        >
          <i className="ri-close-circle-line"></i>
          Clear Answer
        </button>

        <button
          className="action-outline-btn"
          onClick={() => alert("Feedback logs logged to test server.")}
        >
          <i className="ri-alert-line"></i>
          Report Issue
        </button>
      </div>

    </div>
  );
}

export default Sidebar;
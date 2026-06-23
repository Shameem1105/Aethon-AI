function MCQView({ question, answers, setAnswers }) {
  if (!question) {
    return (
      <div className="mcq-container">
        <div className="mcq-header-tab">
          <i className="ri-list-check" style={{ marginRight: "8px", fontSize: "16px" }}></i>
          Multiple Choice Selection
        </div>
        <div style={{ padding: "24px", color: "var(--text-muted)", fontSize: "14px" }}>
          Loading options...
        </div>
      </div>
    );
  }

  const selectedOption = answers && question ? answers[question.id] || "" : "";

  const handleOptionClick = (opt) => {
    if (setAnswers && question) {
      setAnswers(prev => ({ ...prev, [question.id]: opt }));
    }
  };

  const options = [
    question.option_a,
    question.option_b,
    question.option_c,
    question.option_d
  ].filter(Boolean);

  return (
    <div className="mcq-container">
      {/* MCQ HEADER */}
      <div className="mcq-header-tab">
        <i className="ri-list-check" style={{ marginRight: "8px", fontSize: "16px" }}></i>
        Multiple Choice Selection
      </div>

      {/* OPTIONS LIST */}
      <div className="mcq-options-scroll">
        {options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = selectedOption === opt;
          return (
            <div
              key={i}
              className={`mcq-option-card ${isSelected ? "selected" : ""}`}
              onClick={() => handleOptionClick(opt)}
            >
              <div className="mcq-option-letter">{letter}</div>
              <div className="mcq-option-text">{opt}</div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM CONSOLE-LIKE LOG DISPLAY */}
      <div className="console-panel" style={{ height: "120px", minHeight: "120px" }}>
        <div className="console-header" style={{ height: "32px", minHeight: "32px" }}>
          <div className="console-tab active" style={{ fontSize: "11px" }}>Selection Tracker</div>
        </div>
        <div className="console-body" style={{ padding: "12px", fontSize: "11.5px" }}>
          {selectedOption ? (
            <span style={{ color: "var(--green)" }}>
              [TRACKER] Selected Option {String.fromCharCode(65 + options.indexOf(selectedOption))}: &quot;{selectedOption}&quot; (Saved as draft)
            </span>
          ) : (
            <span style={{ color: "var(--text-muted)" }}>
              [TRACKER] No option selected yet. Click an option card above to record your response.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MCQView;
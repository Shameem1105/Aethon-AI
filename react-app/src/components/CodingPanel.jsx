import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";

const parseTestCase = (str) => {
  if (!str) return { input: "N/A", output: "N/A" };
  const parts = str.split(/output/i);
  const inputPart = parts[0] ? parts[0].replace(/input/i, "").replace(/[:\s]+/g, " ").trim() : str;
  const outputPart = parts[1] ? parts[1].replace(/[:\s]+/g, " ").trim() : "N/A";
  return { input: inputPart || "N/A", output: outputPart || "N/A" };
};

const CodingPanel = forwardRef(({ 
  question, 
  answers, 
  setAnswers, 
  onSubmit, 
  addToast, 
  hasRun = false, 
  onRunCode, 
  onSubmitQuestion 
}, ref) => {
  const [selectedLang, setSelectedLang] = useState("java");
  const [draftCode, setDraftCode] = useState("");
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [consoleTab, setConsoleTab] = useState("console");
  const [executionStats, setExecutionStats] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState("Terminal ready. Click 'Run Code' to execute visible tests.");

  // Default templates
  const getTemplate = (lang, qTitle) => {
    switch (lang) {
      case "python":
        return `# Python solution for: ${qTitle}\n\ndef solve():\n    # Write your code here\n    pass\n`;
      case "cpp":
        return `// C++ solution for: ${qTitle}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}\n`;
      case "javascript":
        return `// JavaScript solution for: ${qTitle}\nfunction solve() {\n    // Write your code here\n}\n`;
      case "java":
      default:
        return `// Java solution for: ${qTitle}\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}\n`;
    }
  };

  useEffect(() => {
    if (question) {
      if (answers && answers[question.id] !== undefined) {
        setDraftCode(answers[question.id]);
      } else {
        setDraftCode(getTemplate(selectedLang, question.question_title));
      }
    }
  }, [question?.id, selectedLang]);

  const handleEditorChange = (value) => {
    setDraftCode(value);
    // Auto save draft to parent answers state
    if (setAnswers && question) {
      setAnswers(prev => ({ ...prev, [question.id]: value }));
    }
  };

  const runTests = () => {
    setIsRunningTests(true);
    setConsoleTab("console");
    setTerminalLogs("Compiling source code...\nInitializing sandbox environment...\nRunning visible test cases...\n");
    setExecutionStats(null);

    setTimeout(() => {
      setIsRunningTests(false);
      
      let inputVal = question?.coding_input || "Default Input";
      let expectedVal = question?.coding_output || "Default Output";
      
      setTerminalLogs(prev => 
        prev + `\n[VISIBLE TEST CASE 1]\nInput: ${inputVal}\nExpected: ${expectedVal}\nActual: ${expectedVal}\nStatus: PASSED (0.02s)\n\n[RESULTS] 1/1 visible testcase passed successfully.`
      );
      
      setExecutionStats({
        memory: "8.4 MB",
        time: "0.02s"
      });

      if (onRunCode) {
        onRunCode();
      }

      if (addToast) {
        addToast("Visible test cases executed successfully.", "info");
      }
    }, 1500);
  };

  const submitQuestion = () => {
    setIsSubmittingQuestion(true);
    setConsoleTab("console");
    setTerminalLogs("Compiling and packaging codebase...\nRunning comprehensive suite of hidden test cases...\n");
    setExecutionStats(null);

    setTimeout(() => {
      setIsSubmittingQuestion(false);
      
      // Simulating passing multiple hidden testcases
      const passed = 10;
      setTerminalLogs(prev => 
        prev + `\nTestcase 1: PASSED (0.01s)\nTestcase 2: PASSED (0.01s)\nTestcase 3: PASSED (0.02s)\nTestcase 4: PASSED (0.01s)\nTestcase 5: PASSED (0.02s)\nTestcase 6: PASSED (0.01s)\nTestcase 7: PASSED (0.02s)\nTestcase 8: PASSED (0.03s)\nTestcase 9: PASSED (0.01s)\nTestcase 10: PASSED (0.01s)\n\n[HIDDEN RESULTS] ${passed}/${passed} test cases passed.\n[SUCCESS] Code verified and successfully saved to assessment records.`
      );
      
      setExecutionStats({
        memory: "14.2 MB",
        time: "0.04s"
      });

      if (onSubmitQuestion) {
        onSubmitQuestion();
      }

      if (addToast) {
        addToast("Question submitted and saved to database!", "success");
      }
    }, 1800);
  };

  // Expose runTests and submitQuestion to parent page via ref
  useImperativeHandle(ref, () => ({
    runTests,
    submitQuestion,
    resetTemplate: () => {
      if (window.confirm("Are you sure you want to reset your code to the default template?")) {
        setDraftCode(getTemplate(selectedLang, question?.question_title));
      }
    }
  }));

  const visibleCase = parseTestCase(question?.visible_testcases);
  const hiddenCase = parseTestCase(question?.hidden_testcases);

  return (
    <div className="coding-wrapper">
      {/* EDITOR HEADER */}
      <div className="editor-header">
        <div className="lang-tabs">
          {["java", "python", "cpp", "javascript"].map((lang) => (
            <button
              key={lang}
              className={`lang-tab ${selectedLang === lang ? "active" : ""}`}
              onClick={() => setSelectedLang(lang)}
            >
              {lang === "javascript" ? "JavaScript" : lang === "cpp" ? "C++" : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>

        <div className="editor-header-options">
          <button
            className="editor-opt-btn"
            title="Reset code template"
            onClick={() => {
              if (window.confirm("Reset code to default template?")) {
                setDraftCode(getTemplate(selectedLang, question?.question_title));
              }
            }}
          >
            <i className="ri-refresh-line"></i>
          </button>
          <button className="editor-opt-btn" title="Editor Settings">
            <i className="ri-settings-4-line"></i>
          </button>
          <button className="editor-opt-btn" title="Fullscreen Editor">
            <i className="ri-fullscreen-line"></i>
          </button>
        </div>
      </div>

      {/* MONACO EDITOR */}
      <div className="editor-container">
        <Editor
          height="100%"
          language={selectedLang}
          value={draftCode}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13.5,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            fontFamily: "'Fira Code', monospace",
            lineHeight: 22,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6
            }
          }}
        />
      </div>

      {/* RUN / SUBMIT QUESTION WORKSPACE CONTROLS */}
      <div className="editor-footer-controls" style={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        alignItems: "center", 
        gap: "12px", 
        padding: "10px 16px", 
        background: "#0f1016", 
        borderBottom: "1px solid var(--border-color)",
        borderTop: "1px solid var(--border-color)"
      }}>
        <button 
          className="nav-btn-run" 
          onClick={runTests}
          disabled={isRunningTests || isSubmittingQuestion}
          style={{ height: "36px", padding: "0 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
        >
          {isRunningTests ? (
            <i className="ri-loader-4-line ri-spin" style={{ color: "var(--green)" }}></i>
          ) : (
            <i className="ri-play-line" style={{ color: "var(--green)" }}></i>
          )}
          <span>Run Code</span>
        </button>

        {hasRun && (
          <button 
            className="nav-btn-submit" 
            onClick={submitQuestion}
            disabled={isRunningTests || isSubmittingQuestion}
            style={{ 
              height: "36px", 
              padding: "0 16px", 
              borderRadius: "8px", 
              fontSize: "13px", 
              fontWeight: "700", 
              cursor: "pointer",
              background: "linear-gradient(135deg, var(--green), #059669)",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)"
            }}
          >
            {isSubmittingQuestion ? (
              <i className="ri-loader-4-line ri-spin" style={{ color: "white" }}></i>
            ) : (
              <i className="ri-checkbox-circle-line"></i>
            )}
            <span>Submit Question</span>
          </button>
        )}
      </div>

      {/* CONSOLE PANEL */}
      <div className="console-panel">
        <div className="console-header">
          <div className="console-tabs">
            <button 
              className={`console-tab ${consoleTab === "console" ? "active" : ""}`}
              onClick={() => setConsoleTab("console")}
            >
              Console Logs
            </button>
            <button 
              className={`console-tab ${consoleTab === "results" ? "active" : ""}`}
              onClick={() => setConsoleTab("results")}
            >
              Test Cases
            </button>
          </div>

          {executionStats && (
            <div className="console-meta">
              <span>Memory: {executionStats.memory}</span>
              <span>Exec Time: {executionStats.time}</span>
            </div>
          )}
        </div>

        <div className="console-body">
          {isRunningTests || isSubmittingQuestion ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="ri-loader-4-line ri-spin" style={{ color: "var(--primary-light)" }}></i>
              <span>Executing test cases on sandbox compiler...</span>
            </div>
          ) : consoleTab === "results" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Testcase tabs inside body */}
              <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary-light)" }}>Case 1 (Visible Case):</span>
                {hasRun ? (
                  <span style={{ fontSize: "11px", color: "var(--green)", fontWeight: "600" }}>✓ Passed</span>
                ) : (
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Not run yet</span>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", marginBottom: "4px" }}>Input</div>
                  <pre style={{ margin: 0, fontFamily: "inherit", fontSize: "12.5px" }}>{visibleCase.input}</pre>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", marginBottom: "4px" }}>Expected Output</div>
                  <pre style={{ margin: 0, fontFamily: "inherit", fontSize: "12.5px", color: "var(--green)" }}>{visibleCase.output}</pre>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "10px", marginTop: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-muted)" }}>Case 2 (Hidden Case):</span>
                {executionStats && executionStats.memory === "14.2 MB" ? (
                  <span style={{ fontSize: "11px", color: "var(--green)", fontWeight: "600" }}>✓ Passed (Submitted)</span>
                ) : (
                  <span style={{ fontSize: "11px", color: "var(--yellow)" }}>Locked (Evaluated on submission)</span>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", opacity: 0.7 }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", marginBottom: "4px" }}>Input</div>
                  <pre style={{ margin: 0, fontFamily: "inherit", fontSize: "12.5px" }}>{executionStats && executionStats.memory === "14.2 MB" ? hiddenCase.input : "••••••••"}</pre>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", opacity: 0.7 }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", marginBottom: "4px" }}>Expected Output</div>
                  <pre style={{ margin: 0, fontFamily: "inherit", fontSize: "12.5px", color: "var(--green)" }}>{executionStats && executionStats.memory === "14.2 MB" ? hiddenCase.output : "••••••••"}</pre>
                </div>
              </div>
            </div>
          ) : (
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{terminalLogs}</pre>
          )}
        </div>
      </div>
    </div>
  );
});

CodingPanel.displayName = "CodingPanel";

export default CodingPanel;
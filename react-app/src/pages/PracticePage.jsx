import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ContentPanel from "../components/ContentPanel";
import CodingPanel from "../components/CodingPanel";
import "./test.css";

function PracticePage() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [practice, setPractice] = useState(null);
  const [answers, setAnswers] = useState({});
  const codingPanelRef = useRef();

  // State to track code executions
  const [hasRunCodeMap, setHasRunCodeMap] = useState({});

  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get("email") || "guest@student.com";

  useEffect(() => {
    fetch(`http://localhost:3000/practice-full/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setPractice(data);
          setQuestions(data.questions || []);
          if (data.questions && data.questions.length > 0) {
            setSelected(data.questions[0]); // Auto select first question
          }
        }
      })
      .catch(err => console.error("Failed to load practice", err));
  }, [id]);

  const closePractice = () => {
    // Send message to parent window (coding.html) to close the iframe
    window.parent.postMessage({ action: 'close_practice' }, "*");
  };

  const submitPractice = async () => {
    try {
      await fetch("http://localhost:3000/submit-practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practice_id: id,
          student_email: userEmail
        })
      });
    } catch (err) {
      console.error("Submission failed", err);
    }
    closePractice();
  };

  const username = userEmail.split("@")[0].toUpperCase();

  return (
    <div className="app-layout">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <button className="nav-exit" onClick={closePractice}>
            <i className="ri-arrow-left-line"></i> Exit Practice
          </button>
          <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border-color)" }}></div>
          <span className="nav-badge-slot">PRACTICE</span>
          <span className="nav-title">{practice ? practice.title : "Practice Session"}</span>
          <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border-color)" }}></div>
          <span className="nav-autosave-text">User: {username}</span>
        </div>

        <div className="nav-right">
          <button 
            onClick={() => {
              if (window.confirm("Submit your practice session?")) {
                submitPractice();
              }
            }} 
            className="nav-btn-submit"
          >
            <i className="ri-checkbox-circle-line"></i> Submit Practice
          </button>
        </div>
      </nav>

      {/* WORKSPACE */}
      <div className="workspace">
        {selected ? (
          <>
            {/* LEFT COLUMN: Problem description (50% width) */}
            <main className="center-panel" style={{ width: "50%" }}>
              <ContentPanel question={selected} />
            </main>
            
            {/* RIGHT COLUMN: Code Editor (50% width) */}
            <section className="right-panel" style={{ width: "50%" }}>
              <CodingPanel 
                ref={codingPanelRef}
                question={selected} 
                answers={answers} 
                setAnswers={setAnswers} 
                onSubmit={submitPractice} 
                hasRun={!!hasRunCodeMap[selected?.id]}
                onRunCode={() => setHasRunCodeMap(prev => ({ ...prev, [selected.id]: true }))}
                onSubmitQuestion={() => {
                  alert("Practice question code submitted!");
                }}
              />
            </section>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
            <div style={{ textAlign: "center" }}>
              <i className="ri-loader-4-line ri-spin" style={{ fontSize: "32px", color: "#ffffff", marginBottom: "16px", display: "inline-block" }}></i>
              <h3 style={{ fontWeight: "600", color: "#ffffff" }}>Loading Practice Environment...</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PracticePage;

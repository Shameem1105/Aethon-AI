import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ContentPanel from "../components/ContentPanel";
import CodingPanel from "../components/CodingPanel";
import MCQView from "../components/MCQView";

import "./test.css";

function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [controls, setControls] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const answersRef = useRef({});
  const codingPanelRef = useRef();

  // State to track code executions and submitted coding questions
  const [hasRunCodeMap, setHasRunCodeMap] = useState({});
  const [submittedCodingQuestions, setSubmittedCodingQuestions] = useState([]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const toggleFlagQuestion = (qId) => {
    setFlaggedQuestions(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const clearAnswer = (qId) => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setHasRunCodeMap(prev => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setSubmittedCodingQuestions(prev => prev.filter(id => id !== qId));
    addToast("Answer cleared", "info");
  };

  const submitAssessment = async (reason = null) => {
    setIsSubmitting(true);

    // Filter out coding answers where the student did not click "Submit Question"
    const finalAnswers = { ...answersRef.current };
    questions.forEach(q => {
      if (q.question_type === 'coding' && !submittedCodingQuestions.includes(q.id)) {
        delete finalAnswers[q.id];
      }
    });

    try {
      await fetch("http://localhost:3000/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessment_id: id,
          student_email: userEmail,
          answers: finalAnswers
        })
      });
    } catch (err) {
      console.error("Submission failed", err);
    }

    if (reason) sendLog(reason);
    await stopAndUploadRecorders();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    window.location.href = `http://localhost:3000/submitted.html?id=${id}`;
  };

  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [tabRemaining, setTabRemaining] = useState(null);
  const [hoverRemaining, setHoverRemaining] = useState(null);

  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = "info") => {
    const toastId = Date.now() + Math.random();
    setToasts(prev => [...prev, { id: toastId, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 4000);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [realTime, setRealTime] = useState("");
  const [realDate, setRealDate] = useState("");

  const endTimeRef = useRef(null);
  const [timeLeftStr, setTimeLeftStr] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const hasWarned10Min = useRef(false);

  useEffect(() => {
    if (assessment && assessment.start_time && assessment.total_time) {
      const startTimeMs = new Date(assessment.start_time).getTime();
      const durationMs = Number(assessment.total_time) * 60 * 1000;
      endTimeRef.current = startTimeMs + durationMs;
    }
  }, [assessment]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setRealTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }).toUpperCase());
      setRealDate(now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', month: 'short', day: 'numeric' }));

      if (endTimeRef.current) {
        const remainingMs = endTimeRef.current - now.getTime();
        
        if (remainingMs <= 0) {
           setTimeLeftStr("00:00:00");
           clearInterval(timer);
           submitAssessment("Time Out - Exam Ended");
        } else {
           const totalSeconds = Math.floor(remainingMs / 1000);
           const hours = Math.floor(totalSeconds / 3600);
           const minutes = Math.floor((totalSeconds % 3600) / 60);
           const seconds = totalSeconds % 60;
           
           setTimeLeftStr(
             `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
           );

           if (totalSeconds <= 600) {
             setIsUrgent(true);
             if (!hasWarned10Min.current) {
               hasWarned10Min.current = true;
               addToast("Warning: Only 10 minutes left! Test will auto-submit soon.", "warning");
             }
           }
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const videoRef = useRef(null);
  const screenRecorderRef = useRef(null);
  const screenChunksRef = useRef([]);
  const userStreamRef = useRef(null);

  useEffect(() => {
    if (permissionsGranted && videoRef.current && userStreamRef.current) {
      videoRef.current.srcObject = userStreamRef.current;
    }
  }, [permissionsGranted]);
  
  const lastAudioFlag = useRef(0);
  const lastVideoFlag = useRef(0);

  const startAIProctoring = (stream) => {
    // 1. Decibel-based Audio Level Detection (>40 dB)
    if (Number(controls.mic) === 1 && stream.getAudioTracks().length > 0) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);

        const dataArray = new Float32Array(analyser.frequencyBinCount);

        setInterval(() => {
          analyser.getFloatTimeDomainData(dataArray);
          
          let sumSquares = 0.0;
          for (const amplitude of dataArray) {
            sumSquares += amplitude * amplitude;
          }
          const rms = Math.sqrt(sumSquares / dataArray.length);
          const db = Math.round(20 * Math.log10(rms || 0.00001) + 100);
          
          if (db > 40) {
            const now = Date.now();
            if (now - lastAudioFlag.current > 15000) { // 15s cooldown
              lastAudioFlag.current = now;
              addToast(`Audio Violation: Suspicious audio level detected (${db} dB)`, "error");
              sendLog("audio_flag");
            }
          }
        }, 1000);
      } catch (err) {
        console.error("Audio detection error:", err);
      }
    }

    // 2. Motion Detection via Canvas
    if (Number(controls.webcam) === 1) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const hiddenVideo = document.createElement("video");
        hiddenVideo.srcObject = stream;
        hiddenVideo.muted = true;
        hiddenVideo.play();
        
        let previousData = null;
        
        setInterval(() => {
          if (!hiddenVideo.videoWidth) return;
          canvas.width = hiddenVideo.videoWidth;
          canvas.height = hiddenVideo.videoHeight;
          ctx.drawImage(hiddenVideo, 0, 0, canvas.width, canvas.height);
          const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          if (previousData) {
            let diffPixels = 0;
            const totalPixels = currentData.data.length / 4;
            for (let i = 0; i < currentData.data.length; i += 16) { // check every 4th pixel for performance
              const rDiff = Math.abs(currentData.data[i] - previousData.data[i]);
              const gDiff = Math.abs(currentData.data[i+1] - previousData.data[i+1]);
              const bDiff = Math.abs(currentData.data[i+2] - previousData.data[i+2]);
              if (rDiff + gDiff + bDiff > 80) diffPixels++;
            }
            if (diffPixels / (totalPixels / 4) > 0.15) { // 15% significant change
              const now = Date.now();
              if (now - lastVideoFlag.current > 15000) { // 15s cooldown
                lastVideoFlag.current = now;
                addToast("Video Violation: Excessive movement detected", "error");
                
                // Save Snapshot instead of video clip
                const snapshot = canvas.toDataURL("image/jpeg", 0.7);
                fetch("http://localhost:3000/proctor/log", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    assessment_id: id,
                    student_email: userEmail,
                    log_type: "video_flag",
                    snapshot: snapshot
                  })
                }).catch(console.error);
              }
            }
          }
          previousData = currentData;
        }, 800);
      }
    }
  };
  
  const urlParams = new URLSearchParams(window.location.search);
  const emailFromUrl = urlParams.get("email");
  if (emailFromUrl) {
    localStorage.setItem("userEmail", emailFromUrl);
  }
  
  const userEmail = emailFromUrl || localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail") || "unknown@student.com";

  useEffect(() => {
    fetch(`http://localhost:3000/assessment-full/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAssessment(data.assessment || null);
        setQuestions(data.questions || []);
        
        const c = data.controls || {};
        setControls(c);
        
        if (Number(c.tab_switch) === 1) setTabRemaining(Number(c.tab_limit) || 3);
        if (Number(c.hover_detection) === 1) setHoverRemaining(Number(c.hover_limit) || 3);

        if (data.questions?.length > 0) {
          setSelected(data.questions[0]);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Handle auto-submit
  const forceSubmit = (reason) => {
    submitAssessment(reason);
  };

  const sendLog = (logType) => {
    fetch("http://localhost:3000/proctor/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assessment_id: id,
        student_email: userEmail,
        log_type: logType
      })
    }).catch(console.error);
  };

  const uploadChunk = (blob, type) => {
    const formData = new FormData();
    formData.append("assessment_id", id);
    formData.append("student_email", userEmail);
    formData.append("log_type", type);
    formData.append("video", blob, "recording.webm");

    return fetch("http://localhost:3000/proctor/upload", {
      method: "POST",
      body: formData
    }).catch(console.error);
  };

  const stopAndUploadRecorders = () => {
    return new Promise(async (resolve) => {
      const promises = [];
      
      // Safety timeout so test submission never hangs indefinitely
      const timeout = setTimeout(() => {
        resolve();
      }, 4000);

      const handleStop = (recorder, chunks, type) => {
        return new Promise((res) => {
          recorder.onstop = () => {
            if (chunks.length > 0) {
              const blob = new Blob(chunks, { type: "video/webm" });
              promises.push(uploadChunk(blob, type).catch(() => {}));
            }
            res();
          };
          try {
            recorder.stop();
            recorder.stream.getTracks().forEach(t => t.stop());
          } catch(e) {
            res();
          }
        });
      };

      const stopPromises = [];
      if (screenRecorderRef.current && screenRecorderRef.current.state !== "inactive") {
        stopPromises.push(handleStop(screenRecorderRef.current, screenChunksRef.current, "screen_recording"));
      }

      if (userStreamRef.current) {
        try {
          userStreamRef.current.getTracks().forEach(t => t.stop());
        } catch(e) {
          console.error(e);
        }
      }
      
      await Promise.all(stopPromises);
      await Promise.all(promises);
      clearTimeout(timeout);
      resolve();
    });
  };


  const tabTimerRef = useRef(null);

  useEffect(() => {
    if (!permissionsGranted || !controls) return;

    const handleVisibility = () => {
      if (document.hidden && Number(controls.tab_switch) === 1) {
        sendLog("tab_switch");
        
        // Auto-submit if away for 10 seconds
        tabTimerRef.current = setTimeout(() => {
          forceSubmit("Away from test tab for more than 10 seconds");
        }, 10000);

        setTabRemaining(prev => {
          if (prev === null) return null;
          const newVal = prev - 1;
          if (newVal <= 0) {
            clearTimeout(tabTimerRef.current);
            forceSubmit("Exceeded Tab Switch Limit");
            return 0;
          }
          return newVal;
        });

      } else if (!document.hidden && Number(controls.tab_switch) === 1) {
        // Returned safely
        if (tabTimerRef.current) {
          clearTimeout(tabTimerRef.current);
          tabTimerRef.current = null;
          
          setTabRemaining(prev => {
            if (prev !== null && prev > 0) {
              addToast(`Warning: You switched tabs! You have ${prev} chance(s) left.`, "error");
            }
            return prev;
          });
        }
      }
    };

    const handleFullscreenChange = () => {
      if (!isSubmitting) {
        if (!document.fullscreenElement) {
          setIsFullscreen(false);
          if (Number(controls.fullscreen) === 1) {
            sendLog("fullscreen_exit");
            document.documentElement.requestFullscreen().catch(err => console.log("Auto-fullscreen blocked:", err));
          }
        } else {
          setIsFullscreen(true);
        }
      }
    };

    const handleMouseLeave = () => {
      if (Number(controls.hover_detection) === 1) {
        sendLog("hover_out");
        setHoverRemaining(prev => {
          if (prev === null) return null;
          const newVal = prev - 1;
          if (newVal <= 0) {
            forceSubmit("Exceeded Mouse Hover Out Limit");
            return 0;
          }
          addToast(`Warning: Mouse left window! You have ${newVal} chance(s) left.`, "error");
          return newVal;
        });
      }
    };

    const handleCopyPaste = (e) => {
      if (Number(controls.copy_paste_block) === 1) {
        e.preventDefault();
        e.stopPropagation();
        sendLog("copy_paste_attempt");
        addToast("Copy/Paste is disabled for this test!", "error");
      }
    };

    const handleKeyDown = (e) => {
      if (Number(controls.copy_paste_block) === 1) {
        if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'C', 'V', 'X'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          sendLog("copy_paste_attempt");
          addToast("Keyboard shortcuts for Copy/Paste are disabled!", "error");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Copy Paste
    window.addEventListener("copy", handleCopyPaste, { capture: true });
    window.addEventListener("cut", handleCopyPaste, { capture: true });
    window.addEventListener("paste", handleCopyPaste, { capture: true });
    window.addEventListener("contextmenu", handleCopyPaste, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("copy", handleCopyPaste, { capture: true });
      window.removeEventListener("cut", handleCopyPaste, { capture: true });
      window.removeEventListener("paste", handleCopyPaste, { capture: true });
      window.removeEventListener("contextmenu", handleCopyPaste, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [permissionsGranted, controls, isSubmitting]);

  const startTestSequence = async () => {
    setPermissionError("");
    
    let displayStream = null;
    let userStream = null;

    try {
      // 1. Request Screen Recording Media first (if enabled)
      if (Number(controls.screen_record) === 1) {
        displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: { displaySurface: "monitor" }
        });
        
        // CHECK IF ENTIRE SCREEN (MONITOR) WAS SELECTED
        const videoTrack = displayStream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        if (settings.displaySurface && settings.displaySurface !== "monitor") {
          displayStream.getTracks().forEach(t => t.stop());
          throw new Error("NOT_ENTIRE_SCREEN");
        }

        // Add track ended listener to prevent malpractice (Stop sharing clicked)
        videoTrack.onended = () => {
          forceSubmit("Stopped Screen Sharing");
        };

        const screenRecorder = new MediaRecorder(displayStream, { mimeType: "video/webm" });
        screenRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) screenChunksRef.current.push(e.data);
        };
        screenRecorder.start(10000); // 10s chunks
        screenRecorderRef.current = screenRecorder;
      }

      // 2. Request Webcam and Mic Media (if enabled)
      if (Number(controls.webcam) === 1 || Number(controls.mic) === 1) {
        userStream = await navigator.mediaDevices.getUserMedia({
          video: Number(controls.webcam) === 1,
          audio: Number(controls.mic) === 1
        });
        
        userStreamRef.current = userStream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }

        // Start Local AI Analysis instead of saving heavy .webm files
        startAIProctoring(userStream);
      }

      // 3. Request Fullscreen after all media permissions are successfully granted
      if (Number(controls.fullscreen) === 1) {
        try {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        } catch (err) {
          console.error("Fullscreen error:", err);
          // Clean up streams if fullscreen fails
          if (displayStream) displayStream.getTracks().forEach(t => t.stop());
          if (userStream) userStream.getTracks().forEach(t => t.stop());
          setPermissionError("Fullscreen permission is required. Please click anywhere to try again.");
          return;
        }
      }

      setPermissionsGranted(true);
    } catch (err) {
      console.error(err);
      // Clean up streams on error
      if (displayStream) displayStream.getTracks().forEach(t => t.stop());
      if (userStream) userStream.getTracks().forEach(t => t.stop());

      if (document.fullscreenElement) document.exitFullscreen().catch(()=>{});
      
      if (err.message === "NOT_ENTIRE_SCREEN") {
        setPermissionError("You MUST share your 'Entire Screen'. Do not select Window or Chrome Tab.");
      } else {
        setPermissionError("You must grant camera, microphone, and screen recording permissions to proceed.");
      }
    }
  };

  // Global Loading State
  if (!assessment || !controls) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg-base)", color: "white" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid rgba(139, 92, 246, 0.3)", borderTopColor: "#a78bfa", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "16px" }}></div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>Loading assessment workspace...</div>
      </div>
    );
  }

  const codingQuestions = questions.filter((q) => q.question_type === "coding");
  const mcqQuestions = questions.filter((q) => q.question_type === "mcq");

  if (!permissionsGranted && controls) {
    const needsPermissions = Number(controls.screen_record) === 1 || Number(controls.webcam) === 1 || Number(controls.mic) === 1 || Number(controls.fullscreen) === 1;

    if (!needsPermissions) {
      setTimeout(() => setPermissionsGranted(true), 0);
      return null;
    }

    return (
      <div className="app-layout" style={{ position: "relative" }}>
        
        {/* BLURRED BACKGROUND OF THE ACTUAL TEST */}
        <div style={{ filter: "blur(8px)", pointerEvents: "none", opacity: 0.6, height: "100vh", overflow: "hidden" }}>
          <nav className="navbar" style={{ height: "74px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}></nav>
          <div className="workspace" style={{ display: "flex", height: "calc(100vh - 74px)" }}>
             <aside className="sidebar" style={{ width: "300px", borderRight: "1px solid rgba(255,255,255,0.05)" }}></aside>
             <main className="center-panel" style={{ flex: 1 }}></main>
          </div>
        </div>

        {/* CLICK ANYWHERE OVERLAY */}
        <div 
          onClick={startTestSequence}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 9999, background: "rgba(0,0,0,0.3)" }}
        >
          <div style={{ background: "rgba(10, 5, 20, 0.85)", border: "1px solid rgba(124, 58, 237, 0.3)", padding: "40px 60px", borderRadius: "24px", textAlign: "center", backdropFilter: "blur(12px)", boxShadow: "0 25px 50px rgba(0,0,0,0.6)" }}>
            <div style={{ width: "80px", height: "80px", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(147,51,234,0.2))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", border: "1px solid rgba(124,58,237,0.4)" }}>
               <i className="ri-cursor-fill" style={{ fontSize: "36px", color: "#a78bfa" }}></i>
            </div>
            
            <h2 style={{ color: "white", fontSize: "28px", marginBottom: "12px", fontWeight: "800", letterSpacing: "0.5px" }}>Click Anywhere To Begin</h2>
            <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "420px", lineHeight: "1.6", margin: "0 auto" }}>
              The browser will naturally ask for necessary permissions (Camera, Mic, Screen) once you click.
            </p>
            
            {permissionError && (
              <div style={{ marginTop: "24px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#fca5a5", padding: "16px 24px", borderRadius: "14px", fontSize: "14px", fontWeight: "600" }}>
                <i className="ri-error-warning-fill" style={{ marginRight: "8px", fontSize: "16px" }}></i>
                {permissionError}
                <div style={{ fontSize: "13px", color: "#f87171", marginTop: "8px", fontWeight: "400", opacity: 0.9 }}>Click anywhere to try again.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  // Fullscreen Enforcer Overlay
  if (permissionsGranted && Number(controls.fullscreen) === 1 && !isFullscreen) {
    return (
      <div 
        className="app-layout" 
        onClick={async () => {
          try {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
          } catch(err) { console.log(err); }
        }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 999999, cursor: "pointer", background: "rgba(10, 5, 20, 0.9)", backdropFilter: "blur(10px)" }}
      >
        <div style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(239, 68, 68, 0.3)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "40px", width: "90%", maxWidth: "480px", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
          <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #ef4444, #b91c1c)", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", color: "white", margin: "0 auto 24px auto", boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}>
            <i className="ri-fullscreen-line"></i>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "16px", color: "white" }}>Fullscreen Enforced</h2>
          <p style={{ color: "#b5b5c3", fontSize: "15px", lineHeight: "1.6" }}>
            The system is returning you to fullscreen mode. If it was blocked, click anywhere on this screen to automatically return to your test.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      
      {isSubmitting && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", background: "rgba(10, 5, 20, 0.95)", zIndex: 9999999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
          <div style={{ width: "60px", height: "60px", border: "4px solid rgba(139, 92, 246, 0.3)", borderTopColor: "#a78bfa", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }}></div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "1px" }}>Submitting Assessment...</h2>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>Please do not close the browser.</p>
        </div>
      )}

      {/* ADVANCED TOAST SYSTEM */}
      <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 9999, display: "flex", flexDirection: "column", gap: "10px", pointerEvents: "none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ 
            backgroundColor: t.type === "error" ? "#ef4444" : t.type === "warning" ? "#eab308" : t.type === "success" ? "#22c55e" : "#3b82f6", 
            color: t.type === "warning" ? "#000" : "white", 
            padding: "14px 28px", borderRadius: "14px", fontWeight: "700", boxShadow: "0 10px 25px rgba(0,0,0,0.4)", 
            display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", pointerEvents: "none",
            animation: "slideUpFade 0.3s ease-out forwards"
          }}>
            <i className={t.type === "error" ? "ri-error-warning-fill" : t.type === "success" ? "ri-checkbox-circle-fill" : "ri-information-fill"} style={{ fontSize: "20px" }}></i>
            {t.message}
          </div>
        ))}
      </div>

      {/* WEBCAM PREVIEW */}
      <video 
         ref={videoRef}
         autoPlay 
         muted 
         playsInline
         style={{ 
           position: "fixed", 
           bottom: "20px", 
           right: "20px", 
           width: "180px", 
           height: "135px", 
           borderRadius: "12px", 
           border: "1px solid rgba(255,255,255,0.1)", 
           zIndex: 9999, 
           objectFit: "cover", 
           boxShadow: "0 10px 30px rgba(0,0,0,0.5)", 
           background: "#000",
           display: (permissionsGranted && Number(controls?.webcam) === 1) ? "block" : "none"
         }}
      />

      {/* NAVBAR WITH PILLS */}
      <nav className="navbar">
        <div className="nav-left">
          <button 
            className="nav-exit" 
            onClick={() => {
              if (window.confirm("Are you sure you want to exit the assessment? Your changes will be saved.")) {
                submitAssessment("Manual Exit");
              }
            }}
          >
            <i className="ri-arrow-left-line"></i> Exit Assessment
          </button>
          <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border-color)" }}></div>
          <span className="nav-badge-slot">SYS-301</span>
          <span className="nav-title">{assessment ? assessment.title : "Exam Assessment"}</span>
          <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border-color)" }}></div>
          <div className="nav-autosave-dot"></div>
          <span className="nav-autosave-text">Auto Saved</span>
        </div>

        <div className="nav-center" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {timeLeftStr && (
            <div className={`timer-pill ${isUrgent ? "urgent" : ""}`} title="Remaining Time">
              <i className="ri-timer-line" style={{ fontSize: "15px" }}></i>
              <span>{timeLeftStr} Remaining</span>
            </div>
          )}

          {Number(controls?.tab_switch) === 1 && tabRemaining !== null && (
            <div 
              className="warning-pill" 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: tabRemaining <= 1 ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 158, 11, 0.08)",
                borderColor: tabRemaining <= 1 ? "rgba(239, 68, 68, 0.45)" : "rgba(245, 158, 11, 0.45)",
                borderRadius: "99px",
                border: "1px solid",
                padding: "6px 16px",
                color: tabRemaining <= 1 ? "#fca5a5" : "var(--yellow)",
                fontWeight: "700",
                fontSize: "13px",
                letterSpacing: "0.5px"
              }}
              title="Remaining tab switches before automatic submission"
            >
              <i className="ri-window-line" style={{ fontSize: "15px" }}></i>
              <span>Tab Warnings: {tabRemaining}</span>
            </div>
          )}

          {Number(controls?.hover_detection) === 1 && hoverRemaining !== null && (
            <div 
              className="warning-pill" 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: hoverRemaining <= 1 ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 158, 11, 0.08)",
                borderColor: hoverRemaining <= 1 ? "rgba(239, 68, 68, 0.45)" : "rgba(245, 158, 11, 0.45)",
                borderRadius: "99px",
                border: "1px solid",
                padding: "6px 16px",
                color: hoverRemaining <= 1 ? "#fca5a5" : "var(--yellow)",
                fontWeight: "700",
                fontSize: "13px",
                letterSpacing: "0.5px"
              }}
              title="Remaining hover out warnings before automatic submission"
            >
              <i className="ri-scan-focus-line" style={{ fontSize: "15px" }}></i>
              <span>Hover Warnings: {hoverRemaining}</span>
            </div>
          )}
        </div>

        <div className="nav-right" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="nav-btn-preview">
            Preview
          </button>

          <button 
            onClick={() => {
              if(window.confirm("Are you sure you want to submit the entire assessment? You will not be able to return.")) {
                submitAssessment("Manual Submission");
              }
            }} 
            className="nav-btn-submit"
          >
            <i className="ri-checkbox-circle-line"></i> Submit Assessment
          </button>
        </div>
      </nav>

      <div className="workspace">
        {/* LEFT COLUMN: Problem Details */}
        <main className="center-panel">
          <ContentPanel question={selected} />
        </main>

        {/* MIDDLE COLUMN: Code Editor OR MCQ Option Cards */}
        <section className="right-panel">
          {selected?.question_type === "coding" ? (
            <CodingPanel 
              ref={codingPanelRef}
              question={selected} 
              answers={answers} 
              setAnswers={setAnswers} 
              onSubmit={() => submitAssessment()}
              addToast={addToast}
              hasRun={!!hasRunCodeMap[selected?.id]}
              onRunCode={() => setHasRunCodeMap(prev => ({ ...prev, [selected.id]: true }))}
              onSubmitQuestion={() => {
                setSubmittedCodingQuestions(prev => [...prev, selected.id]);
              }}
            />
          ) : (
            <MCQView
              question={selected}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
        </section>

        {/* RIGHT COLUMN: Question Navigation & Overview */}
        <aside className="sidebar">
          <Sidebar
            questions={questions}
            selected={selected}
            setSelected={setSelected}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            toggleFlagQuestion={toggleFlagQuestion}
            clearAnswer={clearAnswer}
            submittedCodingQuestions={submittedCodingQuestions}
          />
        </aside>

        {/* BOTTOM PAGINATION BAR SPANNING LEFT PANEL */}
        {questions.length > 0 && selected && (
          <div className="footer-nav-bar">
            <button
              className="footer-nav-btn"
              disabled={questions.findIndex(q => q.id === selected.id) === 0}
              onClick={() => {
                const idx = questions.findIndex(q => q.id === selected.id);
                if (idx > 0) setSelected(questions[idx - 1]);
              }}
            >
              <i className="ri-arrow-left-s-line"></i> Previous
            </button>
            
            <div className="footer-nav-counter">
              Question {questions.findIndex(q => q.id === selected.id) + 1} of {questions.length}
            </div>

            <button
              className="footer-nav-btn"
              disabled={questions.findIndex(q => q.id === selected.id) === questions.length - 1}
              onClick={() => {
                const idx = questions.findIndex(q => q.id === selected.id);
                if (idx < questions.length - 1) setSelected(questions[idx + 1]);
              }}
            >
              Next <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestPage;
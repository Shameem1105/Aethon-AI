/* =========================
   start.js (FINAL CORRECT)
========================= */

/* GET ID FROM URL */
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("startBtn").onclick = function () {
  const email = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail") || "";
  window.location.href = `http://localhost:5173/test/${id}?email=${encodeURIComponent(email)}`;
};


/* =========================
   LOAD START PAGE
========================= */
async function loadStartPage(){

  try{

    if(!id){
      alert("Invalid assessment ID");
      return;
    }

    /* 🔥 FETCH DATA FROM BACKEND */
    const res = await fetch("/assessment/" + id);
    const data = await res.json();

    console.log("FULL DATA:", data);
    console.log("CONTROLS:", data.controls);

    if(data.error){
      alert("Failed to load details");
      return;
    }

    /* =========================
       BASIC DETAILS
    ========================== */

    document.getElementById("title").innerText =
      data.title || "Untitled";

    document.getElementById("duration").innerText =
      data.duration ?? 0;

    document.getElementById("questions").innerText =
      data.questions ?? 0;

    document.getElementById("marks").innerText =
      data.total_marks ?? 0;

    /* =========================
       CONTROLS (MATCH BACKEND)
    ========================== */

    const controls = data.controls || {};

    const features = [
      {name:"Fullscreen", key:"requireFullscreen", icon:"ri-fullscreen-line"},
      {name:"Tab Switch", key:"preventTabSwitch", icon:"ri-window-line"},
      {name:"Copy Paste", key:"preventCopyPaste", icon:"ri-file-copy-line"},
      {name:"Webcam", key:"recordWebcam", icon:"ri-camera-line"},
      {name:"Microphone", key:"recordWebmic", icon:"ri-mic-line"},
      {name:"Screen Record", key:"recordScreen", icon:"ri-macbook-line"}
    ];

    const container = document.getElementById("featuresContainer");
    container.innerHTML = "";

    features.forEach(f => {

      /* ✅ HANDLE 0 / 1 / undefined */
      const enabled = Number(controls[f.key]) === 1;

      container.innerHTML += `
        <div class="feature ${enabled ? "enabled" : "disabled"}">
          <i class="${f.icon}"></i>
          <div>
            <strong>${f.name}</strong><br>
            ${enabled ? "Enabled" : "Disabled"}
          </div>
        </div>
      `;
    });

  }catch(err){
    console.error("ERROR:", err);
    alert("Something went wrong while loading");
  }

}

/* CALL FUNCTION */
loadStartPage();

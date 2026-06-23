// admin-students.js - Manage students directory and modals

document.addEventListener("DOMContentLoaded", () => {
  fetchStudentsList();
});

let cachedStudents = [];

function fetchStudentsList() {
  fetch("/admin/students")
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        showErrorRow();
        return;
      }
      cachedStudents = data;
      renderStudents(data);
    })
    .catch(err => {
      console.error("Error fetching students:", err);
      showErrorRow();
    });
}

function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  if (!tbody) return;

  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--gray-text); padding: 40px 0;">No student accounts registered in system.</td></tr>`;
    return;
  }

  tbody.innerHTML = students.map(row => {
    let badgeClass = "badge active";
    if (row.status === "FLAGGED") badgeClass = "badge flagged";
    if (row.status === "SUSPENDED") badgeClass = "badge suspended";
    if (row.status === "INACTIVE") badgeClass = "badge inactive";
    
    const rowJson = encodeURIComponent(JSON.stringify(row));
    return `
      <tr>
        <td>
          <div class="user-cell" style="cursor: pointer;" onclick="openStudentDetailsModal('${rowJson}')">
            <div class="avatar-mini">${getInitials(row.name)}</div>
            <div class="user-name-block">
              <span class="user-name" style="text-decoration: underline; text-underline-offset: 3px;">${row.name}</span>
              <span class="user-email">${row.email}</span>
            </div>
          </div>
        </td>
        <td style="font-family: 'JetBrains Mono', monospace; font-weight: 600;">${row.student_id}</td>
        <td><span class="${badgeClass}">${row.status}</span></td>
        <td style="font-weight: 600;">${row.avg_score}</td>
        <td style="color: var(--gray-text);">${row.last_active}</td>
        <td style="text-align: right;">
          <button class="btn-primary" style="font-size: 11px; padding: 4px 10px; border-radius: 6px;" onclick="openStudentDetailsModal('${rowJson}')">
            <i class="ri-folder-user-line"></i> Profile
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function openStudentDetailsModal(rowJson) {
  const student = JSON.parse(decodeURIComponent(rowJson));
  
  document.getElementById("details-avatar").textContent = getInitials(student.name);
  document.getElementById("details-name").textContent = student.name;
  
  const statusBadge = document.getElementById("details-status-badge");
  statusBadge.textContent = student.status;
  statusBadge.className = "badge " + student.status.toLowerCase();
  
  document.getElementById("details-roll").textContent = student.student_id || "N/A";
  document.getElementById("details-email").textContent = student.email || "N/A";
  document.getElementById("details-dob").textContent = student.dob || "N/A";
  document.getElementById("details-phone").textContent = student.personal_number || "N/A";
  document.getElementById("details-college").textContent = student.college_name || "N/A";
  document.getElementById("details-score").textContent = student.avg_score || "0%";
  document.getElementById("details-active").textContent = student.last_active || "Active";
  
  document.getElementById("student-details-modal").style.display = "flex";
}

function closeStudentDetailsModal() {
  document.getElementById("student-details-modal").style.display = "none";
}

function searchStudents() {
  const query = document.getElementById("students-search-input").value.toLowerCase();
  const filtered = cachedStudents.filter(s => 
    s.name.toLowerCase().includes(query) || 
    s.email.toLowerCase().includes(query) ||
    s.student_id.toLowerCase().includes(query) ||
    (s.college_name && s.college_name.toLowerCase().includes(query))
  );
  renderStudents(filtered);
}

function showErrorRow() {
  const tbody = document.querySelector("#students-table tbody");
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--danger); padding: 40px 0;">Failed to fetch students from server database.</td></tr>`;
  }
}

// Modal actions
function openAddStudentModal() {
  document.getElementById("add-student-modal").style.display = "flex";
  document.getElementById("addStudentMsg").textContent = "";
  document.getElementById("addStudentMsg").style.color = "";
}

// Ensure closing details also works if clicked outside or cancel
function closeAddStudentModal() {
  document.getElementById("add-student-modal").style.display = "none";
}

function submitAddStudent() {
  const nameInput = document.getElementById("new-student-name");
  const emailInput = document.getElementById("new-student-email");
  const passwordInput = document.getElementById("new-student-password");
  const rollInput = document.getElementById("new-student-roll");
  const dobInput = document.getElementById("new-student-dob");
  const phoneInput = document.getElementById("new-student-phone");
  const collegeInput = document.getElementById("new-student-college");
  const msgEl = document.getElementById("addStudentMsg");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const roll_number = rollInput.value.trim();
  const dob = dobInput.value;
  const personal_number = phoneInput.value.trim();
  const college_name = collegeInput.value.trim();

  if (!name || !email || !password) {
    msgEl.textContent = "Name, Email and Temp Password are required.";
    msgEl.style.color = "var(--danger)";
    return;
  }

  fetch("/admin/add-student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, dob, roll_number, personal_number, college_name })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      msgEl.textContent = "Student account created successfully!";
      msgEl.style.color = "var(--success)";
      
      // Clear inputs
      nameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      rollInput.value = "";
      dobInput.value = "";
      phoneInput.value = "";
      collegeInput.value = "";
      
      // Refresh list
      fetchStudentsList();
      setTimeout(closeAddStudentModal, 1500);
    } else {
      msgEl.textContent = data.error || "Failed to create account.";
      msgEl.style.color = "var(--danger)";
    }
  })
  .catch(err => {
    console.error(err);
    msgEl.textContent = "Server error occurred.";
    msgEl.style.color = "var(--danger)";
  });
}

function getInitials(name) {
  if (!name) return "ST";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

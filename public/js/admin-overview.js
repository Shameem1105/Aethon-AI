// admin-overview.js - Logic for admin.html Overview dashboard

document.addEventListener("DOMContentLoaded", () => {
  fetchDashboardStats();
  fetchRecentViolations();
  
  // Refresh every 30 seconds
  setInterval(() => {
    fetchDashboardStats();
    fetchRecentViolations();
  }, 30000);
});

function fetchDashboardStats() {
  fetch("/admin/dashboard-stats")
    .then(res => res.json())
    .then(data => {
      if (data.error) return;

      // Top row
      setEl("stat-total-students", data.total_students);
      setEl("stat-active-tests", data.active_tests);
      setEl("stat-practice-sets", data.practice_sets);
      setEl("stat-questions", data.total_questions);
      setEl("stat-flags", data.proctoring_flags);

      // Second row
      setEl("stat-submissions", data.total_submissions);
      setEl("stat-avg-score", data.avg_score + "%");
      setEl("stat-feedback", data.total_feedback);
      setEl("stat-practices", data.practice_sets);

      // Summary panel
      setEl("summary-tests", data.active_tests);
      setEl("summary-practices", data.practice_sets);
      setEl("summary-students", data.total_students);
      setEl("summary-questions", data.total_questions);
      setEl("summary-submissions", data.total_submissions);
      setEl("summary-avg", data.avg_score + "%");
      setEl("summary-flags", data.proctoring_flags);
    })
    .catch(err => console.error("Error fetching admin stats:", err));
}

function setEl(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function fetchRecentViolations() {
  fetch("/admin/recent-violations")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#recent-violations-table tbody");
      if (!tbody) return;
      
      if (data.error || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--gray-text); padding: 40px 0;">No recent security events found.</td></tr>`;
        return;
      }
      
      tbody.innerHTML = data.map(row => {
        const timeFormatted = new Date(row.timestamp).toLocaleString("en-IN", {
          day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
        });
        
        let severityClass = "badge active";
        if (row.severity === "High") severityClass = "badge flagged";
        else if (row.severity === "Critical") severityClass = "badge suspended";
        
        return `
          <tr>
            <td style="color: var(--gray-text); font-size: 12px;">${timeFormatted}</td>
            <td>
              <div class="user-cell">
                <div class="avatar-mini">${getInitials(row.student_name)}</div>
                <span class="user-name">${row.student_name}</span>
              </div>
            </td>
            <td style="color: var(--gray-text); font-size: 12px;">${row.student_email}</td>
            <td style="font-weight: 500;">${row.event_type}</td>
            <td><span class="${severityClass}">${row.severity}</span></td>
            <td><span class="badge inactive" style="font-size: 10px;">${row.status}</span></td>
          </tr>
        `;
      }).join("");
    })
    .catch(err => {
      console.error("Error fetching recent violations:", err);
      const tbody = document.querySelector("#recent-violations-table tbody");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--danger); padding: 40px 0;">Failed to load security events.</td></tr>`;
      }
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

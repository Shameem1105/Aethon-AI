# Aethon Project Source Code

## Hosting and Setup Guide

Follow these steps to host and run the Aethon project from scratch:

### 1. Prerequisites
- Node.js (v16 or higher)
- XAMPP or a standalone MySQL Server

### 2. Database Setup
1. Start MySQL through your XAMPP Control Panel.
2. Open phpMyAdmin (usually `http://localhost/phpmyadmin`).
3. Create a database named `portfolio`.
4. Import the provided `portfolio.sql` file (or run the equivalent SQL commands) to set up the tables (`users`, `assessments`, `questions`, `student_results`, etc.).

### 3. Backend Setup
1. Open a terminal in the root directory (`c:/xampp/htdocs/portfolio`).
2. Run `npm install` to install backend dependencies (express, mysql2, cors, bcrypt, jsonwebtoken, etc.).
3. Start the backend server by running:
   ```bash
   node server.js
   ```
   *(The backend server will run on port 3000)*

### 4. Frontend Setup
1. Open a new terminal and navigate to the React app folder:
   ```bash
   cd react-app
   ```
2. Run `npm install` to install frontend dependencies.
3. Start the React development server:
   ```bash
   npm run dev
   ```
   *(The frontend will run on a local port, usually 5173, and will automatically open in your browser)*

### 5. Accessing the Platforms
- **Admin Dashboard**: Open `http://localhost/portfolio/public/admin.html` (or use live-server in the `public` folder).
- **Student Assessment Portal**: Handled by the React application running on port 5173.

---

## Project Codebase

### File: `db.js`

```js
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "portfolio",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL Pool Connected");

module.exports = db;
```

---

### File: `package.json`

```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "multer": "^2.1.1",
    "mysql2": "^3.6.5"
  }
}

```

---

### File: `public/admin.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Admin Panel</title>
<link rel="stylesheet" href="css/admin.css">
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="logo-header">
    <div class="logo"><i class="ri-shield-user-line"></i></div>
    <h2>AETHON Admin</h2>
  </div>
  
  <ul class="nav-menu">
    <li class="nav-item active" onclick="switchTab('dashboard', this)">
      <i class="ri-dashboard-line"></i> Dashboard
    </li>
    <li class="nav-item" onclick="switchTab('test-upload', this)">
      <i class="ri-file-upload-line"></i> Test Upload
    </li>
    <li class="nav-item" onclick="switchTab('practice-upload', this)">
      <i class="ri-code-box-line"></i> Practice Upload
    </li>
    <li class="nav-item" onclick="switchTab('profile', this)">
      <i class="ri-user-settings-line"></i> Profile
    </li>
    <li class="nav-item" style="margin-top: auto; color: #ef4444;" onclick="window.location.href='login.html'">
      <i class="ri-logout-box-line"></i> Logout
    </li>
  </ul>
</aside>

<!-- MAIN CONTENT -->
<main class="main">

  <!-- ================= DASHBOARD TAB ================= -->
  <section id="dashboard" class="tab-content active">
    <h1>Welcome, System Admin</h1>
    <p class="sub">Here is the overview of the AETHON platform.</p>
    
    <div class="dashboard-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><i class="ri-file-list-3-line"></i></div>
        <div class="stat-info">
          <h4>Active Tests</h4>
          <h2>24</h2>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon green"><i class="ri-code-box-line"></i></div>
        <div class="stat-info">
          <h4>Practice Sets</h4>
          <h2>18</h2>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon blue"><i class="ri-team-line"></i></div>
        <div class="stat-info">
          <h4>Total Students</h4>
          <h2>1,482</h2>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon orange"><i class="ri-error-warning-line"></i></div>
        <div class="stat-info">
          <h4>Proctoring Flags</h4>
          <h2>89</h2>
        </div>
      </div>
    </div>

    <div class="recent-activity">
      <h3><i class="ri-history-line" style="color: #a78bfa;"></i> Recent Activity</h3>
      
      <div class="activity-item">
        <div class="activity-icon"><i class="ri-shield-check-line" style="color: #34d399;"></i></div>
        <div class="activity-text">
          <p>Test "Full Stack Assessment" created successfully</p>
          <span>2 hours ago</span>
        </div>
      </div>

      <div class="activity-item">
        <div class="activity-icon"><i class="ri-user-add-line" style="color: #60a5fa;"></i></div>
        <div class="activity-text">
          <p>45 students enrolled in "JavaScript Basics Practice"</p>
          <span>5 hours ago</span>
        </div>
      </div>

      <div class="activity-item">
        <div class="activity-icon"><i class="ri-error-warning-line" style="color: #ef4444;"></i></div>
        <div class="activity-text">
          <p>Proctoring alert: Multiple tabs switched during "React Certification"</p>
          <span>1 day ago</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= TEST UPLOAD TAB ================= -->
  <section id="test-upload" class="tab-content">
    <div class="admin-box">
      <h1>Create Strict Test</h1>
      <p class="sub">Create tests with strict proctoring and time limits</p>

      <div class="section-title">Test Details</div>
      <input id="test_title" class="field" placeholder="Test Title">
      
      <label class="mini-label">Start Date & Time</label>
      <input id="test_start_time" class="field" type="datetime-local">
      
      <label class="mini-label">End Date & Time</label>
      <input id="test_end_time" class="field" type="datetime-local">
      
      <textarea id="test_description" class="field area" placeholder="Description"></textarea>
      <input id="test_time" class="field" type="number" placeholder="Total Time (minutes)">
      <input id="test_email_count" class="field" type="number" placeholder="Total Students Count">
      
      <button class="btn secondary-btn" onclick="generateEmailInputs('test')">Generate Email Inputs</button>
      <div id="test_emailBox"></div>

      <button class="btn" onclick="createAssessment('test')">Create Test</button>
      <div id="testMsg" class="msg"></div>

      <button class="btn secondary-btn" onclick="openControls()">Manage Security Controls</button>

      <div class="section-title mt">Upload Questions</div>
      <div id="jsonQuestionArea">
        <input type="file" id="test_jsonFile" class="field" accept=".json">
        <button class="btn" onclick="saveJsonQuestions('test')">Upload JSON File</button>
        <div id="test_jsonMsg" class="msg"></div>
      </div>
    </div>
  </section>

  <!-- ================= PRACTICE UPLOAD TAB ================= -->
  <section id="practice-upload" class="tab-content">
    <div class="admin-box">
      <h1>Create Practice</h1>
      <p class="sub">Create relaxed practice sessions with no security controls</p>

      <div class="section-title">Practice Details</div>
      <input id="practice_title" class="field" placeholder="Practice Title">
      
      <input id="practice_email_count" class="field" type="number" placeholder="Total Students Count">
      
      <button class="btn secondary-btn" onclick="generateEmailInputs('practice')">Generate Email Inputs</button>
      <div id="practice_emailBox"></div>

      <button class="btn" onclick="createAssessment('practice')">Create Practice</button>
      <div id="practiceMsg" class="msg"></div>

      <div class="section-title mt">Upload Questions</div>
      <div>
        <input type="file" id="practice_jsonFile" class="field" accept=".json">
        <button class="btn" onclick="saveJsonQuestions('practice')">Upload JSON File</button>
        <div id="practice_jsonMsg" class="msg"></div>
      </div>
    </div>
  </section>

  <!-- ================= PROFILE TAB ================= -->
  <section id="profile" class="tab-content">
    <div class="profile-card">
      <div class="profile-avatar"><i class="ri-user-star-fill"></i></div>
      <div class="profile-name">Mohammed Shameem</div>
      <div class="profile-role">System Administrator</div>

      <div class="profile-detail">
        <span>Email ID</span>
        <span style="color: white; font-weight: 500;">admin@AETHON.com</span>
      </div>
      <div class="profile-detail">
        <span>Access Level</span>
        <span style="color: #22c55e; font-weight: 500;">Full Access</span>
      </div>
      <div class="profile-detail">
        <span>Joined</span>
        <span style="color: white; font-weight: 500;">June 2026</span>
      </div>
      
      <button class="btn" style="margin-top: 30px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1);" onclick="alert('Settings modal coming soon!')">Edit Profile</button>
    </div>
  </section>

</main>

<script src="js/admin.js?v=100"></script>
</body>
</html>

```

---

### File: `public/assessment.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Assessment Dashboard</title>

  <link rel="stylesheet" href="css/sidebar.css">
  <link rel="stylesheet" href="css/assessment.css">

  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
    rel="stylesheet"
  >
</head>

<body>

<!-- ================= SIDEBAR ================= -->
<div class="sidebar" id="sidebar">

  <div class="top">

    <div class="logo">
      <div class="logo-icon">
        <i class="ri-book-open-line"></i>
      </div>
      <span class="logo-text">AETHON</span>
    </div>

    <div class="toggle-btn" onclick="toggleSidebar()">
      <i class="ri-arrow-left-s-line"></i>
    </div>

  </div>

<div class="menu">

  <button class="menu-item"
    onclick="window.location.href='dashboard.html'">
    <i class="ri-layout-grid-line"></i>
    <span>Dashboard</span>
  </button>

  <button class="menu-item active"
    onclick="window.location.href='assessment.html'">
    <i class="ri-pencil-line"></i>
    <span>Assessments</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='coding.html'">
    <i class="ri-code-s-slash-line"></i>
    <span>Coding Practice</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='profile.html'">
    <i class="ri-user-fill"></i>
    <span>Profile</span>
  </button>

</div>

<div class="profile">

  <div class="profile-left">

    <!-- Avatar -->
    <div class="avatar" id="userAvatar"></div>

    <!-- Name + Role -->
    <div class="profile-text">
      <p class="name" id="userName"></p>
      <span class="role" id="userRole"></span>
    </div>

  </div>

  <i class="ri-logout-box-r-line logout"
     onclick="logout()"
     style="cursor:pointer;"></i>

</div>
</div>

<!-- ================= MAIN ================= -->
<div class="main">

  <!-- HEADER -->
  <div class="header">

    <div>
      <span class="badge">ASSESSMENTS</span>

      <h1>Assessment Dashboard</h1>

      <p>
        Track and manage your academic assessments
      </p>
    </div>

    <input
      type="text"
      class="search"
      placeholder="Search assessments..."
    >

  </div>

  <!-- FILTER -->
  <div class="filters">

    <button class="active">All</button>
    <button>Available</button>
    <button>Completed</button>
    <button>Missed</button>
    <button>Feedback</button>

  </div>

  <!-- SORT -->
  <div class="sort">

    <button class="active">
      Due Date
    </button>

    <button>
      Title
    </button>

    <button>
      Order: A-Z ↑
    </button>

  </div>

  <!-- CARDS -->
  <div
    class="assessment-cards"
    id="assessmentContainer">
  </div>

</div>

<!-- ================= DETAILS POPUP ================= -->
<div
  id="detailsModal"
  class="details-modal">

  <div class="details-popup">

    <span
      id="closeModal">
      &times;
    </span>

    <div id="modalBody"></div>

  </div>

</div>

<!-- ================= JS ================= -->
<script src="js/nav.js"></script>
<script src="js/assessment.js"></script>

</body>
</html>

```

---

### File: `public/coding.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Assessment Dashboard</title>

  <link rel="stylesheet" href="css/sidebar.css">
  <link rel="stylesheet" href="css/assessment.css">

  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
    rel="stylesheet"
  >
</head>

<body>

<!-- ================= SIDEBAR ================= -->
<div class="sidebar" id="sidebar">

  <div class="top">

    <div class="logo">
      <div class="logo-icon">
        <i class="ri-book-open-line"></i>
      </div>
      <span class="logo-text">AETHON</span>
    </div>

    <div class="toggle-btn" onclick="toggleSidebar()">
      <i class="ri-arrow-left-s-line"></i>
    </div>

  </div>

<div class="menu">

  <button class="menu-item"
    onclick="window.location.href='dashboard.html'">
    <i class="ri-layout-grid-line"></i>
    <span>Dashboard</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='assessment.html'">
    <i class="ri-pencil-line"></i>
    <span>Assessments</span>
  </button>

  <button class="menu-item active"
    onclick="window.location.href='coding.html'">
    <i class="ri-code-s-slash-line"></i>
    <span>Coding Practice</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='profile.html'">
    <i class="ri-user-fill"></i>
    <span>Profile</span>
  </button>

</div>

<div class="profile">

  <div class="profile-left">

    <!-- Avatar -->
    <div class="avatar" id="userAvatar"></div>

    <!-- Name + Role -->
    <div class="profile-text">
      <p class="name" id="userName"></p>
      <span class="role" id="userRole"></span>
    </div>

  </div>

  <i class="ri-logout-box-r-line logout"
     onclick="logout()"
     style="cursor:pointer;">
  </i>

</div>
</div>

<!-- ================= MAIN ================= -->
<div class="main">

  <!-- HEADER -->
  <div class="header">

    <div>

      <h1>Coding Practice</h1>

      <p>
        Sharpen your programming skills
      </p>
    </div>

    <input
      type="text"
      class="search"
      placeholder="Search practices..."
    >

  </div>

  <!-- FILTER -->
  <div class="filters">

    <button class="active">All</button>
    <button>Available</button>
    <button>Completed</button>
    <button>Missed</button>
    <button>Feedback</button>

  </div>

  <!-- SORT -->
  <div class="sort">

    <button class="active">
      Due Date
    </button>

    <button>
      Title
    </button>

    <button>
      Order: A-Z ↑
    </button>

  </div>

  <!-- CARDS -->
  <div
    class="assessment-cards"
    id="assessmentContainer">
  </div>

</div>

<!-- ================= DETAILS POPUP ================= -->
<div
  id="detailsModal"
  class="details-modal">

  <div class="details-popup">

    <span
      id="closeModal">
      &times;
    </span>

    <div id="modalBody"></div>

  </div>

</div>

<!-- ================= JS ================= -->
<script src="js/nav.js"></script>
<script src="js/coding.js"></script>

</body>
</html>

```

---

### File: `public/collect-feedback.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collect Feedback</title>
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
  <style>
    :root {
      --bg: #0f172a;
      --surface: #1e293b;
      --primary: #10b981;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
    }

    .container {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 2.5rem;
      width: 100%;
      max-width: 600px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(to right, #34d399, #10b981);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 1.5rem;
      border-radius: 0.75rem;
      border: 1px solid var(--border);
    }

    .form-group label {
      display: block;
      margin-bottom: 0.75rem;
      font-weight: 500;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-group label i {
      color: var(--primary);
    }

    .star-rating {
      display: flex;
      gap: 0.5rem;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    .star-rating input {
      display: none;
    }

    .star-rating label {
      cursor: pointer;
      font-size: 2rem;
      color: #334155;
      transition: color 0.2s;
      margin: 0;
    }

    .star-rating input:checked ~ label,
    .star-rating label:hover,
    .star-rating label:hover ~ label {
      color: #fbbf24;
    }

    select, input[type="text"] {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(0,0,0,0.2);
      border: 1px solid var(--border);
      color: white;
      border-radius: 0.5rem;
      outline: none;
      transition: border-color 0.2s;
    }

    select:focus, input[type="text"]:focus {
      border-color: var(--primary);
    }

    .btn-submit {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
      margin-top: 1rem;
    }

    .btn-submit:hover {
      opacity: 0.9;
    }

    .btn-submit:active {
      transform: scale(0.98);
    }

    @media (max-width: 600px) {
      body {
        padding: 1rem;
      }
      .container {
        padding: 1.5rem;
      }
      .form-group {
        padding: 1rem;
      }
      .star-rating label {
        font-size: 1.8rem;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1>Assessment Feedback</h1>
      <p>Please share your experience so we can improve the platform.</p>
    </div>

    <form id="feedbackForm">
      
      <!-- 1. Overall Rating -->
      <div class="form-group">
        <label><i class="ri-star-line"></i> Overall Assessment Rating</label>
        <div class="star-rating">
          <input type="radio" id="o5" name="overall_rating" value="5" required><label for="o5" class="ri-star-fill"></label>
          <input type="radio" id="o4" name="overall_rating" value="4"><label for="o4" class="ri-star-fill"></label>
          <input type="radio" id="o3" name="overall_rating" value="3"><label for="o3" class="ri-star-fill"></label>
          <input type="radio" id="o2" name="overall_rating" value="2"><label for="o2" class="ri-star-fill"></label>
          <input type="radio" id="o1" name="overall_rating" value="1"><label for="o1" class="ri-star-fill"></label>
        </div>
      </div>

      <!-- 2. Difficulty Rating -->
      <div class="form-group">
        <label><i class="ri-bar-chart-line"></i> Assessment Difficulty</label>
        <div class="star-rating">
          <input type="radio" id="d5" name="difficulty_rating" value="5" required><label for="d5" class="ri-star-fill"></label>
          <input type="radio" id="d4" name="difficulty_rating" value="4"><label for="d4" class="ri-star-fill"></label>
          <input type="radio" id="d3" name="difficulty_rating" value="3"><label for="d3" class="ri-star-fill"></label>
          <input type="radio" id="d2" name="difficulty_rating" value="2"><label for="d2" class="ri-star-fill"></label>
          <input type="radio" id="d1" name="difficulty_rating" value="1"><label for="d1" class="ri-star-fill"></label>
        </div>
      </div>

      <!-- 3. Clarity Rating -->
      <div class="form-group">
        <label><i class="ri-lightbulb-line"></i> Question Clarity</label>
        <div class="star-rating">
          <input type="radio" id="c5" name="clarity_rating" value="5" required><label for="c5" class="ri-star-fill"></label>
          <input type="radio" id="c4" name="clarity_rating" value="4"><label for="c4" class="ri-star-fill"></label>
          <input type="radio" id="c3" name="clarity_rating" value="3"><label for="c3" class="ri-star-fill"></label>
          <input type="radio" id="c2" name="clarity_rating" value="2"><label for="c2" class="ri-star-fill"></label>
          <input type="radio" id="c1" name="clarity_rating" value="1"><label for="c1" class="ri-star-fill"></label>
        </div>
      </div>

      <!-- 4. Platform Experience -->
      <div class="form-group">
        <label><i class="ri-macbook-line"></i> Platform Experience</label>
        <div class="star-rating">
          <input type="radio" id="p5" name="platform_experience" value="5" required><label for="p5" class="ri-star-fill"></label>
          <input type="radio" id="p4" name="platform_experience" value="4"><label for="p4" class="ri-star-fill"></label>
          <input type="radio" id="p3" name="platform_experience" value="3"><label for="p3" class="ri-star-fill"></label>
          <input type="radio" id="p2" name="platform_experience" value="2"><label for="p2" class="ri-star-fill"></label>
          <input type="radio" id="p1" name="platform_experience" value="1"><label for="p1" class="ri-star-fill"></label>
        </div>
      </div>

      <!-- 5. Recommendation -->
      <div class="form-group">
        <label><i class="ri-thumb-up-line"></i> Recommendation</label>
        <select name="recommendation" required>
          <option value="" disabled selected>Select an option</option>
          <option value="Definitely">Definitely</option>
          <option value="Maybe">Maybe</option>
          <option value="No">No</option>
        </select>
      </div>

      <!-- 6. Preferred Type -->
      <div class="form-group">
        <label><i class="ri-file-list-3-line"></i> Preferred Assessment Type</label>
        <select name="preferred_type" required>
          <option value="" disabled selected>Select an option</option>
          <option value="No Preference">No Preference</option>
          <option value="Coding">Coding</option>
          <option value="Objective">Objective</option>
        </select>
      </div>

      <!-- 7. Platform Issues -->
      <div class="form-group">
        <label><i class="ri-error-warning-line"></i> Platform Issues</label>
        <select name="platform_issues" required>
          <option value="" disabled selected>Select an option</option>
          <option value="None">None</option>
          <option value="Lag">Lag / Slow loading</option>
          <option value="Crash">Platform Crashed</option>
          <option value="UI Bug">UI Bug / Glitch</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Submit Feedback</button>

    </form>

    <div id="successMessage" style="display: none; text-align: center; padding: 2rem 0;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin: 0 auto 1.5rem;">
        <i class="ri-check-line"></i>
      </div>
      <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #f8fafc;">Feedback Recorded</h2>
      <p style="color: #94a3b8; margin-bottom: 2rem;">Thank you! Your feedback has been recorded successfully.</p>
      <button class="btn-submit" onclick="window.location.href='assessment.html'" style="max-width: 200px; margin: 0 auto;">Return to Dashboard</button>
    </div>
  </div>

  <script>
    document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const urlParams = new URLSearchParams(window.location.search);
      const assessmentId = urlParams.get('id');
      const studentEmail = localStorage.getItem('userEmail');

      if (!assessmentId || !studentEmail) {
        alert("Missing assessment info or you are not logged in.");
        return;
      }

      const formData = new FormData(e.target);
      const data = {
        assessment_id: assessmentId,
        student_email: studentEmail,
        overall_rating: formData.get('overall_rating'),
        difficulty_rating: formData.get('difficulty_rating'),
        clarity_rating: formData.get('clarity_rating'),
        platform_experience: formData.get('platform_experience'),
        recommendation: formData.get('recommendation'),
        preferred_type: formData.get('preferred_type'),
        platform_issues: formData.get('platform_issues')
      };

      try {
        const res = await fetch("http://localhost:3000/submit-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        
        if (result.success) {
          document.getElementById('feedbackForm').style.display = 'none';
          document.getElementById('successMessage').style.display = 'block';
          document.querySelector('.header').style.display = 'none';
        } else {
          alert("Failed to submit feedback.");
        }
      } catch (err) {
        console.error(err);
        alert("Server error.");
      }
    });
  </script>
</body>
</html>

```

---

### File: `public/control.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Exam Controls</title>

<link rel="stylesheet" href="css/control.css">

<link
href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
rel="stylesheet">
</head>

<body>

<div class="wrap">

  <div class="top">
    <h1>Exam Security Controls</h1>
    <p>Manage anti-cheat settings for this test</p>
  </div>

  <div class="box">

    <input
      id="assessment_id"
      class="field"
      placeholder="Assessment ID">

    <div class="row">
      <label>Enable Fullscreen</label>
      <input type="checkbox" id="fullscreen">
    </div>

    <div class="row">
      <label>Tab Switch Detection</label>
      <input type="checkbox" id="tab_switch">
    </div>

    <div class="row">
      <label>Hover Detection</label>
      <input type="checkbox" id="hover_detection">
    </div>

    <div class="row">
      <label>Disable Copy Paste</label>
      <input type="checkbox" id="copy_paste_block">
    </div>

    <div class="row">
      <label>Webcam</label>
      <input type="checkbox" id="webcam">
    </div>

    <div class="row">
      <label>Mic</label>
      <input type="checkbox" id="mic">
    </div>

    <div class="row">
      <label>Screen Record</label>
      <input type="checkbox" id="screen_record">
    </div>

    <div class="row">
      <label>Show Result After Submit</label>
      <input type="checkbox" id="show_result" checked>
    </div>

    <input
      id="tab_limit"
      class="field"
      type="number"
      value="3"
      placeholder="Tab Limit">

    <input
      id="hover_limit"
      class="field"
      type="number"
      value="3"
      placeholder="Hover Limit">

    <button class="btn" onclick="saveControls()">
      Save Controls
    </button>

    <div id="msg"></div>

  </div>

</div>

<script src="js/control.js"></script>
</body>
</html>

```

---

### File: `public/css/admin.css`

```css
/* admin.css */

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:"Segoe UI",sans-serif;
}

body{
  min-height:100vh;
  background: #070b14;
  color:#ffffff;
  display: flex;
  position: relative;
  overflow: hidden;
}

/* Ambient Deep Light Field */
body::before {
  content: "";
  position: fixed;
  top: -50%; left: -50%; width: 200%; height: 200%;
  pointer-events: none;
  z-index: -2;
  background: 
    radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 20%, rgba(45, 212, 191, 0.15) 0%, transparent 35%);
  filter: blur(80px);
  animation: ambientDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

/* Spatial Mesh Overlay */
body::after {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: -1;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  opacity: 0.8;
}

@keyframes ambientDrift {
  0% { transform: rotate(0deg) scale(1) translate(0, 0); }
  50% { transform: rotate(3deg) scale(1.1) translate(3%, 2%); }
  100% { transform: rotate(-2deg) scale(1.05) translate(-2%, -3%); }
}

/* SIDEBAR */
.sidebar {
  width: 280px;
  position: fixed;
  top: 20px;
  left: 20px;
  height: calc(100vh - 40px);
  border-radius: 24px;
  background: rgba(20, 24, 32, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.logo-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
}

.logo {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #a78bfa;
}

.logo-header h2 {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #ffffff;
}

.nav-menu {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  border-radius: 10px;
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.nav-item i {
  font-size: 20px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.nav-item.active {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  box-shadow: inset 0 0 0 1px rgba(139, 92, 246, 0.4);
}

.nav-item.active i {
  color: #a78bfa;
}

/* MAIN CONTENT */
.main {
  flex: 1;
  margin-left: 320px; /* Offset for the fixed sidebar */
  padding: 40px;
  overflow-y: auto;
  height: 100vh;
}

.tab-content {
  display: none;
  animation: fadeIn 0.4s ease forwards;
}

.tab-content.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* DASHBOARD STATS */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 30px;
}

.stat-card {
  background: rgba(20, 24, 32, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  padding: 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-icon.purple { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
.stat-icon.green { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
.stat-icon.blue { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
.stat-icon.orange { background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.3); }

.stat-info h4 {
  color: #9ca3af;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

.stat-info h2 {
  font-size: 28px;
  color: #ffffff;
  font-weight: 700;
}

.recent-activity {
  background: rgba(20, 24, 32, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  padding: 30px;
  border-radius: 24px;
  margin-top: 30px;
}

.recent-activity h3 {
  font-size: 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

.activity-text p {
  color: #fff;
  font-size: 14px;
  margin-bottom: 4px;
}

.activity-text span {
  color: #9ca3af;
  font-size: 12px;
}

/* ADMIN BOX FOR FORMS */
.admin-box{
  width:600px;
  max-width:100%;
  padding:34px;
  border-radius:24px;
  background:rgba(20, 24, 32, 0.65);
  border:1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(24px);
  box-shadow:0 20px 40px rgba(0,0,0,0.4);
  margin: 0 auto;
}

h1{
  text-align:center;
  margin-bottom:8px;
  font-size:30px;
  letter-spacing: -1px;
}

.sub{
  text-align:center;
  color:#b5b5c3;
  margin:8px 0 28px;
  font-size:14px;
}

.section-title{
  font-size:14px;
  font-weight:700;
  color:#ffffff;
  margin-bottom:14px;
  letter-spacing:.5px;
}

.mt{
  margin-top:26px;
}

.field{
  width:100%;
  height:48px;
  border:none;
  outline:none;
  border-radius:12px;
  padding:0 15px;
  margin-bottom:14px;
  background:rgba(255,255,255,0.07);
  color:#fff;
  font-size:15px;
}

.field::placeholder{
  color:#9ca3af;
}

.area{
  height:95px;
  padding-top:14px;
  resize:none;
}

select.field{
  cursor:pointer;
}

.btn{
  width:100%;
  height:50px;
  border:none;
  border-radius:12px;
  cursor:pointer;
  color:#ffffff;
  font-size:15px;
  font-weight:600;
  background:rgba(139, 92, 246, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(139, 92, 246, 0.4);
  transition:all .3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn:hover{
  background:rgba(139, 92, 246, 1);
  transform: translateY(-2px);
}

.msg{
  min-height:22px;
  margin-top:10px;
  margin-bottom:6px;
  text-align:center;
  font-size:14px;
  color:#10b981;
}

.mini-label{
  display:block;
  color:#b5b5c3;
  font-size:13px;
  margin:-4px 0 8px;
  font-weight:600;
}

.secondary-btn{
  margin-bottom:14px;
  background:rgba(255,255,255,0.07);
  border:1px solid rgba(255,255,255,0.08);
  color: #ffffff;
}

.secondary-btn:hover{
  background: rgba(255,255,255,0.1);
}

#emailBox{
  width:100%;
}

.emailField{
  margin-bottom:14px;
}

/* PROFILE CARD */
.profile-card {
  width: 400px;
  max-width: 100%;
  padding: 40px;
  border-radius: 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(24px);
  margin: 0 auto;
  text-align: center;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ffffff;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #000000;
  border: 4px solid rgba(255,255,255,0.1);
}

.profile-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.profile-role {
  color: #a78bfa;
  font-size: 14px;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.profile-detail {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.profile-detail:last-child {
  border-bottom: none;
}

.profile-detail span:first-child {
  color: #9ca3af;
}

/* MOBILE */
@media(max-width:768px){
  body {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    flex-direction: row;
    overflow-x: auto;
    padding: 15px;
  }
  .logo-header {
    margin-bottom: 0;
    margin-right: 20px;
  }
  .nav-menu {
    flex-direction: row;
  }
  .main {
    padding: 20px;
  }
}


```

---

### File: `public/css/assessment.css`

```css
/* ================= RESET ================= */
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:"Segoe UI",sans-serif;
}

html,
body{
  width:100%;
  min-height:100%;
  overflow-x:hidden;
}

/* ================= BODY ================= */
body{
  background: #070b14;
  color:#ffffff;
  position: relative;
  overflow: hidden;
}

/* Ambient Deep Light Field */
body::before {
  content: "";
  position: fixed;
  top: -50%; left: -50%; width: 200%; height: 200%;
  pointer-events: none;
  z-index: -2;
  background: 
    radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 20%, rgba(45, 212, 191, 0.15) 0%, transparent 35%);
  filter: blur(80px);
  animation: ambientDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

/* Spatial Mesh Overlay */
body::after {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: -1;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  opacity: 0.8;
}

@keyframes ambientDrift {
  0% { transform: rotate(0deg) scale(1) translate(0, 0); }
  50% { transform: rotate(3deg) scale(1.1) translate(3%, 2%); }
  100% { transform: rotate(-2deg) scale(1.05) translate(-2%, -3%); }
}

/* ================= MAIN ================= */
.main{
  margin-left:280px; /* Floating dock spacing */
  min-height:100vh;
  padding:34px 34px 28px;
  transition:.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar.collapsed ~ .main{
  margin-left:84px;
}

/* ================= HEADER ================= */
.header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:20px;
  margin-bottom:28px;
}

.header h1{
  font-size:42px;
  line-height:1.1;
  font-weight:700;
  margin-top:10px;
}

.header p{
  margin-top:8px;
  color:#b5b5c3;
  font-size:18px;
}

/* ================= BADGE ================= */
.badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:7px 14px;
  border-radius:10px;
  background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.1);
  color:#ededed;
  font-size:12px;
  font-weight:600;
}

/* ================= SEARCH ================= */
.search{
  width:290px;
  height:44px;
  border:none;
  outline:none;
  padding:0 16px;
  border-radius:10px;
  background:rgba(255,255,255,0.08);
  color:#fff;
  font-size:14px;
}

.search::placeholder{
  color:#8e8ea0;
}

/* ================= FILTER ================= */
.filters{
  display:flex;
  gap:14px;
  flex-wrap:wrap;
  padding:12px;
  margin-bottom:18px;
  border-radius:14px;
  background:rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}

.filters button,
.sort button{
  border:none;
  outline:none;
  cursor:pointer;
  padding:10px 22px;
  border-radius:12px;
  background:rgba(20, 24, 32, 0.65);
  color:rgba(255, 255, 255, 0.65);
  font-size:14px;
  transition:all .3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255,255,255,0.08);
}

.filters button:hover,
.sort button:hover{
  background:rgba(255,255,255,0.05);
  color: #ffffff;
}

.filters .active{
  background:rgba(139, 92, 246, 0.15);
  color:#a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.4);
}

/* ================= SORT ================= */
.sort{
  display:flex;
  gap:12px;
  margin-bottom:26px;
  flex-wrap:wrap;
}

.sort .active{
  background:rgba(139, 92, 246, 0.15);
  color:#a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.4);
}

/* ================= GRID ================= */
.assessment-cards{
  display:grid;
  grid-template-columns:repeat(3,minmax(320px,1fr));
  gap:22px;
}

/* ================= CARD ================= */
.assessment-card{
  background:rgba(20, 24, 32, 0.65);
  border:1px solid rgba(255,255,255,0.08);
  backdrop-filter:blur(24px);
  border-radius:24px;
  padding:22px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  transition:all .3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow:visible;
  position:relative;
}

.assessment-card:hover{
  transform:translateY(-4px);
  box-shadow:0 14px 28px rgba(0,0,0,.28);
}

/* ================= CARD TOP ================= */
.card-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
}

.card-top h3{
  font-size:18px;
  font-weight:700;
  line-height:1.35;
}

/* ================= STATUS ================= */
.status-badge{
  min-width:90px;
  height:36px;
  padding:0 12px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:30px;
  font-size:13px;
  font-weight:700;
}

.status-badge.live{
  background:rgba(34,197,94,.15);
  color:#22c55e;
}

.status-badge.completed{
  background:rgba(59,130,246,.15);
  color:#60a5fa;
}

.status-badge.missed{
  background:rgba(239,68,68,.15);
  color:#ef4444;
}

.status-badge.locked{
  background:rgba(156,163,175,.15);
  color:#d1d5db;
}

/* ================= TAGS ================= */
.tags{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  margin:14px 0;
}

.tags span{
  padding:6px 12px;
  border-radius:10px;
  background:rgba(255,255,255,0.07);
  color:#ddd;
  font-size:12px;
}

/* ================= DATE ================= */
.date{
  display:flex;
  align-items:center;
  gap:8px;
  padding:12px 14px;
  border-radius:12px;
  background:rgba(255,255,255,0.06);
  color:#ddd;
  font-size:14px;
  margin-bottom:12px;
}

/* ================= SHOW DETAILS ================= */
.toggle-details{
  color:#60a5fa;
  font-size:14px;
  cursor:pointer;
  font-weight:600;
  margin:12px 0;
  display:inline-block;
  transition:.25s ease;
}

.toggle-details:hover{
  color:#8b5cf6;
}

/* ================= MINI GRID ================= */
.card-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin-top:14px;
}

.card-grid div{
  background:rgba(255,255,255,0.05);
  border-radius:12px;
  padding:12px;
  font-size:13px;
  color:#ddd;
  line-height:1.5;
}

/* ================= ACTIONS ================= */
.card-actions{
  display:flex;
  gap:12px;
  margin-top:18px;
}

.btn{
  flex:1;
  border:none;
  outline:none;
  cursor:pointer;
  padding:13px 16px;
  border-radius:28px;
  color:#fff;
  font-size:15px;
  font-weight:600;
  transition:.25s ease;
}

.btn:hover{
  transform:translateY(-2px);
}

.green{
  background:linear-gradient(135deg,#059669,#10b981);
}

.violet{
  background:linear-gradient(135deg,#4f46e5,#7c3aed);
}

.gray{
  background:linear-gradient(135deg,#4b5563,#6b7280);
}

/* ================= POPUP MODAL ================= */
.details-modal{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.72);
  display:none;
  justify-content:center;
  align-items:center;
  z-index:9999;
  padding:20px;
}

.details-modal.show{
  display:flex;
}

.details-popup{
  width:520px;
  max-width:100%;
  max-height:85vh;
  overflow-y:auto;
  background:rgba(15,15,25,.96);
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px;
  padding:24px;
  backdrop-filter:blur(18px);
  box-shadow:0 25px 60px rgba(0,0,0,.45);
  animation:popupShow .28s ease;
}

/* ================= POPUP HEADER ================= */
.popup-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:15px;
  margin-bottom:18px;
}

.popup-header h2{
  font-size:24px;
  font-weight:700;
  color:#fff;
}

#closeModalInside,
#closeModal{
  font-size:28px;
  line-height:1;
  cursor:pointer;
  color:#cfcfe6;
  transition:.2s ease;
}

#closeModalInside:hover,
#closeModal:hover{
  color:#fff;
  transform:scale(1.08);
}

/* ================= POPUP BOX ================= */
.popup-box{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.05);
  border-radius:14px;
  padding:14px 16px;
  margin-bottom:12px;
}

.popup-box h4{
  font-size:13px;
  color:#a78bfa;
  margin-bottom:6px;
}

.popup-box p{
  font-size:14px;
  color:#e5e7eb;
  line-height:1.5;
}


.control-grid{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:10px;
}

.control-tag{
  padding:8px 14px;
  border-radius:20px;
  font-size:13px;
  font-weight:500;
  background:#2a2a3a;
  color:#ccc;
}

/* ON */
.control-tag.on{
  background:#cfe3ff;
  color:#2563eb;
}

/* OFF */
.control-tag.off{
  background:#2a2a3a;
  color:#aaa;
}


/* ================= ANIMATION ================= */
@keyframes popupShow{
  from{
    opacity:0;
    transform:translateY(18px) scale(.96);
  }
  to{
    opacity:1;
    transform:translateY(0) scale(1);
  }
}

/* ================= RESPONSIVE ================= */
@media(max-width:1400px){
  .assessment-cards{
    grid-template-columns:repeat(2,minmax(320px,1fr));
  }
}

@media(max-width:992px){

  .main{
    margin-left:78px;
  }

  .header{
    flex-direction:column;
    align-items:flex-start;
  }

  .search{
    width:100%;
  }

  .assessment-cards{
    grid-template-columns:1fr;
  }

}

@media(max-width:600px){

  .main{
    margin-left:0;
    padding:20px;
    padding-bottom:90px;
  }

  .header h1{
    font-size:32px;
  }

  .card-actions{
    flex-direction:column;
  }

  .card-grid{
    grid-template-columns:1fr;
  }

  .details-popup{
    padding:18px;
    border-radius:16px;
  }

  .popup-header h2{
    font-size:20px;
  }

}
```

---

### File: `public/css/control.css`

```css
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:"Segoe UI",sans-serif;
}

body{
  min-height:100vh;
  padding:30px;
  color:#fff;

  background:
  radial-gradient(circle at top left,#2e1065,transparent 35%),
  radial-gradient(circle at bottom right,#1e1b4b,transparent 35%),
  #05010a;
}

.wrap{
  max-width:760px;
  margin:auto;
}

.top{
  text-align:center;
  margin-bottom:26px;
}

.top h1{
  font-size:34px;
  margin-bottom:8px;
}

.top p{
  color:#a1a1aa;
}

.box{
  padding:30px;
  border-radius:22px;

  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  backdrop-filter:blur(14px);

  box-shadow:0 25px 60px rgba(0,0,0,.35);
}

.field{
  width:100%;
  height:48px;
  border:none;
  outline:none;
  border-radius:12px;
  padding:0 15px;
  margin-bottom:16px;

  background:rgba(255,255,255,.07);
  color:#fff;
  font-size:15px;
}

.row{
  display:flex;
  justify-content:space-between;
  align-items:center;

  padding:14px 16px;
  margin-bottom:14px;

  border-radius:14px;
  background:rgba(255,255,255,.05);
}

.row label{
  font-size:15px;
}

.row input[type="checkbox"]{
  width:20px;
  height:20px;
  accent-color:#7c3aed;
}

.btn{
  width:100%;
  height:52px;
  border:none;
  border-radius:14px;
  cursor:pointer;

  font-size:16px;
  font-weight:700;
  color:#fff;

  background:linear-gradient(135deg,#4f46e5,#7c3aed);
  transition:.25s ease;
}

.btn:hover{
  transform:translateY(-2px);
  opacity:.94;
}

#msg{
  min-height:24px;
  margin-top:14px;
  text-align:center;
  color:#22c55e;
}

@media(max-width:700px){

  body{
    padding:18px;
  }

  .box{
    padding:22px;
  }

  .row{
    gap:12px;
    align-items:flex-start;
    flex-direction:column;
  }

}
```

---

### File: `public/css/dashboard.css`

```css
:root {
  --bg-base: #070b14;

  --sidebar-bg: rgba(20,24,32,0.65);
  --card-bg: rgba(20,24,32,0.65);
  --border: rgba(255,255,255,0.08);

  --primary: #8b5cf6;
  --primary-light: #a78bfa;

  --text-main: #ffffff;
  --text-muted: rgba(255,255,255,0.65);

  --green: #22c55e;
  --blue: #60a5fa;
}

/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", "Segoe UI", sans-serif;
}

/* ================= BACKGROUND ================= */
body {
  display: flex;
  height: 100vh;
  color: var(--text-main);
  background: var(--bg-base);
  position: relative;
  overflow: hidden;
}

/* Ambient Deep Light Field */
body::before {
  content: "";
  position: fixed;
  top: -50%; left: -50%; width: 200%; height: 200%;
  pointer-events: none;
  z-index: -2;
  background: 
    radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 20%, rgba(45, 212, 191, 0.15) 0%, transparent 35%);
  filter: blur(80px);
  animation: ambientDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

/* Spatial Mesh Overlay */
body::after {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: -1;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  opacity: 0.8;
}

@keyframes ambientDrift {
  0% { transform: rotate(0deg) scale(1) translate(0, 0); }
  50% { transform: rotate(3deg) scale(1.1) translate(3%, 2%); }
  100% { transform: rotate(-2deg) scale(1.05) translate(-2%, -3%); }
}



/* ================= MAIN ================= */
.main {
  margin-left: 280px; /* Account for floating sidebar + gap */
  width: calc(100% - 280px);

  height: 100vh;
  overflow-y: auto;

  padding: 40px 50px;
}

/* ================= HEADER ================= */
.header {
  margin-bottom: 35px;
}

.title {
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: var(--text-muted);
}

/* ================= CARDS ================= */
.cards {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.card {
  flex: 1;
  background: rgba(20, 24, 32, 0.45);
  padding: 30px;
  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);

  min-height: 150px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.card p {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card h2 {
  font-size: 42px;
  margin: 14px 0;
  letter-spacing: -1.5px;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* PROGRESS */
.progress {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  margin-top: 16px;
  overflow: hidden;
}

.progress div {
  height: 100%;
  border-radius: 10px;
}

/* COLORS */
.blue { background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
.green { background: #10b981; box-shadow: 0 0 10px #10b981; }
.purple { background: #8b5cf6; box-shadow: 0 0 10px #8b5cf6; }

/* ================= CHARTS ================= */
.charts {
  display: flex;
  gap: 30px;
}

/* CHART BOX */
.chart-box {
  background: rgba(20, 24, 32, 0.45);
  padding: 25px;
  border-radius: 20px;

  border: 1px solid rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.chart-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* BAR CHART */
.chart-box:nth-child(1) {
  flex: 1.5;
  height: 320px;
}

/* MIDDLE CARD */
.chart-box:nth-child(2) {
  flex: 1;
  height: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* DONUT */
.chart-box:nth-child(3) {
  flex: 1;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* TITLES */
.chart-box h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

/* ACTIVITY LIST */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  padding-right: 5px;
}

.activity-list::-webkit-scrollbar {
  width: 4px;
}

.activity-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.activity-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.activity-item .top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-item h4 {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.activity-item span {
  font-size: 12px;
  color: #a1a1aa;
}

/* BAR SIZE */
#barChart {
  width: 100% !important;
  height: 250px !important;
}

/* DONUT SIZE */
#donutChart {
  max-width: 200px;
  margin: auto;
}

/* ================= EDITOR ================= */
.editor {
  margin-top: 40px;
  background: rgba(20, 24, 32, 0.4);
  color: #e2e8f0;
  padding: 25px;
  border-radius: 24px;
  font-family: "Fira Code", monospace;
  position: relative;
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* BADGE */
.badge {
  position: absolute;
  bottom: 15px;
  left: 20px;
  background: rgba(139, 92, 246, 0.1);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: var(--primary-light);
  font-weight: 600;
}

/* BUTTON */
.button {
  position: absolute;
  right: 20px;
  bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 12px;
  color: #ffffff;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
}

.button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* SMALL TEXT */
small {
  color: var(--text-muted);
}
```

---

### File: `public/css/profile.css`

```css
/* ================= PROFILE PAGE STYLES ================= */

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 40px;
}

.profile-card {
  width: 100%;
  max-width: 600px;
  background: rgba(20, 24, 32, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border-radius: 24px;
  padding: 50px 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  text-align: center;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

.profile-card-avatar {
  width: 100px;
  height: 100px;
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 44px;
  font-weight: 700;
  margin: 0 auto 30px auto;
}

.profile-card h1 {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.profile-card p.email {
  color: rgba(255, 255, 255, 0.65);
  font-size: 16px;
  margin-bottom: 24px;
}

.profile-role-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.3);
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.2);
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 30px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 30px;
}

.profile-detail-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-detail-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.profile-detail-text p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.profile-detail-text h3 {
  font-size: 15px;
  color: #ffffff;
  font-weight: 500;
}

```

---

### File: `public/css/sidebar.css`

```css
/* ================= SIDEBAR ================= */
.sidebar {
  position: fixed;
  top: 20px;
  left: 20px;

  width: 240px;
  height: calc(100vh - 40px);
  border-radius: 24px;

  background: rgba(20, 24, 32, 0.65);
  backdrop-filter: blur(24px);

  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);

  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* COLLAPSED */
.sidebar.collapsed {
  width: 84px;
}

/* ================= TOP ================= */
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

/* ================= LOGO ================= */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-text {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  transition: 0.3s;
  letter-spacing: -0.5px;
}

.sidebar.collapsed .logo-text {
  display: none;
}

.sidebar.collapsed .logo {
  justify-content: flex-start;
}

.sidebar.collapsed .top {
  justify-content: center;
  gap: 8px;
}

/* ICON */
.logo-icon {
  width: 42px;
  height: 42px;

  background: rgba(139, 92, 246, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #a78bfa;
  font-size: 20px;
}

/* ================= TOGGLE BUTTON ================= */
.toggle-btn {
  width: 28px;
  height: 28px;

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  color: #ededed;

  transition: 0.3s;
}

/* ROTATE ICON */
.sidebar.collapsed .toggle-btn i {
  transform: rotate(180deg);
}

/* ================= MENU ================= */
.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ================= MENU ITEM ================= */
.menu-item {
  all: unset; /* 🔥 IMPORTANT (button reset) */

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 12px;
  border-radius: 10px;

  color: #a1a1aa;
  cursor: pointer;

  transition: all 0.25s ease;
}

.menu-item i {
  font-size: 19px;
  min-width: 20px;
}

/* COLLAPSED MODE */
.sidebar.collapsed .menu-item {
  justify-content: center;
  padding: 12px 0;
}

.sidebar.collapsed .menu-item i {
  margin: 0;
}

.sidebar.collapsed .menu-item span {
  display: none;
}

/* HOVER */
.menu-item:hover {
  background: rgba(255,255,255,0.05);
  color: #ffffff;
}

/* ACTIVE */
.menu-item.active {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  box-shadow: inset 0 0 0 1px rgba(139, 92, 246, 0.4);
}

/* ================= PROFILE ================= */
.profile {
  margin-top: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
  border-radius: 12px;

  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

/* LEFT */
.profile-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* COLLAPSED PROFILE */
.sidebar.collapsed .profile {
  justify-content: center;
  padding: 10px 0;
  background: transparent;
  border-color: transparent;
}

.sidebar.collapsed .profile-text,
.sidebar.collapsed .logout {
  display: none;
}

/* AVATAR */
.avatar {
  width: 34px;
  height: 34px;
  border-radius: 8px;

  background: #ffffff;
  color: #000000;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 14px;
}

/* TEXT */
.name {
  font-size: 13px;
  color: #fff;
}

.role {
  font-size: 11px;
  color: #b5b5c3;
}

/* LOGOUT */
.logout {
  font-size: 17px;
  color: #b5b5c3;
  cursor: pointer;
  transition: 0.2s;
}

.logout:hover {
  color: #fff;
}

/* ================= MOBILE BOTTOM NAV ================= */
@media (max-width: 600px) {
  .sidebar {
    width: 100% !important;
    height: 65px;
    top: auto;
    bottom: 0;
    flex-direction: row;
    padding: 0 10px;
    justify-content: space-between;
    z-index: 1000;
    border-right: none;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .top { display: none; }
  .menu { 
    flex-direction: row; 
    width: 100%; 
    justify-content: space-around; 
    align-items: center; 
  }
  .menu-item { 
    flex-direction: column; 
    gap: 4px; 
    padding: 8px; 
    border-radius: 8px;
  }
  .menu-item span { display: none; }
  .profile { display: none; }
}
```

---

### File: `public/css/start.css`

```css
body{
  margin:0;
  font-family:"Inter", sans-serif;
  background: #070b14;
  color:#ffffff;
  position: relative;
  overflow: hidden;
  height: 100vh;
}

/* Ambient Deep Light Field */
body::before {
  content: "";
  position: fixed;
  top: -50%; left: -50%; width: 200%; height: 200%;
  pointer-events: none;
  z-index: -2;
  background: 
    radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 20%, rgba(45, 212, 191, 0.15) 0%, transparent 35%);
  filter: blur(80px);
  animation: ambientDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

/* Spatial Mesh Overlay */
body::after {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: -1;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  opacity: 0.8;
}

@keyframes ambientDrift {
  0% { transform: rotate(0deg) scale(1) translate(0, 0); }
  50% { transform: rotate(3deg) scale(1.1) translate(3%, 2%); }
  100% { transform: rotate(-2deg) scale(1.05) translate(-2%, -3%); }
}

/* PAGE CENTER */
.page{
  padding:30px;
  display:flex;
  justify-content:center;
}

/* 🔥 MAIN CARD */
.main-card{
  width:100%;
  max-width:1100px;

  border-radius:24px;
  padding:25px;

  background:rgba(20, 24, 32, 0.65);
  border:1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(24px);

  box-shadow:0 20px 40px rgba(0,0,0,0.4);
}

/* HEADER */
.header{
  text-align:center;
  margin-bottom:20px;
}

.header h1{
  margin:0;
  font-size:32px;
  letter-spacing: -1px;
  color: #ffffff;
}

.header p{
  color: rgba(255, 255, 255, 0.65);
  font-size:14px;
}

/* GRID */
.container{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

/* CARDS */
.card{
  background:rgba(255,255,255,0.02);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:16px;
  padding:20px;
}

/* MONITOR GRID */
.monitor-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin-top:10px;
}

/* FEATURE */
.feature{
  padding:14px;
  border-radius:12px;

  display:flex;
  gap:10px;
  align-items:flex-start;

  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.05);
}

/* ICON */
.feature i{
  font-size:18px;
}

/* ENABLED */
.feature.enabled{
  background:rgba(16, 185, 129, 0.1);
  border:1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

/* DISABLED */
.feature.disabled{
  background:transparent;
  border: 1px solid rgba(255,255,255,0.05);
  color: #52525b;
}

/* BUTTON */
.start-btn{
  width:100%;
  margin:25px 0;
  padding:14px;
  border:none;
  border-radius:12px;

  font-size:16px;
  cursor:pointer;

  background:rgba(139, 92, 246, 0.8);
  color:#ffffff;
  font-weight: 600;
  transition:all .3s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(139, 92, 246, 0.4);
}

.start-btn:hover {
  background:rgba(139, 92, 246, 1);
  transform: translateY(-2px);
}

/* BOTTOM */
.bottom-bar{
  display:flex;
  justify-content:space-between;
  padding-top:15px;
  border-top:1px solid rgba(255,255,255,0.1);
}

.stat{
  text-align:center;
}

.stat i{
  font-size:18px;
  opacity:.7;
}

.stat h2{
  margin:5px 0 0;
}

/* MOBILE */
@media(max-width:768px){
  .page {
    padding: 15px;
  }
  .container{
    grid-template-columns:1fr;
  }
  .monitor-grid{
    grid-template-columns:1fr;
  }
  .bottom-bar{
    flex-direction:column;
    gap:10px;
  }
}
```

---

### File: `public/css/submitted.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  background: #070b14;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Ambient Deep Light Field */
body::before {
  content: "";
  position: fixed;
  top: -50%; left: -50%; width: 200%; height: 200%;
  pointer-events: none;
  z-index: -2;
  background: 
    radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 50% 20%, rgba(45, 212, 191, 0.15) 0%, transparent 35%);
  filter: blur(80px);
  animation: ambientDrift 30s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

/* Spatial Mesh Overlay */
body::after {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: -1;
  background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
  opacity: 0.8;
}

@keyframes ambientDrift {
  0% { transform: rotate(0deg) scale(1) translate(0, 0); }
  50% { transform: rotate(3deg) scale(1.1) translate(3%, 2%); }
  100% { transform: rotate(-2deg) scale(1.05) translate(-2%, -3%); }
}

.submit-container {
  background: rgba(20, 24, 32, 0.65);
  backdrop-filter: blur(24px);
  padding: 50px 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

.icon-circle {
  width: 80px;
  height: 80px;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin: 0 auto 24px auto;
  border: 1px solid rgba(34, 197, 94, 0.3);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #ffffff;
  letter-spacing: -1px;
}

p {
  color: rgba(255, 255, 255, 0.65);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.btn {
  background: rgba(139, 92, 246, 0.8);
  color: #ffffff;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(139, 92, 246, 0.4);
}

.btn:hover {
  background: rgba(139, 92, 246, 1);
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .submit-container {
    padding: 30px 20px;
  }
}

```

---

### File: `public/dashboard.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>

  <link rel="stylesheet" href="css/dashboard.css">
  <link rel="stylesheet" href="css/sidebar.css">

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <link
    href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
    rel="stylesheet"
  >
</head>

<body>

<!-- ================= SIDEBAR ================= -->
<div class="sidebar" id="sidebar">

  <div class="top">

    <div class="logo">
      <div class="logo-icon">
        <i class="ri-book-open-line"></i>
      </div>
      <span class="logo-text">AETHON</span>
    </div>

    <div class="toggle-btn" onclick="toggleSidebar()">
      <i class="ri-arrow-left-s-line"></i>
    </div>

  </div>

<div class="menu">

  <button class="menu-item active"
    onclick="window.location.href='dashboard.html'">
    <i class="ri-layout-grid-line"></i>
    <span>Dashboard</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='assessment.html'">
    <i class="ri-pencil-line"></i>
    <span>Assessments</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='coding.html'">
    <i class="ri-code-s-slash-line"></i>
    <span>Coding Practice</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='profile.html'">
    <i class="ri-user-fill"></i>
    <span>Profile</span>
  </button>

</div>

<div class="profile">

  <div class="profile-left">

    <!-- Avatar -->
    <div class="avatar" id="userAvatar"></div>

    <!-- Name + Role -->
    <div class="profile-text">
      <p class="name" id="userName"></p>
      <span class="role" id="userRole"></span>
    </div>

  </div>

  <i class="ri-logout-box-r-line logout"
     onclick="logout()"
     style="cursor:pointer;"></i>

</div>
</div>



<!-- ================= MAIN ================= -->
<div class="main">

  <div class="header">
    <h1 class="title">Learning Dashboard</h1>
  </div>

  <!-- CARDS -->
  <div class="cards">

    <div class="card">
      <p>Total Assessments</p>
      <h2 id="total">0</h2>

      <div class="progress">
        <div class="blue" id="progress1"></div>
      </div>

      <small id="completedText">0 completed</small>
    </div>

    <div class="card">
      <p>Submission Rate</p>
      <h2 id="submission">0%</h2>

      <div class="progress">
        <div class="green" id="progress2"></div>
      </div>

      <small>Target 85%</small>
    </div>

    <div class="card">
      <p>Average Score</p>
      <h2 id="score">0%</h2>

      <div class="progress">
        <div class="purple" id="progress3"></div>
      </div>

      <small>Target 80%</small>
    </div>

  </div>


  <!-- CHARTS -->
  <div class="charts">

    <div class="chart-box">
      <h3>Monthly Assessment Progress</h3>
      <canvas id="barChart"></canvas>
    </div>

    <div class="chart-box" id="recentActivityBox">
      <h3>Recent Activity</h3>
      <div class="activity-list" id="activityList">
        <!-- populated by JS -->
      </div>
    </div>

    <div class="chart-box">
      <h3>Assessment Status</h3>
      <canvas id="donutChart"></canvas>
    </div>

  </div>

</div>

<script src="js/nav.js"></script>
<script src="js/dashboard.js"></script>

</body>
</html>

```

---

### File: `public/js/admin.js`

```js
let currentTestId = null;
let currentPracticeId = null;

/* =========================
   TAB SWITCHING LOGIC
========================= */
function switchTab(tabId, element) {
  // Update active state in sidebar
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  element.classList.add('active');

  // Show correct tab content
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// Check URL parameters to open specific tab on load
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  if (tab) {
    const tabEl = document.querySelector(`.nav-item[onclick*="'${tab}'"]`);
    if (tabEl) {
      switchTab(tab, tabEl);
    }
  }
});

/* =========================
   GENERATE EMAIL INPUTS
========================= */
function generateEmailInputs(type) {
  const count = parseInt(document.getElementById(type + "_email_count").value);
  const box = document.getElementById(type + "_emailBox");
  box.innerHTML = "";

  if (!count || count <= 0) return;

  for (let i = 1; i <= count; i++) {
    box.innerHTML += `
      <input type="email" class="field ${type}EmailField" placeholder="Student Email ${i}">
    `;
  }
}

/* =========================
   CREATE ASSESSMENT OR PRACTICE
========================= */
async function createAssessment(type) {
  const title = document.getElementById(type + "_title").value.trim();
  const msg = document.getElementById(type + "Msg");
  const emailInputs = document.querySelectorAll(`.${type}EmailField`);

  let emails = [];
  emailInputs.forEach(input => {
    if (input.value.trim() !== "") emails.push(input.value.trim());
  });

  msg.innerText = "";

  if (type === 'test') {
    const start_time = document.getElementById("test_start_time").value;
    const end_time = document.getElementById("test_end_time").value;
    const description = document.getElementById("test_description").value.trim();
    const total_time = document.getElementById("test_time").value;

    if (!title || !start_time || !end_time || !total_time) {
      msg.style.color = "#ff6b6b";
      msg.innerText = "Fill all fields";
      return;
    }

    try {
      const res = await fetch("/create-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, start_time, end_time, description, total_time, emails: emails.join(",")
        })
      });
      const data = await res.json();
      if (data.success) {
        currentTestId = data.testId;
        msg.style.color = "#22c55e";
        msg.innerText = "Test Created Successfully";
      } else {
        msg.style.color = "#ff6b6b";
        msg.innerText = "Failed To Create";
      }
    } catch (error) {
      msg.style.color = "#ff6b6b"; msg.innerText = "Server Error";
    }

  } else {
    // Practice
    if (!title) {
      msg.style.color = "#ff6b6b";
      msg.innerText = "Title is required";
      return;
    }

    try {
      const res = await fetch("/create-practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, emails: emails.join(",") })
      });
      const data = await res.json();
      if (data.success) {
        currentPracticeId = data.practiceId;
        msg.style.color = "#22c55e";
        msg.innerText = "Practice Created Successfully";
      } else {
        msg.style.color = "#ff6b6b";
        msg.innerText = "Failed To Create";
      }
    } catch (error) {
      msg.style.color = "#ff6b6b"; msg.innerText = "Server Error";
    }
  }
}

/* =========================
   OPEN SECURITY CONTROLS
========================= */
function openControls(){
  if(!currentTestId){
    alert("Create Test First");
    return;
  }
  window.open("control.html?id=" + currentTestId, "_blank");
}


/* =========================
   SAVE JSON QUESTIONS
========================= */
async function saveJsonQuestions(type) {
  const msg = document.getElementById(type + "_jsonMsg");
  msg.innerText = "";

  const targetId = type === 'test' ? currentTestId : currentPracticeId;

  if (!targetId) {
    msg.style.color = "#ff6b6b";
    msg.innerText = `Create ${type === 'test' ? 'Test' : 'Practice'} First`;
    return;
  }

  const file = document.getElementById(type + "_jsonFile").files[0];
  if (!file) {
    msg.style.color = "#ff6b6b";
    msg.innerText = "Choose JSON File";
    return;
  }

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const questions = JSON.parse(e.target.result);
      if (!Array.isArray(questions)) {
        msg.style.color = "#ff6b6b";
        msg.innerText = "JSON Must Be Array";
        return;
      }

      const endpoint = type === 'test' ? "/save-question" : "/save-practice-question";
      const payload = type === 'test' 
        ? { assessment_id: targetId, questions: questions }
        : { practice_id: targetId, questions: questions };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        msg.style.color = "#22c55e";
        msg.innerText = "Questions Uploaded Successfully";
      } else {
        msg.style.color = "#ff6b6b";
        msg.innerText = data.error || "Upload Failed";
      }
    } catch (error) {
      console.log(error);
      msg.style.color = "#ff6b6b";
      msg.innerText = "Upload Failed";
    }
  };
  reader.readAsText(file);
}
```

---

### File: `public/js/assessment.js`

```js
document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("assessmentContainer");
  const searchInput = document.querySelector(".search");
  const filterButtons = document.querySelectorAll(".filters button");
  const modal = document.getElementById("detailsModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.getElementById("closeModal");

  let assessments = [];
  let currentFilter = "All";

  const userEmail =
    localStorage.getItem("userEmail") ||
    sessionStorage.getItem("userEmail");

  if (!userEmail) {
    window.location.href = "login.html";
    return;
  }

  /* ==========================
     LOAD DATA
  ========================== */
  async function loadAssessments() {
    try {
      const res = await fetch(`/student-assessments?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();

      assessments = data.map(item => ({
        id: item.id,
        title: item.title,
        marks: item.marks,
        questions: item.questions,
        description: item.description || "Assessment created by admin",
        start_time: item.start_time,
        end_time: item.end_time,
        total_time: item.total_time,
        submitted: item.submitted || 0,
        feedback_given: item.feedback_given > 0,
        show_result: item.show_result !== null ? item.show_result : 1,
        score: item.score || 0,
        test_type: 'test'
      }));

      window.assessments = assessments;
      renderCards();

    } catch (error) {
      console.log(error);
      container.innerHTML = "<p style='color:red'>Unable to load assessments</p>";
    }
  }

  /* ==========================
     STATUS
  ========================== */
  function getStatus(a) {
    const now = new Date();
    const start = new Date(a.start_time);
    const end = new Date(a.end_time);

    if (a.submitted == 1) return "Completed";
    if (now < start) return "Locked";
    if (now >= start && now <= end) return "Live";

    return "Missed";
  }

  function getStatusClass(status) {
    if (status === "Live") return "live";
    if (status === "Completed") return "completed";
    if (status === "Missed") return "missed";
    return "locked";
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  /* ==========================
     BUTTONS
  ========================== */
  function getButtons(a) {
    const status = getStatus(a);

    if (status === "Locked") {
      return `<button class="btn gray" disabled>Starts Soon</button>`;
    }

    if (status === "Live") {
      return `<button class="btn green" onclick="startTest(${a.id}, '${a.test_type}')">Start ${a.test_type === 'practice' ? 'Practice' : 'Test'} →</button>`;
    }

    if (status === "Missed") {
      return `<button class="btn gray" disabled>Missed</button>`;
    }

    // Completed status
    
    // Check if it's a practice
    if (a.test_type === "practice") {
      return `
        <button class="btn" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 500; cursor: pointer; width: 100%;" onclick="startTest(${a.id}, 'practice')">Finished - Redo Practice ↺</button>
      `;
    }

    if (!a.feedback_given) {
      return `
        <button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: pointer;" onclick="window.location.href='collect-feedback.html?id=${a.id}'">Give Feedback <i class="ri-arrow-right-line"></i></button>
        <button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: rgba(255,255,255,0.05); color: #888; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: not-allowed;">View Results <i class="ri-arrow-right-line"></i></button>
      `;
    }

    let resultsBtn = `<button class="btn violet" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: pointer;" onclick="window.location.href='results.html?id=${a.id}'">View Results <i class="ri-arrow-right-line"></i></button>`;
    
    if (a.show_result === 0) {
      resultsBtn = `<button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: rgba(255,255,255,0.05); color: #888; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: not-allowed;">Results pending release</button>`;
    }

    return `
      <button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: pointer;" onclick="window.location.href='view-feedback.html?id=${a.id}'">View Feedback <i class="ri-arrow-right-line"></i></button>
      ${resultsBtn}
    `;
  }

  /* ==========================
     CARD
  ========================== */
  function createCard(a) {

    const status = getStatus(a);
    const statusClass = getStatusClass(status);

    return `
    <div class="assessment-card">

      <div class="card-top">
        <h3>${a.title}</h3>
        <div class="status-badge ${statusClass}">
          ${status}
        </div>
      </div>

      <div class="tags">
        <span>Assessment</span>
        <span>${status}</span>
      </div>

      <div class="date">
        <i class="ri-calendar-line"></i>
        Start: ${formatDate(a.start_time)}
      </div>

      <p class="toggle-details"
         onclick="showDetails(${a.id})">
         Show Details
      </p>

      <div class="card-grid">

        <div>
          <p>Total Marks</p>
          <span>${a.marks}</span>
        </div>

        <div>
          <p>Questions</p>
          <span>${a.questions}</span>
        </div>

      </div>

      <div class="card-actions">
        ${getButtons(a)}
      </div>

    </div>
    `;
  }

  /* ==========================
     RENDER
  ========================== */
  function renderCards() {

    let filtered = [...assessments];

    if (currentFilter !== "All") {
      filtered = filtered.filter(a => {
        const status = getStatus(a);

        if (currentFilter === "Available") {
          return status === "Locked" || status === "Live";
        }

        return status === currentFilter;
      });
    }

    const key = searchInput.value.toLowerCase().trim();

    if (key !== "") {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(key)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML =
        "<p style='color:#aaa'>No assessments found</p>";
      return;
    }

    container.innerHTML =
      filtered.map(createCard).join("");
  }

  /* ==========================
     EVENTS
  ========================== */
  if (searchInput) {
    searchInput.addEventListener("input", renderCards);
  }

  filterButtons.forEach(btn => {
    btn.onclick = () => {
      filterButtons.forEach(b =>
        b.classList.remove("active")
      );

      btn.classList.add("active");
      currentFilter = btn.innerText.trim();
      renderCards();
    };
  });

  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.classList.remove("show");

    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    };
  }

  setInterval(renderCards, 30000);
  loadAssessments();

});

/* ==========================
   SHOW DETAILS (FINAL)
========================== */
async function showDetails(id){

  try{

    const res = await fetch(`/assessment/${id}`);
    const data = await res.json();

    const c = data.controls || {};

    document.getElementById("modalBody").innerHTML = `

      <div class="popup-header">
        <h2>${data.title}</h2>
      </div>

      <div class="popup-box">
        <h4>Description</h4>
        <p>${data.description || "No Description"}</p>
      </div>

      <div class="popup-box">
        <h4>Duration</h4>
        <p>${data.duration ? data.duration + ' Minutes' : 'N/A'}</p>
      </div>

      <div class="popup-box">
        <h4>Monitoring Features</h4>

        <div class="control-grid">

          ${tag("Screen Record", c.recordScreen)}
          ${tag("Webcam", c.recordWebcam)}
          ${tag("Microphone", c.recordWebmic)}
          ${tag("Copy Paste", c.preventCopyPaste)}
          ${tag("Tab Switch", c.preventTabSwitch)}
          ${tag("Fullscreen", c.requireFullscreen)}

        </div>

      </div>

      <div class="popup-box">
        <h4>Score</h4>
        <p>${data.score || 0}%</p>
      </div>

    `;

    document.getElementById("detailsModal")
      .classList.add("show");

  }catch(err){
    console.log(err);
    alert("Failed to load details");
  }
}

/* ==========================
   CLOSE DETAILS
========================== */
function closeDetails(){
  document
    .getElementById("detailsModal")
    .classList.remove("show");
}

/* ==========================
   START TEST / PRACTICE
========================== */
function startTest(id, type = 'test') {
  const currentEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail") || "guest@student.com";

  if (type === 'practice') {
    // Redirect directly to the react app practice route with email
    window.location.href = `http://localhost:5173/practice/${id}?email=${encodeURIComponent(currentEmail)}`;
  } else {
    // Normal test route through start.html
    window.location.href = "start.html?id=" + id;
  }
}



function tag(name, value){
  const enabled = Number(value) === 1;

  return `
    <span class="control-tag ${enabled ? "on" : "off"}">
      ${name}: ${enabled ? "On" : "Off"}
    </span>
  `;
}


```

---

### File: `public/js/auth.js`

```js
/* =========================
   auth.js (FINAL - WORKING)
========================= */

async function login(){

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value.trim();

  const msg =
    document.getElementById("msg");

  msg.innerText = "";

  if(email === "" || password === ""){
    msg.innerText = "Enter email and password";
    return;
  }

  try{

    const res = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if(data.success){

      /* =========================
         CLEAR OLD DATA
      ========================== */
      localStorage.clear();
      sessionStorage.clear();

      /* =========================
         NAME GENERATION FROM EMAIL
      ========================== */
      let name = data.name;

      if(!name){

        const username = data.email.split("@")[0];

        // remove numbers
        const clean = username.replace(/[0-9]/g, '');

        // extract words
        const words = clean.match(/[a-z]+/gi);

        if(words){
          name = words
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        }else{
          name = "User";
        }
      }

      /* =========================
         STORE SESSION DATA
      ========================== */
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("role", data.role);

      /* =========================
         REDIRECT BASED ON ROLE
      ========================== */
      if(data.role === "admin"){
        window.location.href = "admin.html";
      }else{
        window.location.href = "dashboard.html";
      }

    }else{
      msg.innerText = "Invalid email or password";
    }

  }catch(error){
    console.log(error);
    msg.innerText = "Server error";
  }

}

/* =========================
   FORGOT PASSWORD FLOW
========================= */

function showForgot() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('reset-section').style.display = 'none';
  document.getElementById('forgot-section').style.display = 'block';
  document.getElementById('msg').innerText = '';
}

function showLogin() {
  document.getElementById('forgot-section').style.display = 'none';
  document.getElementById('reset-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('msg').innerText = '';
  document.getElementById('msg').style.color = '#ff7b7b';
}

async function sendOtp() {
  const email = document.getElementById("forgot-email").value.trim();
  const msg = document.getElementById("msg");
  if (!email) {
    msg.style.color = "#ff7b7b";
    msg.innerText = "Enter your email";
    return;
  }
  
  try {
    const res = await fetch("/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('forgot-section').style.display = 'none';
      document.getElementById('reset-section').style.display = 'block';
      msg.style.color = "#a78bfa";
      msg.innerText = "OTP sent to your email! (Check terminal)";
    } else {
      msg.style.color = "#ff7b7b";
      msg.innerText = data.error || "Failed to send OTP";
    }
  } catch(error) {
    msg.style.color = "#ff7b7b";
    msg.innerText = "Server error";
  }
}

async function resetPassword() {
  const email = document.getElementById("forgot-email").value.trim();
  const otp = document.getElementById("reset-otp").value.trim();
  const newPassword = document.getElementById("reset-password").value.trim();
  const msg = document.getElementById("msg");
  
  if (!otp || !newPassword) {
    msg.style.color = "#ff7b7b";
    msg.innerText = "Enter OTP and New Password";
    return;
  }
  
  try {
    const res = await fetch("/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword })
    });
    const data = await res.json();
    if (data.success) {
      msg.style.color = "#22c55e";
      msg.innerText = "Password updated successfully!";
      setTimeout(() => { showLogin(); }, 2000);
    } else {
      msg.style.color = "#ff7b7b";
      msg.innerText = data.error || "Invalid OTP";
    }
  } catch(error) {
    msg.style.color = "#ff7b7b";
    msg.innerText = "Server error";
  }
}
```

---

### File: `public/js/coding.js`

```js
document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("assessmentContainer");
  const searchInput = document.querySelector(".search");
  const filterButtons = document.querySelectorAll(".filters button");
  const modal = document.getElementById("detailsModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.getElementById("closeModal");

  let assessments = [];
  let currentFilter = "All";

  const userEmail =
    localStorage.getItem("userEmail") ||
    sessionStorage.getItem("userEmail");

  if (!userEmail) {
    window.location.href = "login.html";
    return;
  }

  /* ==========================
     LOAD DATA
  ========================== */
  async function loadAssessments() {
    try {
      const pRes = await fetch(`/student-practices/${encodeURIComponent(userEmail)}`);
      const pData = await pRes.json();

      assessments = pData.map(item => ({
        id: item.id,
        title: item.title,
        marks: null,
        questions: null,
        description: "Coding Practice",
        start_time: item.created_at, // use created_at as it's always open
        end_time: "2099-12-31T23:59:59", // always open
        total_time: 0,
        submitted: item.submitted || 0,
        feedback_given: true, // skip feedback logic for practice
        show_result: 1,
        score: 0,
        test_type: 'practice'
      }));

      window.assessments = assessments;
      renderCards();

    } catch (error) {
      console.log(error);
      container.innerHTML = "<p style='color:red'>Unable to load practices</p>";
    }
  }

  /* ==========================
     STATUS
  ========================== */
  function getStatus(a) {
    const now = new Date();
    const start = new Date(a.start_time);
    const end = new Date(a.end_time);

    if (a.submitted == 1) return "Completed";
    if (now < start) return "Locked";
    if (now >= start && now <= end) return "Live";

    return "Missed";
  }

  function getStatusClass(status) {
    if (status === "Live") return "live";
    if (status === "Completed") return "completed";
    if (status === "Missed") return "missed";
    return "locked";
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  /* ==========================
     BUTTONS
  ========================== */
  function getButtons(a) {
    const status = getStatus(a);

    if (status === "Locked") {
      return `<button class="btn gray" disabled>Starts Soon</button>`;
    }

    if (status === "Live") {
      return `<button class="btn green" onclick="startTest(${a.id}, '${a.test_type}')">Start ${a.test_type === 'practice' ? 'Practice' : 'Test'} →</button>`;
    }

    if (status === "Missed") {
      return `<button class="btn gray" disabled>Missed</button>`;
    }

    // Completed status
    
    // Check if it's a practice
    if (a.test_type === "practice") {
      return `
        <button class="btn" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 500; cursor: pointer; width: 100%;" onclick="startTest(${a.id}, 'practice')">Finished - Redo Practice ↺</button>
      `;
    }

    // Normal Test completion
    if (!a.feedback_given) {
      return `
        <button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: pointer;" onclick="window.location.href='collect-feedback.html?id=${a.id}'">Give Feedback <i class="ri-arrow-right-line"></i></button>
        <button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: rgba(255,255,255,0.05); color: #888; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: not-allowed;">View Results <i class="ri-arrow-right-line"></i></button>
      `;
    }

    let resultsBtn = `<button class="btn violet" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: pointer;" onclick="window.location.href='results.html?id=${a.id}'">View Results <i class="ri-arrow-right-line"></i></button>`;
    
    if (a.show_result === 0) {
      resultsBtn = `<button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: rgba(255,255,255,0.05); color: #888; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: not-allowed;">Results pending release</button>`;
    }

    return `
      <button class="btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; font-weight: 600; cursor: pointer;" onclick="window.location.href='view-feedback.html?id=${a.id}'">View Feedback <i class="ri-arrow-right-line"></i></button>
      ${resultsBtn}
    `;
  }

  /* ==========================
     CARD
  ========================== */
  function createCard(a) {

    const status = getStatus(a);
    const statusClass = getStatusClass(status);

    return `
    <div class="assessment-card">

      <div class="card-top">
        <h3>${a.title}</h3>
        <div class="status-badge ${statusClass}">
          ${status}
        </div>
      </div>

      <div class="tags">
        <span>Assessment</span>
        <span>${status}</span>
      </div>

      <div class="date">
        <i class="ri-calendar-line"></i>
        Start: ${formatDate(a.start_time)}
      </div>

      <p class="toggle-details"
         onclick="showDetails(${a.id})">
         Show Details
      </p>

      <div class="card-grid">

        <div>
          <p>Total Marks</p>
          <span>${a.marks}</span>
        </div>

        <div>
          <p>Questions</p>
          <span>${a.questions}</span>
        </div>

      </div>

      <div class="card-actions">
        ${getButtons(a)}
      </div>

    </div>
    `;
  }

  /* ==========================
     RENDER
  ========================== */
  function renderCards() {

    let filtered = [...assessments];

    if (currentFilter !== "All") {
      filtered = filtered.filter(a => {
        const status = getStatus(a);

        if (currentFilter === "Available") {
          return status === "Locked" || status === "Live";
        }

        return status === currentFilter;
      });
    }

    const key = searchInput.value.toLowerCase().trim();

    if (key !== "") {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(key)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML =
        "<p style='color:#aaa'>No assessments found</p>";
      return;
    }

    container.innerHTML =
      filtered.map(createCard).join("");
  }

  /* ==========================
     EVENTS
  ========================== */
  if (searchInput) {
    searchInput.addEventListener("input", renderCards);
  }

  filterButtons.forEach(btn => {
    btn.onclick = () => {
      filterButtons.forEach(b =>
        b.classList.remove("active")
      );

      btn.classList.add("active");
      currentFilter = btn.innerText.trim();
      renderCards();
    };
  });

  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.classList.remove("show");

    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    };
  }

  setInterval(renderCards, 30000);
  loadAssessments();

});

/* ==========================
   SHOW DETAILS (FINAL)
========================== */
async function showDetails(id){

  try{

    const res = await fetch(`/assessment/${id}`);
    const data = await res.json();

    const c = data.controls || {};

    document.getElementById("modalBody").innerHTML = `

      <div class="popup-header">
        <h2>${data.title}</h2>
      </div>

      <div class="popup-box">
        <h4>Description</h4>
        <p>${data.description || "No Description"}</p>
      </div>

      <div class="popup-box">
        <h4>Duration</h4>
        <p>${data.duration ? data.duration + ' Minutes' : 'N/A'}</p>
      </div>

      <div class="popup-box">
        <h4>Monitoring Features</h4>

        <div class="control-grid">

          ${tag("Screen Record", c.recordScreen)}
          ${tag("Webcam", c.recordWebcam)}
          ${tag("Microphone", c.recordWebmic)}
          ${tag("Copy Paste", c.preventCopyPaste)}
          ${tag("Tab Switch", c.preventTabSwitch)}
          ${tag("Fullscreen", c.requireFullscreen)}

        </div>

      </div>

      <div class="popup-box">
        <h4>Score</h4>
        <p>${data.score || 0}%</p>
      </div>

    `;

    document.getElementById("detailsModal")
      .classList.add("show");

  }catch(err){
    console.log(err);
    alert("Failed to load details");
  }
}

/* ==========================
   CLOSE DETAILS
========================== */
function closeDetails(){
  document
    .getElementById("detailsModal")
    .classList.remove("show");
}

/* ==========================
   START TEST / PRACTICE
========================== */
function startTest(id, type = 'test') {
  const currentEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail") || "guest@student.com";
  
  if (type === 'practice') {
    const mainDiv = document.querySelector(".main");
    
    // Hide all direct children of .main
    Array.from(mainDiv.children).forEach(child => {
      child.style.display = "none";
    });
    
    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.id = "practiceIframe";
    iframe.src = `http://localhost:5173/practice/${id}?email=${encodeURIComponent(currentEmail)}`;
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    iframe.style.borderRadius = "16px";
    
    mainDiv.appendChild(iframe);
    
    // Remove padding from main so iframe fits perfectly
    mainDiv.dataset.originalPadding = mainDiv.style.padding;
    mainDiv.style.padding = "0";
    
  } else {
    // Normal test route through start.html
    window.location.href = "start.html?id=" + id;
  }
}

/* ==========================
   IFRAME COMMUNICATION
========================== */
window.addEventListener("message", (event) => {
  if (event.data && event.data.action === 'close_practice') {
    const iframe = document.getElementById("practiceIframe");
    if (iframe) {
      iframe.remove();
    }
    
    const mainDiv = document.querySelector(".main");
    
    // Restore padding
    if (mainDiv.dataset.originalPadding !== undefined) {
      mainDiv.style.padding = mainDiv.dataset.originalPadding;
    } else {
      mainDiv.style.padding = ""; // Reset to CSS default
    }
    
    // Show all direct children of .main again
    Array.from(mainDiv.children).forEach(child => {
      if (child.className === "assessment-cards") {
        child.style.display = "grid"; // or whatever display it had
      } else {
        child.style.display = "flex"; // default for header/filters
      }
    });
    
    // Refresh cards
    loadAssessments();
  }
});



function tag(name, value){
  const enabled = Number(value) === 1;

  return `
    <span class="control-tag ${enabled ? "on" : "off"}">
      ${name}: ${enabled ? "On" : "Off"}
    </span>
  `;
}


```

---

### File: `public/js/control.js`

```js
window.onload = () => {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const id = params.get("id");

  if(id){
    document.getElementById(
      "assessment_id"
    ).value = id;
  }

};

async function saveControls(){

  const msg =
    document.getElementById("msg");

  const data = {

    assessment_id:
      document.getElementById("assessment_id").value,

    fullscreen:
      fullscreen.checked ? 1 : 0,

    tab_switch:
      tab_switch.checked ? 1 : 0,

    hover_detection:
      hover_detection.checked ? 1 : 0,

    copy_paste_block:
      copy_paste_block.checked ? 1 : 0,

    webcam:
      webcam.checked ? 1 : 0,

    mic:
      mic.checked ? 1 : 0,

    screen_record:
      screen_record.checked ? 1 : 0,

    show_result:
      show_result.checked ? 1 : 0,

    tab_limit:
      tab_limit.value || 3,

    hover_limit:
      hover_limit.value || 3,

    auto_submit_time: 1,
    auto_submit_tab: 1,
    auto_submit_hover: 1,
    auto_submit_fullscreen: 1
  };

  try{

    const res = await fetch(
      "/save-controls",
      {
        method:"POST",
        headers:{
          "Content-Type":
          "application/json"
        },
        body:JSON.stringify(data)
      }
    );

    const result =
      await res.json();

    if(result.success){

      msg.style.color =
        "#22c55e";

      msg.innerText =
        "Controls Saved";

    }else{

      msg.style.color =
        "#ef4444";

      msg.innerText =
        "Failed";

    }

  }catch(err){

    msg.style.color =
      "#ef4444";

    msg.innerText =
      "Server Error";

  }

}
```

---

### File: `public/js/dashboard.js`

```js
document.addEventListener("DOMContentLoaded", () => {

  const userEmail =
    localStorage.getItem("userEmail") ||
    sessionStorage.getItem("userEmail");

  if (!userEmail) {
    window.location.href = "login.html";
    return;
  }

  let barChart;
  let donutChart;
  let lineChart;

  /* =========================
     LOAD DASHBOARD DATA
  ========================= */
  async function loadDashboard() {

    try {

      const res = await fetch(
        `http://localhost:3000/student-assessments?email=${encodeURIComponent(userEmail)}`
      );

      const rows = await res.json();

      const total = rows.length;

      const completed =
        rows.filter(x =>
          x.submitted == 1
        ).length;

      const missed =
        rows.filter(x => {

          if (x.submitted == 1)
            return false;

          return new Date(x.due_date)
            < new Date();

        }).length;

      const available =
        total - completed - missed;

      const submissionRate =
        total === 0
          ? 0
          : Math.round(
              (completed / total) * 100
            );

      const avgScore =
        total === 0
          ? 0
          : Math.round(
              rows.reduce(
                (sum, x) =>
                  sum +
                  (Number(x.score) || 0),
                0
              ) / total
            );

      const highestScore =
        rows.length === 0
          ? 0
          : Math.max(
              ...rows.map(
                x => Number(x.score) || 0
              )
            );

      updateCards({
        total,
        completed,
        submissionRate,
        avgScore,
        highestScore
      });

      createBarChart(rows);

      createDonutChart(
        completed,
        missed,
        available
      );

      createLineChart(rows);

      populateActivity(rows);

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    }
  }

  /* =========================
     ACTIVITY LIST
  ========================= */
  function populateActivity(rows) {
    const list = document.getElementById("activityList");
    if (!list) return;
    
    list.innerHTML = "";

    if (rows.length === 0) {
      list.innerHTML = `<p style="font-size:13px; color:rgba(255,255,255,0.5);">No recent activity.</p>`;
      return;
    }

    // Sort by most recently assigned/due
    const sorted = [...rows].sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    
    // Take top 4
    const recent = sorted.slice(0, 4);

    recent.forEach(item => {
      const isSubmitted = item.submitted == 1;
      const statusColor = isSubmitted ? "#10b981" : "#8b5cf6";
      const statusText = isSubmitted ? "Completed" : "Assigned";
      
      const div = document.createElement("div");
      div.className = "activity-item";
      div.innerHTML = `
        <div class="top-row">
          <h4>${item.title || "Assessment"}</h4>
          <span style="color: ${statusColor}; font-weight: 600;">${statusText}</span>
        </div>
        <span>Due: ${new Date(item.due_date).toLocaleDateString()}</span>
      `;
      list.appendChild(div);
    });
  }

  /* =========================
     UPDATE TOP CARDS
  ========================= */
  function updateCards(data) {

    document.getElementById("total").innerText =
      data.total;

    document.getElementById("submission").innerText =
      data.submissionRate + "%";

    document.getElementById("score").innerText =
      data.avgScore + "%";

    document.getElementById("completedText").innerText =
      data.completed + " completed";

    document.getElementById("progress1").style.width =
      data.total === 0
        ? "0%"
        : (
            (data.completed /
              data.total) * 100
          ) + "%";

    document.getElementById("progress2").style.width =
      data.submissionRate + "%";

    document.getElementById("progress3").style.width =
      data.avgScore + "%";
  }

  /* =========================
     BAR CHART
  ========================= */
  function createBarChart(rows) {

    const months = {};
    const attempted = {};

    rows.forEach(item => {

      const d =
        new Date(item.due_date);

      const label =
        d.getFullYear() + "-" +
        String(
          d.getMonth() + 1
        ).padStart(2, "0");

      months[label] =
        (months[label] || 0) + 1;

      if (item.submitted == 1) {

        attempted[label] =
          (attempted[label] || 0) + 1;
      }

    });

    const labels =
      Object.keys(months);

    const assignedData =
      labels.map(x =>
        months[x]
      );

    const attemptedData =
      labels.map(x =>
        attempted[x] || 0
      );

    if (barChart)
      barChart.destroy();

    const canvasBar = document.getElementById("barChart");
    const ctxBar = canvasBar.getContext("2d");

    const gradPurple = ctxBar.createLinearGradient(0, 0, 0, 300);
    gradPurple.addColorStop(0, "rgba(167, 139, 250, 0.9)");
    gradPurple.addColorStop(1, "rgba(124, 58, 237, 0.6)");

    const gradGreen = ctxBar.createLinearGradient(0, 0, 0, 300);
    gradGreen.addColorStop(0, "rgba(52, 211, 153, 0.9)");
    gradGreen.addColorStop(1, "rgba(16, 185, 129, 0.6)");

    barChart = new Chart(
      canvasBar,
      {
        type: "bar",

        data: {
          labels,

          datasets: [

            {
              label: "Assigned",
              data: assignedData,
              backgroundColor: gradPurple,
              borderRadius: 6,
              borderSkipped: false,
              maxBarThickness: 32
            },

            {
              label: "Attempted",
              data: attemptedData,
              backgroundColor: gradGreen,
              borderRadius: 6,
              borderSkipped: false,
              maxBarThickness: 32
            }

          ]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              labels: {
                color:
                  "#b5b5c3"
              }
            }
          },

          scales: {
            x: {
              ticks: {
                color:
                  "#b5b5c3"
              },
              grid: {
                display:false
              }
            },

            y: {
              ticks: {
                color:
                  "#b5b5c3",
                stepSize:1
              },
              grid: {
                display: false
              },
              border: {
                display: false
              }
            }
          }
        }
      }
    );
  }

  /* =========================
     DONUT CHART
  ========================= */
  function createDonutChart(
    completed,
    missed,
    available
  ) {

    if (donutChart)
      donutChart.destroy();

    const canvasDonut = document.getElementById("donutChart");
    const ctxDonut = canvasDonut.getContext("2d");

    const gradBlue = ctxDonut.createLinearGradient(0, 0, 0, 200);
    gradBlue.addColorStop(0, "#60a5fa");
    gradBlue.addColorStop(1, "#3b82f6");

    const gradOrange = ctxDonut.createLinearGradient(0, 0, 0, 200);
    gradOrange.addColorStop(0, "#fbbf24");
    gradOrange.addColorStop(1, "#f59e0b");

    const gradPurpleD = ctxDonut.createLinearGradient(0, 0, 0, 200);
    gradPurpleD.addColorStop(0, "#a78bfa");
    gradPurpleD.addColorStop(1, "#7c3aed");

    donutChart = new Chart(
      canvasDonut,
      {
        type: "doughnut",

        data: {
          labels: [
            "Submitted",
            "Missed",
            "Upcoming"
          ],

          datasets: [{
            data: [
              completed,
              missed,
              available
            ],

            backgroundColor: [
              gradBlue,
              gradOrange,
              gradPurpleD
            ],

            borderWidth: 2,
            borderColor: "rgba(20, 24, 32, 0.65)",
            hoverOffset: 4
          }]
        },

        options: {
          cutout: "72%",

          plugins: {
            legend: {
              position:
                "bottom",

              labels: {
                color:
                  "#b5b5c3",
                padding:15,
                usePointStyle:true
              }
            }
          }
        }
      }
    );
  }

  /* =========================
     LINE CHART (Score Trend)
  ========================= */
  function createLineChart(rows) {

    const labels =
      rows.map((x, i) =>
        "A" + (i + 1)
      );

    const scores =
      rows.map(x =>
        Number(x.score) || 0
      );

    const canvas =
      document.getElementById("lineChart");

    if (!canvas) return;

    if (lineChart)
      lineChart.destroy();

    lineChart = new Chart(
      canvas,
      {
        type: "line",

        data: {
          labels,

          datasets: [{
            label: "Scores",
            data: scores,
            borderColor:
              "#7c3aed",
            backgroundColor:
              "rgba(124,58,237,0.18)",
            tension: 0.4,
            fill: true,
            pointRadius: 4
          }]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              labels: {
                color:
                  "#b5b5c3"
              }
            }
          },

          scales: {
            x: {
              ticks: {
                color:
                  "#b5b5c3"
              },
              grid: {
                display:false
              }
            },

            y: {
              ticks: {
                color:
                  "#b5b5c3"
              },
              grid: {
                color:
                "rgba(255,255,255,0.08)"
              }
            }
          }
        }
      }
    );
  }

  /* =========================
     START
  ========================= */
  loadDashboard();

});

```

---

### File: `public/js/nav.js`

```js
/* =========================
   nav.js (FINAL)
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= USER DETAILS ================= */

  const name =
    localStorage.getItem("userName");

  const role =
    localStorage.getItem("role");

  const userName =
    document.getElementById("userName");

  const userAvatar =
    document.getElementById("userAvatar");

  const userRole =
    document.getElementById("userRole");

  /* show only if exists */
  if(name){

    if(userName)
      userName.innerText = name;

    if(userAvatar)
      userAvatar.innerText =
        name.charAt(0).toUpperCase();

  }

  if(role && userRole){

    userRole.innerText =
      role === "admin"
        ? "Admin"
        : "Student";

  }


  /* ================= MENU NAV ================= */

  const menuItems =
    document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {

    item.addEventListener("click", () => {

      const text =
        item.innerText.trim();

      if(text.includes("Dashboard")){
        window.location.href = "dashboard.html";
      }

      else if(text.includes("Assessments")){
        window.location.href = "assessment.html";
      }

      else if(text.includes("Coding Practice")){
        window.location.href = "coding.html";
      }

      else if(text.includes("Profile")){
        window.location.href = "profile.html";
      }

    });

  });

});


/* ================= LOGOUT ================= */

function logout(){

  localStorage.clear();
  sessionStorage.clear();

  window.location.href = "login.html";

}

/* ================= SIDEBAR TOGGLE ================= */

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}
```

---

### File: `public/js/profile.js`

```js
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("userName") || "User";
  const email = localStorage.getItem("userEmail") || "Not provided";
  const role = localStorage.getItem("role") || "student";
  
  // These might not exist in localStorage yet, using fallbacks
  const phone = localStorage.getItem("userPhone") || "Update in Settings";
  const college = localStorage.getItem("userCollege") || "PSVPEC College";
  const roll = localStorage.getItem("userRoll") || "Not Assigned";

  const pageName = document.getElementById("pageName");
  const pageRole = document.getElementById("pageRole");
  const pageAvatar = document.getElementById("pageAvatar");
  
  const pageEmailFull = document.getElementById("pageEmailFull");
  const pagePhone = document.getElementById("pagePhone");
  const pageCollege = document.getElementById("pageCollege");
  const pageRoll = document.getElementById("pageRoll");

  if (pageName) pageName.innerText = name;
  if (pageEmailFull) pageEmailFull.innerText = email;
  if (pagePhone) pagePhone.innerText = phone;
  if (pageCollege) pageCollege.innerText = college;
  if (pageRoll) pageRoll.innerText = roll;

  if (pageRole) {
    if (role === "admin") {
      pageRole.innerText = "Administrator";
      pageRole.style.background = "rgba(139, 92, 246, 0.15)";
      pageRole.style.color = "#a78bfa";
      pageRole.style.borderColor = "rgba(139, 92, 246, 0.3)";
      pageRole.style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.2)";
    } else {
      pageRole.innerText = "Student";
    }
  }

  if (pageAvatar) {
    pageAvatar.innerText = name.charAt(0).toUpperCase();
  }
});

```

---

### File: `public/js/start.js`

```js
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

```

---

### File: `public/login.html`

```html
<!-- login.html (UPDATED FULL CODE) -->

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AETHON Login</title>

<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Segoe UI,sans-serif;
}

body{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:
  radial-gradient(circle at top left,#2e1065,transparent 35%),
  radial-gradient(circle at bottom right,#1e1b4b,transparent 35%),
  #05010a;
}

.login-box{
  width:390px;
  max-width: 100%;
  padding:35px;
  border-radius:18px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  backdrop-filter:blur(14px);
  color:#fff;
}

.logo{
  width:60px;
  height:60px;
  margin:auto;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:28px;
  background:linear-gradient(135deg,#7c3aed,#9333ea);
}

h1{
  text-align:center;
  margin-top:18px;
}

.sub{
  text-align:center;
  margin:8px 0 25px;
  color:#aaa;
}

.field{
  margin-bottom:15px;
  position:relative;
}

.field i{
  position:absolute;
  left:14px;
  top:50%;
  transform:translateY(-50%);
  color:#aaa;
}

.field input{
  width:100%;
  padding:14px 14px 14px 42px;
  border:none;
  outline:none;
  border-radius:12px;
  background:rgba(255,255,255,.07);
  color:#fff;
}

.btn{
  width:100%;
  padding:14px;
  border:none;
  border-radius:14px;
  cursor:pointer;
  color:#fff;
  font-weight:600;
  margin-top:8px;
  background:linear-gradient(135deg,#4f46e5,#7c3aed);
}

.msg{
  margin-top:14px;
  text-align:center;
  color:#ff7b7b;
  min-height:22px;
}

@media (max-width: 480px) {
  .login-box {
    width: 100%;
    margin: 15px;
    padding: 25px 20px;
  }
}
</style>
</head>

<body>

<div class="login-box" id="auth-container">

  <div class="logo">
    <i class="ri-book-open-line"></i>
  </div>

  <div id="login-section">
    <h1>AETHON</h1>
    <p class="sub">Login to continue</p>

    <div class="field">
      <i class="ri-mail-line"></i>
      <input type="text" id="email" placeholder="Email">
    </div>

    <div class="field">
      <i class="ri-lock-line"></i>
      <input type="password" id="password" placeholder="Password">
    </div>

    <div style="text-align: center; margin-bottom: 15px;">
      <a href="#" onclick="showForgot()" style="color: #a78bfa; text-decoration: none; font-size: 14px;">Forgot Password?</a>
    </div>

    <button class="btn" onclick="login()">Login</button>
  </div>

  <div id="forgot-section" style="display: none;">
    <h1>Reset Password</h1>
    <p class="sub">Enter your email to receive an OTP</p>

    <div class="field">
      <i class="ri-mail-line"></i>
      <input type="text" id="forgot-email" placeholder="Email">
    </div>

    <button class="btn" onclick="sendOtp()">Send OTP</button>
    <div style="text-align: center; margin-top: 15px;">
      <a href="#" onclick="showLogin()" style="color: #a78bfa; text-decoration: none; font-size: 14px;">Back to Login</a>
    </div>
  </div>

  <div id="reset-section" style="display: none;">
    <h1>Verify OTP</h1>
    <p class="sub">Enter the OTP sent to your email</p>

    <div class="field">
      <i class="ri-key-2-line"></i>
      <input type="text" id="reset-otp" placeholder="4-Digit OTP">
    </div>

    <div class="field">
      <i class="ri-lock-line"></i>
      <input type="password" id="reset-password" placeholder="New Password">
    </div>

    <button class="btn" onclick="resetPassword()">Update Password</button>
  </div>

  <div class="msg" id="msg"></div>

</div>

<script src="js/auth.js"></script>

</body>
</html>

```

---

### File: `public/profile.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Profile</title>

  <link rel="stylesheet" href="css/dashboard.css">
  <link rel="stylesheet" href="css/sidebar.css">
  <link rel="stylesheet" href="css/profile.css">

  <link
    href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
    rel="stylesheet"
  >
</head>

<body>

<!-- ================= SIDEBAR ================= -->
<div class="sidebar" id="sidebar">

  <div class="top">

    <div class="logo">
      <div class="logo-icon">
        <i class="ri-book-open-line"></i>
      </div>
      <span class="logo-text">AETHON</span>
    </div>

    <div class="toggle-btn" onclick="toggleSidebar()">
      <i class="ri-arrow-left-s-line"></i>
    </div>

  </div>

<div class="menu">

  <button class="menu-item"
    onclick="window.location.href='dashboard.html'">
    <i class="ri-layout-grid-line"></i>
    <span>Dashboard</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='assessment.html'">
    <i class="ri-pencil-line"></i>
    <span>Assessments</span>
  </button>

  <button class="menu-item"
    onclick="window.location.href='coding.html'">
    <i class="ri-code-s-slash-line"></i>
    <span>Coding Practice</span>
  </button>

  <button class="menu-item active"
    onclick="window.location.href='profile.html'">
    <i class="ri-user-fill"></i>
    <span>Profile</span>
  </button>

</div>

<div class="profile">

  <div class="profile-left">

    <!-- Avatar -->
    <div class="avatar" id="userAvatar"></div>

    <!-- Name + Role -->
    <div class="profile-text">
      <p class="name" id="userName"></p>
      <span class="role" id="userRole"></span>
    </div>

  </div>

  <i class="ri-logout-box-r-line logout"
     onclick="logout()"
     style="cursor:pointer;"></i>

</div>
</div>



<!-- ================= MAIN ================= -->
<div class="main">

  <div class="header">
    <h1 class="title">My Profile</h1>
  </div>

  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-card-avatar" id="pageAvatar">
        <i class="ri-user-smile-fill"></i>
      </div>
      <h1 id="pageName">Loading...</h1>
      
      <div class="profile-role-badge" id="pageRole">
        Loading Role
      </div>

      <div class="profile-details">
        
        <div class="profile-detail-item">
          <div class="profile-detail-icon"><i class="ri-mail-fill"></i></div>
          <div class="profile-detail-text">
            <p>Email Address</p>
            <h3 id="pageEmailFull">loading@AETHON.com</h3>
          </div>
        </div>

        <div class="profile-detail-item">
          <div class="profile-detail-icon"><i class="ri-phone-fill"></i></div>
          <div class="profile-detail-text">
            <p>Phone Number</p>
            <h3 id="pagePhone">+91 XXXXX XXXXX</h3>
          </div>
        </div>

        <div class="profile-detail-item">
          <div class="profile-detail-icon"><i class="ri-building-4-fill"></i></div>
          <div class="profile-detail-text">
            <p>College</p>
            <h3 id="pageCollege">PSVPEC College</h3>
          </div>
        </div>

        <div class="profile-detail-item">
          <div class="profile-detail-icon"><i class="ri-id-card-fill"></i></div>
          <div class="profile-detail-text">
            <p>Roll Number</p>
            <h3 id="pageRoll">XXXXXXX</h3>
          </div>
        </div>

      </div>

    </div>
  </div>

</div>

<script src="js/nav.js"></script>
<script src="js/profile.js"></script>

</body>
</html>

```

---

### File: `public/results.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assessment Results</title>
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
  <style>
    :root {
      --bg: #0f172a;
      --surface: #1e293b;
      --surface-light: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --primary: #6366f1;
      --border: rgba(255, 255, 255, 0.1);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
    body { background-color: var(--bg); color: var(--text); padding: 2rem; }
    .container { max-width: 800px; margin: 0 auto; }
    
    .back-btn {
      color: var(--text-muted); text-decoration: none; display: inline-flex;
      align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.2s;
    }
    .back-btn:hover { color: var(--text); }

    .header-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 1rem; padding: 2rem; margin-bottom: 2rem;
      text-align: center;
    }
    .header-card h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #3b82f6; }
    .header-card p { color: var(--text-muted); font-size: 0.9rem; }

    .lb-table {
      width: 100%; border-collapse: collapse; background: var(--surface);
      border-radius: 1rem; overflow: hidden;
    }
    .lb-table th, .lb-table td {
      padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid var(--border);
    }
    .lb-table th { color: var(--text-muted); font-weight: 500; font-size: 0.9rem; background: var(--surface-light); }
    .lb-table tr:last-child td { border-bottom: none; }
    
    .rank-badge {
      width: 30px; height: 30px; border-radius: 50%; background: var(--surface-light);
      display: flex; align-items: center; justify-content: center; font-weight: bold;
    }
    .rank-1 { background: #fbbf24; color: #78350f; }
    .rank-2 { background: #cbd5e1; color: #334155; }
    .rank-3 { background: #d97706; color: #78350f; }

    .loading { text-align: center; padding: 4rem; color: var(--text-muted); }
  </style>
</head>
<body>

  <div class="container">
    <a href="admin.html" class="back-btn">
      <i class="ri-arrow-left-line"></i> Back to Dashboard
    </a>

    <div id="loading" class="loading">Loading results...</div>

    <div id="results-content" style="display: none;">
      
      <div class="header-card">
        <h1><i class="ri-trophy-line"></i> <span id="r-title">Assessment</span></h1>
        <p>Results for <span id="r-date"></span> (Duration: <span id="r-duration"></span> mins)</p>
      </div>

      <table class="lb-table">
        <thead>
          <tr>
            <th width="80">Rank</th>
            <th>Student</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody id="lb-body"></tbody>
      </table>

    </div>
  </div>

  <script>
    async function loadResults() {
      const urlParams = new URLSearchParams(window.location.search);
      const assessmentId = urlParams.get('id');
      const studentEmail = localStorage.getItem('userEmail') || 'admin';

      if (!assessmentId) {
        document.getElementById('loading').innerText = "Missing assessment ID.";
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/results/analytics/${assessmentId}/${studentEmail}`);
        const data = await res.json();

        if (data.error) {
          document.getElementById('loading').innerText = "Results not found.";
          return;
        }

        document.getElementById('r-title').innerText = data.assessment.title;
        document.getElementById('r-date').innerText = new Date(data.assessment.start_time).toLocaleDateString();
        document.getElementById('r-duration').innerText = data.assessment.duration;

        let lbHtml = '';
        if (data.leaderboard.length === 0) {
          lbHtml = '<tr><td colspan="3" style="text-align:center; padding:2rem; color:#94a3b8;">No students have submitted yet.</td></tr>';
        } else {
          data.leaderboard.forEach((lb, i) => {
            let rankClass = `rank-${i+1}`;
            let rankUi = i < 3 ? `<div class="rank-badge ${rankClass}">${i+1}</div>` : `<div class="rank-badge">${i+1}</div>`;
            lbHtml += `
              <tr>
                <td>${rankUi}</td>
                <td style="font-weight:500;">${lb.student_email}</td>
                <td><span style="font-size:1.2rem;font-weight:bold;color:#10b981;">${lb.score}</span></td>
              </tr>
            `;
          });
        }
        document.getElementById('lb-body').innerHTML = lbHtml;

        document.getElementById('loading').style.display = 'none';
        document.getElementById('results-content').style.display = 'block';

      } catch (err) {
        console.error(err);
        document.getElementById('loading').innerText = "Error loading results.";
      }
    }

    loadResults();
  </script>
</body>
</html>

```

---

### File: `public/signup.html`

```html
<!DOCTYPE html><html><body>
<h2>Signup</h2>
<input id='email' placeholder='Email'>
<input id='password' placeholder='Password'>
<button onclick='signup()'>Signup</button>
<script src='js/auth.js'></script>
</body></html>

```

---

### File: `public/start.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Start Assessment</title>

<link rel="stylesheet" href="css/start.css">

<link href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" rel="stylesheet">
</head>

<body>

<div class="page">

  <!-- 🔥 MAIN BIG CARD -->
  <div class="main-card">

    <!-- HEADER -->
    <div class="header">
      <h1 id="title">Loading...</h1>
      <p>Assessment created via admin panel</p>
    </div>

    <!-- CONTENT -->
    <div class="container">

      <!-- INSTRUCTIONS -->
      <div class="card instructions">
        <h3>Assessment Instructions</h3>
        <ul>
          <li>Use a stable internet connection.</li>
          <li>Do not switch tabs or minimize your browser.</li>
          <li>Automatic submission after 3 tab switches.</li>
          <li>Automatic submission when the time ends.</li>
          <li>All questions are mandatory.</li>
          <li>You can flag questions for review.</li>
          <li>Keep your device charged or plugged in during the assessment.</li>
          <li>Ensure webcam and microphone (if required) are working before starting.</li>
          <li>Do not refresh or close your browser during the test.</li>
          <li>Allow necessary browser permissions (camera, microphone, screen recording) if required.</li>
          <li>Read all questions carefully before answering.</li>
          <li>Click Submit after finishing your assessment.</li>
        </ul>
      </div>

      <!-- MONITORING -->
      <div class="card monitor-card">
        <h3>Monitoring & Integrity</h3>

        <div class="monitor-grid" id="featuresContainer">
          <!-- JS WILL INSERT FEATURES -->
        </div>

      </div>

    </div>

    <!-- START BUTTON -->
    <button id="startBtn" class="start-btn">
      Start Assessment →
    </button>
    <!-- BOTTOM STATS -->
    <div class="bottom-bar">

      <div class="stat">
        <i class="ri-time-line"></i>
        <small>Duration</small>
        <h2 id="duration">--</h2>
      </div>

      <div class="stat">
        <i class="ri-question-line"></i>
        <small>Questions</small>
        <h2 id="questions">--</h2>
      </div>

      <div class="stat">
        <i class="ri-trophy-line"></i>
        <small>Total Marks</small>
        <h2 id="marks">--</h2>
      </div>

    </div>

  </div>

</div>

<script src="js/start.js"></script>

</body>
</html>


```

---

### File: `public/submitted.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Submitted</title>
  <link rel="stylesheet" href="css/submitted.css">
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body>

  <div class="submit-container">
    <div class="icon-circle">
      <i class="ri-check-line"></i>
    </div>
    
    <h1>Test Submitted Successfully!</h1>
    <p>Your assessment has been recorded and submitted to the instructor. You may now return to your dashboard.</p>
    
    <button class="btn" style="margin-bottom: 12px; background: linear-gradient(135deg, #10b981, #059669);" onclick="goToFeedback()">
      Give Feedback
    </button>
    <button class="btn" style="background: rgba(255, 255, 255, 0.1);" onclick="window.location.href='dashboard.html'">
      Go Back to Dashboard
    </button>
  </div>

  <script>
    function goToFeedback() {
      const urlParams = new URLSearchParams(window.location.search);
      const assessmentId = urlParams.get('id');
      if (assessmentId) {
        window.location.href = `collect-feedback.html?id=${assessmentId}`;
      } else {
        // Fallback if ID is missing (though it shouldn't be in the new flow)
        window.location.href = `assessment.html`;
      }
    }
  </script>

</body>
</html>

```

---

### File: `public/test-admin.html`

```html
<!-- test-admin.html -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Quick Admin Test</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Segoe UI,sans-serif;
}

body{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:20px;

  background:
  radial-gradient(circle at top left,#2e1065,transparent 35%),
  radial-gradient(circle at bottom right,#1e1b4b,transparent 35%),
  #05010a;

  color:#fff;
}

.box{
  width:460px;
  max-width:100%;
  padding:30px;
  border-radius:20px;

  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
}

h1{
  text-align:center;
  margin-bottom:22px;
}

input,textarea,select{
  width:100%;
  height:46px;
  margin-bottom:12px;
  border:none;
  outline:none;
  border-radius:12px;
  padding:0 14px;

  background:rgba(255,255,255,.07);
  color:#fff;
}

textarea{
  height:90px;
  padding-top:12px;
  resize:none;
}

button{
  width:100%;
  height:48px;
  border:none;
  border-radius:14px;
  cursor:pointer;
  font-weight:700;
  color:#fff;
  margin-bottom:12px;

  background:linear-gradient(135deg,#4f46e5,#7c3aed);
}

.msg{
  text-align:center;
  min-height:22px;
  color:#22c55e;
}
</style>
</head>

<body>

<div class="box">

<h1>Quick Test Panel</h1>

<input id="title" placeholder="Test Title">
<input id="date" type="date">
<textarea id="description" placeholder="Description"></textarea>
<input id="time" type="number" placeholder="Total Time">

<button onclick="createTest()">
Create Test
</button>

<hr style="margin:15px 0;border-color:#333;">

<input id="section" placeholder="Section Name">
<input id="question" placeholder="Question">
<input id="a" placeholder="Option A">
<input id="b" placeholder="Option B">
<input id="c" placeholder="Option C">
<input id="d" placeholder="Option D">
<input id="answer" placeholder="Correct Answer">
<input id="marks" type="number" placeholder="Marks">

<select id="difficulty">
<option>Easy</option>
<option>Medium</option>
<option>Hard</option>
</select>

<button onclick="saveQuestion()">
Save Question
</button>

<div class="msg" id="msg"></div>

</div>

<script>

let currentTestId = null;

async function createTest(){

const title =
document.getElementById("title").value;

const date =
document.getElementById("date").value;

const description =
document.getElementById("description").value;

const time =
document.getElementById("time").value;

const res = await fetch("/create-test",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title,
date,
description,
total_time:time
})
});

const data = await res.json();

if(data.success){

currentTestId = data.testId;

msg.innerText =
"Test Created ID: "+data.testId;

}else{

msg.innerText =
"Create Failed";

}

}

async function saveQuestion(){

if(!currentTestId){
msg.innerText =
"Create Test First";
return;
}

const res = await fetch("/save-question",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

assessment_id:currentTestId,
section_name:
document.getElementById("section").value,

question_type:"mcq",

question_text:
document.getElementById("question").value,

option_a:
document.getElementById("a").value,

option_b:
document.getElementById("b").value,

option_c:
document.getElementById("c").value,

option_d:
document.getElementById("d").value,

correct_answer:
document.getElementById("answer").value,

difficulty:
document.getElementById("difficulty").value,

marks:
document.getElementById("marks").value

})
});

const data = await res.json();

if(data.success){

msg.innerText =
"Question Saved";

}else{

msg.innerText =
"Save Failed";

}

}

</script>

</body>
</html>

```

---

### File: `public/view-feedback.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>View Feedback</title>
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
  <style>
    :root {
      --bg: #0f172a;
      --surface: #1e293b;
      --card-bg: rgba(255, 255, 255, 0.03);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --primary: #10b981;
      --border: rgba(255, 255, 255, 0.1);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    
    body {
      background-color: var(--bg);
      color: var(--text);
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border);
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .back-btn {
      color: var(--text-muted);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.2s;
    }

    .back-btn:hover {
      color: var(--text);
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 120px;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      color: #e2e8f0;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .card-header i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }

    .icon-blue { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
    .icon-purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
    .icon-green { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
    .icon-orange { background: rgba(249, 115, 22, 0.2); color: #fb923c; }

    .card-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .stars {
      display: flex;
      gap: 0.25rem;
      color: #fbbf24;
      font-size: 1.5rem;
    }

    .stars i.empty {
      color: #334155;
    }

    .score-text {
      font-size: 1.5rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .badge {
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .badge-green { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
    .badge-blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); }
    .badge-orange { background: rgba(249, 115, 22, 0.1); color: #f97316; border: 1px solid rgba(249, 115, 22, 0.2); }

    .loading {
      text-align: center;
      padding: 4rem;
      color: var(--text-muted);
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }
      .grid-container {
        grid-template-columns: 1fr;
      }
      .card-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  </style>
</head>
<body>

  <div class="header">
    <a href="assessment.html" class="back-btn">
      <i class="ri-arrow-left-line"></i> Back
    </a>
    <h1>Review Feedback</h1>
  </div>

  <div id="loading" class="loading">Loading feedback data...</div>
  
  <div id="content" class="grid-container" style="display: none;">
    
    <!-- Left Column (Ratings) -->
    <div class="col">
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <i class="ri-star-line icon-blue"></i> Overall Assessment Rating
        </div>
        <div class="card-content">
          <div class="stars" id="stars-overall"></div>
          <div class="score-text"><span id="val-overall"></span>/5</div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <i class="ri-bar-chart-line icon-purple"></i> Assessment Difficulty
        </div>
        <div class="card-content">
          <div class="stars" id="stars-diff"></div>
          <div class="score-text"><span id="val-diff"></span>/5</div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <i class="ri-lightbulb-line icon-green"></i> Question Clarity
        </div>
        <div class="card-content">
          <div class="stars" id="stars-clarity"></div>
          <div class="score-text"><span id="val-clarity"></span>/5</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="ri-macbook-line icon-blue"></i> Platform Experience
        </div>
        <div class="card-content">
          <div class="stars" id="stars-exp"></div>
          <div class="score-text"><span id="val-exp"></span>/5</div>
        </div>
      </div>
    </div>

    <!-- Right Column (Text/Selects) -->
    <div class="col">
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <i class="ri-thumb-up-line icon-green"></i> Recommendation
        </div>
        <div class="card-content">
          <div class="badge badge-green" id="val-rec">Definitely</div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <i class="ri-file-list-3-line icon-blue"></i> Preferred Assessment Type
        </div>
        <div class="card-content">
          <div class="badge badge-blue" id="val-pref">No Preference</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="ri-error-warning-line icon-orange"></i> Platform Issues
        </div>
        <div class="card-content">
          <div class="badge badge-orange" id="val-iss">None</div>
        </div>
      </div>
    </div>

  </div>

  <script>
    function generateStars(rating) {
      let html = '';
      for(let i=1; i<=5; i++) {
        if (i <= rating) {
          html += '<i class="ri-star-fill"></i>';
        } else {
          html += '<i class="ri-star-fill empty"></i>';
        }
      }
      return html;
    }

    async function loadFeedback() {
      const urlParams = new URLSearchParams(window.location.search);
      const assessmentId = urlParams.get('id');
      const studentEmail = localStorage.getItem('userEmail');

      if (!assessmentId || !studentEmail) {
        document.getElementById('loading').innerText = "Missing parameters.";
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/feedback/${assessmentId}/${studentEmail}`);
        const data = await res.json();

        if (!data) {
          document.getElementById('loading').innerText = "Feedback not found.";
          return;
        }

        // Ratings
        document.getElementById('val-overall').innerText = data.overall_rating;
        document.getElementById('stars-overall').innerHTML = generateStars(data.overall_rating);

        document.getElementById('val-diff').innerText = data.difficulty_rating;
        document.getElementById('stars-diff').innerHTML = generateStars(data.difficulty_rating);

        document.getElementById('val-clarity').innerText = data.clarity_rating;
        document.getElementById('stars-clarity').innerHTML = generateStars(data.clarity_rating);

        document.getElementById('val-exp').innerText = data.platform_experience;
        document.getElementById('stars-exp').innerHTML = generateStars(data.platform_experience);

        // Text
        document.getElementById('val-rec').innerText = data.recommendation;
        document.getElementById('val-pref').innerText = data.preferred_type;
        document.getElementById('val-iss').innerText = data.platform_issues;

        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'grid';

      } catch (err) {
        console.error(err);
        document.getElementById('loading').innerText = "Error loading feedback.";
      }
    }

    loadFeedback();
  </script>
</body>
</html>

```

---

### File: `react-app/eslint.config.js`

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])

```

---

### File: `react-app/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>examate-ui</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

---

### File: `react-app/package.json`

```json
{
  "name": "examate-ui",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@monaco-editor/react": "^4.7.0",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "react-router-dom": "^7.15.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.2.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.5.0",
    "vite": "^8.0.10"
  }
}

```

---

### File: `react-app/src/App.css`

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

---

### File: `react-app/src/App.jsx`

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import PracticePage from "./pages/PracticePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/practice/:id" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### File: `react-app/src/coding.css`

```css
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* BODY */
body {
  background: #1e1e2f;
  color: white;
  font-family: Arial;
}

/* CONTAINER */
.container {
  width: 100%;
  height: 100vh;
}

/* HEADER */
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #2c2c3c;
}

.timer-center {
  background: #444;
  padding: 6px 12px;
  border-radius: 6px;
}

/* MAIN */
.main {
  display: flex;
  height: calc(100vh - 60px);
  width: 100%;
}

/* SIDEBAR */
.qnav {
  width: 220px;
  min-width: 220px;
  background: #2a2a3a;
  padding: 10px;
  border-right: 1px solid #555;
}

.section-label {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;
}

/* QUESTIONS */
.q-item {
  padding: 8px;
  margin-bottom: 8px;
  background: #3a3a4a;
  border-radius: 4px;
  cursor: pointer;
}

.q-item.active {
  background: #555;
}

/* FULL PAGE VIEW */
.fullpage {
  flex: 1;
  padding: 20px;
}

/* CODING LEFT */
.left {
  width: 40%;
  border-right: 1px solid #555;
}

/* CODING RIGHT */
.right {
  width: 60%;
  overflow: hidden;
}

/* TABS */
.tabs {
  display: flex;
  background: #333;
}

.tabs label {
  padding: 10px;
  cursor: pointer;
}

/* CONTENT */
.content {
  padding: 10px;
}

.content1,
.content2,
.content3,
.content4 {
  display: none;
}

#tab1:checked ~ .content .content1,
#tab2:checked ~ .content .content2,
#tab3:checked ~ .content .content3,
#tab4:checked ~ .content .content4 {
  display: block;
}

/* EDITOR HEADER */
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #2c2c3c;
  width: 100%;
  box-sizing: border-box;
}

/* FIX BUTTON OVERFLOW */
.editor-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* BUTTONS */
.btn {
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
}

.run {
  background: green;
}

.submit {
  background: purple;
}
/* QUESTION TEXT */
.question-text {
  margin: 15px 0;
  font-size: 18px;
  color: #ddd;
}

/* OPTIONS */
.options {
  margin-top: 20px;
}

.option {
  padding: 10px;
  margin-bottom: 10px;
  background: #2f2f40;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.option:hover {
  background: #3f3f55;
}

.option.selected {
  background: #6c5ce7;
  color: white;
}
```

---

### File: `react-app/src/CodingPage.jsx`

```javascript
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "./coding.css";

function CodingPage() {
  const { id } = useParams();

  const [language, setLanguage] = useState("java");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);

  // 🔥 FETCH DATA FROM BACKEND
useEffect(() => {
  fetch(`http://localhost:3000/assessment-full/${id}`)
    .then(res => res.json())
    .then(data => {

      console.log("API DATA:", data);

      // 🔥 HANDLE ALL POSSIBLE FORMATS
      let rawQuestions = [];

      if (typeof data.questions === "string") {
        try {
          rawQuestions = JSON.parse(data.questions);
        } catch (e) {
          console.error("JSON parse error:", e);
          rawQuestions = [];
        }
      } else if (Array.isArray(data.questions)) {
        rawQuestions = data.questions;
      } else if (typeof data.questions === "object" && data.questions !== null) {
        rawQuestions = Object.values(data.questions);
      }

      console.log("RAW QUESTIONS:", rawQuestions);
      console.log("TYPE:", typeof data.questions);
      const formattedQuestions = rawQuestions.map(q => ({
        id: q.id,
        title: q.question_title || "Question",
        problem: q.question_text,
        section: q.section_name,
        type: q.question_type,
        options: q.question_type === "mcq"
          ? [q.option_a, q.option_b, q.option_c, q.option_d]
          : null
      }));

      console.log("FORMATTED:", formattedQuestions);
      setAssessment(data.assessment || {});
      setQuestions(formattedQuestions);

    })
    .catch(err => console.error(err));

}, [id]);

  // 🛑 LOADING STATE
  if (!assessment || questions.length === 0) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  const current = questions[activeQuestion];

  const codeTemplates = {
    java: `public class Solution {
  public static void main(String[] args){
  //write your code here
  }
}`,
    python: `def solution():
    # write your code
    return None
print(solution())`
  };

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <h2>{assessment.title || "Assessment Page"}</h2>
        <div className="timer-center">00:30:00</div>
        <div className="top-actions">
          <button className="btn submit">Submit</button>
        </div>
      </div>

      <div className="main">

        {/* LEFT SIDEBAR */}
        <div className="qnav">
          <p className="section-label">
            {current.section || "Section"}
          </p>

          {questions.map((q, index) => (
            <div
              key={index}
              className={`q-item ${activeQuestion === index ? "active" : ""}`}
              onClick={() => {
                setActiveQuestion(index);
                setSelectedOption(null);
              }}
            >
              <strong>{q.id}. {q.title}</strong>
            </div>
          ))}
        </div>

        {/* 🔥 MCQ / APTITUDE */}
        {current.section !== "Coding" ? (
          <div className="fullpage">

            <h2>{current.title}</h2>
            <p className="question-text">{current.problem}</p>

            <div className="options">
              {current.options ? current.options.map((opt, i) => (
                <div
                  key={i}
                  className={`option ${selectedOption === opt ? "selected" : ""}`}
                  onClick={() => setSelectedOption(opt)}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </div>
              )) : <p>No options available</p>}
            </div>

          </div>
        ) : (

          /* 💻 CODING VIEW */
          <>
            <div className="left">
              <div className="tabs-container">
                <input type="radio" name="tab" id="tab1" defaultChecked />
                <input type="radio" name="tab" id="tab2" />
                <input type="radio" name="tab" id="tab3" />
                <input type="radio" name="tab" id="tab4" />

                <div className="tabs">
                  <label htmlFor="tab1">Problem</label>
                  <label htmlFor="tab2">Test Cases</label>
                  <label htmlFor="tab3">Result</label>
                  <label htmlFor="tab4">Submissions</label>
                </div>

                <div className="content">

                  <div className="content1">
                    <h3>{current.title}</h3>
                    <p>{current.problem}</p>
                  </div>

                  <div className="content2">
                    <pre>{current.testcase || "No testcases"}</pre>
                  </div>

                  <div className="content3">
                    <p>{current.result || "Waiting for execution..."}</p>
                  </div>

                  <div className="content4">
                    <p>No submissions yet</p>
                  </div>

                </div>
              </div>
            </div>

            <div className="right">
              <div className="editor-header">
                <select
                  className="dropdown"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </select>

                <div className="editor-actions">
                  <button className="btn run">Run Tests</button>
                  <button className="btn submit">Submit</button>
                </div>
              </div>

              <Editor
                height="100%"
                language={language}
                value={codeTemplates[language]}
                theme="vs-dark"
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default CodingPage;
```

---

### File: `react-app/src/components/CodingPanel.jsx`

```javascript
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

function CodingPanel({ question, answers, setAnswers, onSubmit, addToast }) {

  const [draftCode, setDraftCode] = useState("");
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (question) {
      if (answers && answers[question.id] !== undefined) {
        setDraftCode(answers[question.id]);
      } else {
        setDraftCode(`// ${question.question_title}\n\n// Write your code here\n`);
      }
    }
  }, [question?.id]);

  const handleEditorChange = (value) => {
    setDraftCode(value);
  };

  const runTests = () => {
    setIsRunningTests(true);
    // Simulate test run
    setTimeout(() => {
      setIsRunningTests(false);
      const passed = Math.floor(Math.random() * 3) + 4; // Fake 4 to 6
      if (addToast) {
        addToast(`Testcases runned: ${passed}/6 passed successfully`, "info");
      }
    }, 1500);
  };

  const saveCode = () => {
    setIsSaving(true);
    if (setAnswers && question) {
      setAnswers(prev => ({ ...prev, [question.id]: draftCode }));
    }
    setTimeout(() => {
      setIsSaving(false);
    }, 600);
  };

  return (

    <div className="coding-wrapper">

      {/* HEADER */}
      <div className="editor-header">

        <select className="lang-select">

          <option value="java">
            Java
          </option>

          <option value="python">
            Python
          </option>

          <option value="cpp">
            C++
          </option>

        </select>

        <div className="editor-actions">

          <button
            className="btn-text"
            onClick={() => setDraftCode(`// ${question?.question_title}\n\n// Write your code here\n`)}
          >
            Reset Code
          </button>

          <button
            className="btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            onClick={runTests}
            disabled={isRunningTests}
          >
            {isRunningTests ? <i className="ri-loader-4-line ri-spin"></i> : <i className="ri-play-line"></i>}
            Run Tests
          </button>

          <button
            className="btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #7c3aed, #9333ea)", color: "white", border: "none", padding: "0 24px", height: "48px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "0.2s" }}
            onClick={saveCode}
            disabled={isSaving}
          >
            {isSaving ? <i className="ri-loader-4-line ri-spin"></i> : <i className="ri-save-line"></i>}
            Save Answer
          </button>

        </div>

      </div>

      {/* EDITOR */}
      <div className="editor-container">

        <Editor
          height="100%"
          defaultLanguage="java"
          value={draftCode}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false
            },

            fontSize: 14,

            scrollBeyondLastLine: false,

            automaticLayout: true,

            padding: {
              top: 16
            },

            fontFamily: "Fira Code",

            lineHeight: 24
          }}
        />

      </div>

    </div>

  );
}

export default CodingPanel;
```

---

### File: `react-app/src/components/ContentPanel.jsx`

```javascript
function ContentPanel({ question, hideTitle }) {

  if (!question) {
    return (
      <div className="panel-content">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* TOP TABS */}
      <div className="panel-tabs">
        <button className="tab-btn active"><i className="ri-book-read-line" style={{marginRight:'6px'}}></i>Problem</button>
        <button className="tab-btn"><i className="ri-checkbox-circle-line" style={{marginRight:'6px'}}></i>Test Cases <span style={{background:'rgba(255,255,255,0.1)', padding:'2px 6px', borderRadius:'10px', fontSize:'10px', marginLeft:'4px'}}>1</span></button>
        <button className="tab-btn"><i className="ri-trophy-line" style={{marginRight:'6px'}}></i>Results <span style={{background:'rgba(255,255,255,0.1)', padding:'2px 6px', borderRadius:'10px', fontSize:'10px', marginLeft:'4px'}}>0</span></button>
        <button className="tab-btn"><i className="ri-file-list-3-line" style={{marginRight:'6px'}}></i>Submissions</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="panel-content" style={{ padding: '24px' }}>

        {/* TITLE */}
        {!hideTitle && (
          <div className="problem-header">
            <h1 className="problem-title">{question.question_title}</h1>
            <div className="problem-badges">
              <span className="badge badge-medium">Medium</span>
              <span className="badge badge-topic">Coding</span>
            </div>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="problem-description">
          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Problem Description</h3>
              <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>Read Carefully</span>
            </div>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
              {question.question_text}
            </p>
          </div>



          {/* SAMPLE */}
          {/* SAMPLE */}
          {question.sample_input && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                  <i className="ri-flask-line"></i>
                </div>
                Test Case 1
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Input Block */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                     <div style={{ width: '4px', height: '12px', background: 'var(--blue)', borderRadius: '2px' }}></div>
                     <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Input</span>
                  </div>
                  <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '14px', color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
                    {question.sample_input}
                  </div>
                </div>

                {/* Output Block */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                     <div style={{ width: '4px', height: '12px', background: 'var(--green)', borderRadius: '2px' }}></div>
                     <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Expected Output</span>
                  </div>
                  <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '14px', color: 'var(--green)', whiteSpace: 'pre-wrap' }}>
                    {question.sample_output}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default ContentPanel;
```

---

### File: `react-app/src/components/MCQView.jsx`

```javascript
import { useState } from "react";

function MCQView({ question, questionNumber, answers, setAnswers, onSubmit }) {

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

    <div className="mcq-wrapper">

      {/* TOP */}
      <div className="mcq-top">

        <div className="mcq-question-left">

          <div className="mcq-question-number">
            {questionNumber}
          </div>

          <h1 className="mcq-title">
            {question.question_title}
          </h1>

        </div>

        <div className="mcq-badge">
          Multiple Choice
        </div>

      </div>

      {/* QUESTION */}
      <div className="mcq-card">


        <p className="mcq-description">
          {question.question_text}
        </p>

      </div>

      {/* OPTIONS */}
      <div className="mcq-options">

        {options.map((opt, i) => (

          <div
            key={i}
            className={`mcq-option ${
              selectedOption === opt ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(opt)}
          >

            <div className="option-letter">
              {String.fromCharCode(65 + i)}
            </div>

            <div className="option-text">
              {opt}
            </div>

          </div>

        ))}

      </div>

      {/* FOOTER */}
      <div className="mcq-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="mcq-btn secondary">
            Previous
          </button>
          <button className="mcq-btn primary">
            Next Question
          </button>
        </div>
      </div>

    </div>
  );
}

export default MCQView;
```

---

### File: `react-app/src/components/Sidebar.jsx`

```javascript
function Sidebar({
  selected,
  setSelected,
  codingQuestions,
  mcqQuestions
}) {

  return (

    <div className="sidebar-wrapper">

      {/* =========================
          CODING SECTION
      ========================== */}

      {codingQuestions.length > 0 && (

        <div className="sidebar-section">

          <h2 className="section-title">
            CODING
          </h2>

          <ul className="question-list">

            {codingQuestions.map((q, i) => (

              <li
                key={q.id}
                className={`q-item ${
                  selected?.id === q.id ? "active" : ""
                }`}
                onClick={() => setSelected(q)}
              >

                <span>
                  {i + 1}. {q.question_title}
                </span>

              </li>

            ))}

          </ul>

        </div>

      )}

      {/* =========================
          MCQ SECTION
      ========================== */}

      {mcqQuestions.length > 0 && (

        <div className="sidebar-section">

          <h2 className="section-title">
            OBJECTIVE
          </h2>

          <ul className="question-list">

            {mcqQuestions.map((q, i) => (

              <li
                key={q.id}
                className={`q-item ${
                  selected?.id === q.id ? "active" : ""
                }`}
                onClick={() => setSelected(q)}
              >

                <span>
                  {i + 1}. {q.question_title}
                </span>

              </li>

            ))}

          </ul>

        </div>

      )}

    </div>

  );
}

export default Sidebar;
```

---

### File: `react-app/src/index.css`

```css
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}

```

---

### File: `react-app/src/main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

---

### File: `react-app/src/pages/PracticePage.jsx`

```javascript
import { useEffect, useState } from "react";
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
      <nav className="navbar" style={{ background: "rgba(20, 24, 32, 0.65)", backdropFilter: "blur(24px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px", height: "74px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", margin: "24px 24px 0 24px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
        
        <div className="nav-left" style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
          <div className="logo-box" style={{ width: "42px", height: "42px", borderRadius: "14px", background: "rgba(139, 92, 246, 0.15)", border: "1px solid rgba(139, 92, 246, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", fontSize: "18px" }}>
            <i className="ri-code-line"></i>
          </div>
          <span className="exam-title" style={{ color: "white", fontWeight: "800", fontSize: "20px", letterSpacing: "-0.5px" }}>examate</span>
        </div>

        <div className="nav-center" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-main)", fontSize: "15px", fontWeight: "600", letterSpacing: "0.5px" }}>
             <div onClick={closePractice} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--card-bg)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid var(--border)", transition: "0.2s" }}>
               <i className="ri-arrow-left-s-line" style={{ fontSize: "18px" }}></i> 
             </div>
             <span>Welcome {username}</span>
           </div>
        </div>

        <div className="nav-right" style={{ display: "flex", gap: "12px", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
          <i className="ri-sun-line" style={{ color: "var(--text-muted)", fontSize: "20px", cursor: "pointer", transition: "color 0.2s" }}></i>
        </div>
      </nav>

      {/* WORKSPACE */}
      <div className="workspace" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflow: 'hidden' }}>
        {selected ? (
          <>
            {/* HEADER BLOCK */}
            <div style={{ background: 'rgba(20, 24, 32, 0.65)', backdropFilter: 'blur(24px)', borderRadius: '24px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', flexShrink: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <button onClick={closePractice} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', transition: '0.2s' }}>
                     <i className="ri-arrow-left-line"></i> Back
                  </button>
                  <button onClick={() => {
                      const el = document.documentElement;
                      if (!document.fullscreenElement) {
                          if (el.requestFullscreen) el.requestFullscreen();
                      } else {
                          if (document.exitFullscreen) document.exitFullscreen();
                      }
                  }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', transition: '0.2s' }}>
                     <i className="ri-fullscreen-line"></i> Fullscreen
                  </button>
               </div>
               <h1 style={{ margin: '0 0 16px 0', fontSize: '32px', fontWeight: '700', letterSpacing: '-1px' }}>{selected.question_title}</h1>
               <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', padding: '6px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: '1px solid rgba(139, 92, 246, 0.3)' }}>{selected.difficulty || 'Easy'}</span>
                  <span style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.65)', padding: '6px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: '1px solid rgba(255, 255, 255, 0.08)' }}>{selected.marks || 10} pts</span>
               </div>
            </div>

            {/* SPLIT SCREEN */}
            <div style={{ flex: 1, display: 'flex', gap: '24px', overflow: 'hidden' }}>
              <main className="center-panel" style={{ flex: 1, background: 'rgba(20, 24, 32, 0.65)', backdropFilter: 'blur(24px)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                 <ContentPanel question={selected} hideTitle={true} />
              </main>
              <section className="right-panel" style={{ flex: 1, background: 'rgba(20, 24, 32, 0.65)', backdropFilter: 'blur(24px)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                 <CodingPanel question={selected} answers={answers} setAnswers={setAnswers} onSubmit={submitPractice} />
              </section>
            </div>
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

```

---

### File: `react-app/src/pages/test.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
:root{
  --bg-base:#0b0618;
  --sidebar-bg:rgba(20,10,40,0.88);
  --card-bg:rgba(255,255,255,0.05);
  --border:rgba(255,255,255,0.08);
  --primary:#7c3aed;
  --primary-light:#9333ea;
  --text-main:#ffffff;
  --text-muted:#b5b5c3;
  --green:#22c55e;
  --blue:#3b82f6;
}
/* =====================================
   RESET
===================================== */
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
html,
body,
#root{
  width:100%;
  height:100%;
  overflow:hidden;
  font-family:'Inter',sans-serif;
  color:var(--text-main);
}
/* =====================================
   MAIN BACKGROUND
===================================== */
.app-layout{
  width:100%;
  height:100vh;
  display:flex;
  flex-direction:column;
  background:
    radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 40%),
    radial-gradient(circle at 80% 20%, rgba(147,51,234,0.25), transparent 40%),
    radial-gradient(circle at 20% 80%, rgba(79,70,229,0.25), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(124,58,237,0.2), transparent 40%),
    var(--bg-base);
}
/* =====================================
   NAVBAR
===================================== */
.navbar{
  width:100%;
  height:74px;
  min-height:74px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 24px;
  background:rgba(12,8,24,0.75);
  border-bottom:
  1px solid var(--border);
  backdrop-filter:blur(16px);
  z-index:100;
}
.nav-left{
  display:flex;
  align-items:center;
  gap:14px;
}
.logo-box{
  width:42px;
  height:42px;
  border-radius:14px;
  background:
  linear-gradient(
  135deg,
  var(--primary),
  var(--primary-light)
  );
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  font-weight:800;
  color:white;
  box-shadow:
  0 0 24px rgba(124,58,237,0.45);
}
.exam-title{
  font-size:18px;
  font-weight:700;
  color:white;
}
/* =====================================
   WORKSPACE
===================================== */
.workspace{
  flex:1;
  display:flex;
  overflow:hidden;
}
/* =====================================
   SIDEBAR
===================================== */
.sidebar{
  width:290px;
  min-width:290px;
  height:100%;
  overflow-y:auto;
  background:var(--sidebar-bg);
  backdrop-filter:blur(18px);
  border-right:
  1px solid var(--border);
  padding:18px 14px;
}
.sidebar::-webkit-scrollbar{
  width:6px;
}
.sidebar::-webkit-scrollbar-thumb{
  background:rgba(255,255,255,0.08);
  border-radius:20px;
}
.sidebar-section{
  margin-bottom:30px;
}
.section-title{
  color:#9f8fd3;
  font-size:12px;
  font-weight:800;
  letter-spacing:2px;
  margin-bottom:18px;
  padding-left:8px;
}
.question-list{
  list-style:none;
}
/* =====================================
   QUESTION ITEMS
===================================== */
.q-item{
  width:100%;
  min-height:58px;
  border-radius:18px;
  padding:0 18px;
  display:flex;
  align-items:center;
  margin-bottom:12px;
  cursor:pointer;
  transition:0.25s;
  border:
  1px solid transparent;
  background:transparent;
  backdrop-filter:blur(10px);
}
.q-item:hover{
  background:
  rgba(124,58,237,0.12);
  border:
  1px solid rgba(124,58,237,0.22);
}
.q-item.active{
  background:
  linear-gradient(
  135deg,
  rgba(65, 9, 161, 0.75),
  rgba(147,51,234,0.55)
  );
  border:
  1px solid rgba(255,255,255,0.1);
}
.q-item span{
  color:white;
  font-size:14px;
  font-weight:600;
}
/* =====================================
   CENTER PANEL
===================================== */
.center-panel{
  flex:1;
  overflow-y:auto;
  padding:28px;
}
.center-panel::-webkit-scrollbar{
  width:8px;
}
.center-panel::-webkit-scrollbar-thumb{
  background:rgba(255,255,255,0.08);
  border-radius:20px;
}
/* =====================================
   CONTENT PANEL
===================================== */
.panel-content{
  width:100%;
}
/* =====================================
   QUESTION CARD
===================================== */
.problem-header{
  width:100%;
  min-height:180px;
  border-radius:28px;
  background:var(--card-bg);
  border:
  1px solid var(--border);
  backdrop-filter:blur(18px);
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:36px;
  margin-bottom:26px;
}
.problem-title{
  font-size:38px;
  font-weight:800;
  margin-bottom:18px;
  color:white;
}
.problem-description{
  width:100%;
}
.problem-description p{
  color:var(--text-muted);
  font-size:16px;
  line-height:1.9;
  margin-bottom:18px;
}
/* =====================================
   EXAMPLE BOX
===================================== */
.example-box{
  width:100%;
  margin-top:26px;
  border-radius:24px;
  overflow:hidden;
  background:var(--card-bg);
  border:
  1px solid var(--border);
  backdrop-filter:blur(18px);
}
.example-title{
  height:58px;
  display:flex;
  align-items:center;
  padding:0 22px;
  background:
  rgba(255,255,255,0.03);
  border-bottom:
  1px solid var(--border);
  font-size:15px;
  font-weight:700;
}
.example-content{
  padding:22px;
}
.example-content p{
  margin-bottom:16px;
}
/* =====================================
   RIGHT PANEL
===================================== */
.right-panel{
  width:42%;
  min-width:520px;
  background:
  rgba(10,8,22,0.72);
  backdrop-filter:blur(18px);
  border-left:
  1px solid var(--border);
  overflow:hidden;
  display:flex;
  flex-direction:column;
}
/* =====================================
   CODING PANEL
===================================== */
.coding-wrapper{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
}
/* =====================================
   EDITOR HEADER
===================================== */
.editor-header{
  width:100%;
  height:72px;
  min-height:72px;
  padding:0 18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:
  rgba(255,255,255,0.02);
  border-bottom:
  1px solid var(--border);
  backdrop-filter:blur(16px);
}
.lang-select{
  width:110px;
  height:44px;
  border:none;
  outline:none;
  border-radius:14px;
  background:
  rgba(255,255,255,0.08);
  color:white;
  padding:0 14px;
  font-size:14px;
  font-weight:600;
}
.editor-actions{
  display:flex;
  align-items:center;
  gap:10px;
}
/* =====================================
   BUTTONS
===================================== */
.btn-text{
  border:none;
  background:none;
  color:var(--text-muted);
  font-size:14px;
  font-weight:600;
  cursor:pointer;
}
.btn-secondary{
  border:none;
  height:44px;
  padding:0 22px;
  border-radius:14px;
  background:
  linear-gradient(
  135deg,
  #06b6d4,
  #3b82f6
  );
  color:white;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  box-shadow:
  0 0 22px rgba(59,130,246,0.25);
}
.btn-success{
  border:none;
  height:44px;
  padding:0 22px;
  border-radius:14px;
  background:
  linear-gradient(
  135deg,
  var(--primary),
  var(--primary-light)
  );
  color:white;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  box-shadow:
  0 0 22px rgba(124,58,237,0.35);
}
/* =====================================
   MONACO
===================================== */
.editor-container{
  flex:1;
  overflow:hidden;
}
/* =====================================
   MCQ LAYOUT
===================================== */
.mcq-layout{
  width:100%;
}
.mcq-wrapper{
  width:100%;
}
.mcq-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:24px;
}
.mcq-number{
  color:#c4b5fd;
  font-size:14px;
  font-weight:600;
}
.mcq-badge{
  padding:10px 16px;
  border-radius:999px;
  background:
  rgba(124,58,237,0.15);
  border:
  1px solid rgba(124,58,237,0.2);
  color:#ddd6fe;
  font-size:12px;
  font-weight:700;
}
/* =====================================
   MCQ CARD
===================================== */
.mcq-card{
  width:100%;
  border-radius:28px;
  padding:34px;
  margin-bottom:26px;
  background:var(--card-bg);
  border:
  1px solid var(--border);
  backdrop-filter:blur(18px);
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  text-align:left;
}
.mcq-question-left{
  display:flex;
  align-items:center;
  gap:14px;
}
.mcq-question-top{
  color:#c4b5fd;
  font-size:13px;
  font-weight:700;
  margin-bottom:16px;
  letter-spacing:1px;
}
.mcq-question-number{
  width:42px;
  height:42px;
  border-radius:12px;
  background:
  rgba(124,58,237,0.15);
  border:
  1px solid rgba(124,58,237,0.25);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#c4b5fd;
  font-size:15px;
  font-weight:800;
}
.mcq-title{
  font-size:28px;
  font-weight:800;
  color:white;
  margin:0;
  text-align:left;
}
.mcq-description{
  color:var(--text-muted);
  font-size:16px;
  line-height:1.9;
  text-align:left;
}
/* =====================================
   OPTIONS
===================================== */
.mcq-options{
  display:flex;
  flex-direction:column;
  gap:18px;
}
.mcq-option{
  width:100%;
  min-height:74px;
  border-radius:20px;
  background:
  rgba(255,255,255,0.04);
  border:
  1px solid rgba(255,255,255,0.06);
  backdrop-filter:blur(14px);
  display:flex;
  align-items:center;
  gap:16px;
  padding:0 22px;
  cursor:pointer;
  transition:0.25s;
}
.mcq-option:hover{
  border-color:
  rgba(124,58,237,0.35);
  background:
  rgba(124,58,237,0.08);
}
.mcq-option.selected{
  background:
  linear-gradient(
  135deg,
  rgba(124,58,237,0.28),
  rgba(147,51,234,0.2)
  );
  border:
  1px solid rgba(124,58,237,0.5);
  box-shadow:
  0 0 24px rgba(124,58,237,0.22);
}
.option-letter{
  width:44px;
  height:44px;
  border-radius:50%;
  background:
  rgba(255,255,255,0.08);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:17px;
  font-weight:800;
}
.option-text{
  color:white;
  font-size:15px;
  font-weight:600;
}
/* =====================================
   FOOTER BUTTONS
===================================== */
.mcq-footer{
  width:100%;
  display:flex;
  justify-content:space-between;
  margin-top:30px;
}
.mcq-btn{
  height:50px;
  padding:0 28px;
  border:none;
  border-radius:16px;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
}
.mcq-btn.secondary{
  background:
  rgba(255,255,255,0.06);
  border:
  1px solid rgba(255,255,255,0.08);
  color:white;
}
.mcq-btn.primary{
  background:
  linear-gradient(
  135deg,
  var(--primary),
  var(--primary-light)
  );
  color:white;
  box-shadow:
  0 0 24px rgba(124,58,237,0.3);
}
/* =====================================
   MOBILE RESPONSIVENESS
===================================== */
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    height: auto !important;
    padding: 12px;
    gap: 12px;
  }
  .nav-left, .nav-center, .nav-right {
    flex: 1 1 100%;
    justify-content: center !important;
  }
  .nav-right {
    flex-wrap: wrap;
  }
  .workspace {
    flex-direction: column;
    overflow-y: auto;
  }
  .sidebar {
    width: 100%;
    min-width: 100%;
    height: auto;
    max-height: 200px;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .center-panel {
    padding: 16px;
    overflow: visible;
  }
  .right-panel {
    width: 100%;
    min-width: 100%;
    min-height: 500px;
    border-left: none;
    border-top: 1px solid var(--border);
    flex: none;
  }
  .problem-header {
    padding: 20px;
    min-height: auto;
  }
  .problem-title, .mcq-title {
    font-size: 24px;
  }
  .mcq-card {
    padding: 20px;
  }
  .mcq-option {
    padding: 0 16px;
  }
}

```

---

### File: `react-app/src/pages/TestPage.jsx`

```javascript
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
  const answersRef = useRef({});

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const submitAssessment = async (reason = null) => {
    setIsSubmitting(true);
    try {
      await fetch("http://localhost:3000/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessment_id: id,
          student_email: userEmail,
          answers: answersRef.current
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
  
  const lastAudioFlag = useRef(0);
  const lastVideoFlag = useRef(0);

  const startAIProctoring = (stream) => {
    // 1. Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && Number(controls.mic) === 1) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        let latestTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          latestTranscript += event.results[i][0].transcript;
        }
        if (latestTranscript.trim().length > 0) {
          const now = Date.now();
          if (now - lastAudioFlag.current > 15000) { // 15s cooldown
            lastAudioFlag.current = now;
            addToast("Audio Violation: Speech or talking detected", "error");
            sendLog("audio_flag");
          }
        }
      };
      recognition.start();
    }

    // 2. Motion Detection via Canvas
    if (Number(controls.webcam) === 1) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const hiddenVideo = document.createElement("video");
        hiddenVideo.srcObject = stream;
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
    
    // Request Fullscreen immediately to satisfy browser user-gesture requirements
    if (Number(controls.fullscreen) === 1) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen error:", err);
        setPermissionError("Fullscreen permission is required. Please click anywhere to try again.");
        return;
      }
    }

    // Request Media
    try {
      if (Number(controls.screen_record) === 1) {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "monitor" } });
        
        // CHECK IF ENTIRE SCREEN (MONITOR) WAS SELECTED
        const videoTrack = displayStream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        if (settings.displaySurface && settings.displaySurface !== "monitor") {
          displayStream.getTracks().forEach(t => t.stop());
          throw new Error("NOT_ENTIRE_SCREEN");
        }

        const screenRecorder = new MediaRecorder(displayStream, { mimeType: "video/webm" });
        screenRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) screenChunksRef.current.push(e.data);
        };
        screenRecorder.start(10000); // 10s chunks
        screenRecorderRef.current = screenRecorder;
      }

      if (Number(controls.webcam) === 1 || Number(controls.mic) === 1) {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: Number(controls.webcam) === 1,
          audio: Number(controls.mic) === 1
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }

        // Start Local AI Analysis instead of saving heavy .webm files
        startAIProctoring(userStream);
      }

      setPermissionsGranted(true);
    } catch (err) {
      console.error(err);
      if (document.fullscreenElement) document.exitFullscreen().catch(()=>{});
      
      if (err.message === "NOT_ENTIRE_SCREEN") {
        setPermissionError("You MUST share your 'Entire Screen'. Do not select Window or Chrome Tab.");
      } else {
        setPermissionError("You must grant camera, microphone, and screen recording permissions to proceed.");
      }
    }
  };

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
      {permissionsGranted && Number(controls.webcam) === 1 && (
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          style={{ position: "fixed", bottom: "20px", right: "20px", width: "180px", height: "135px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", zIndex: 9999, objectFit: "cover", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", background: "#000" }}
        />
      )}

      {/* NAVBAR WITH PILLS */}
      <nav className="navbar" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", height: "74px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", width: "100%" }}>
        
        <div className="nav-left" style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
          <div className="logo-box" style={{ width: "42px", height: "42px", borderRadius: "14px", background: "linear-gradient(135deg, #7c3aed, #9333ea)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "18px" }}>
            <i className="ri-shield-check-line"></i>
          </div>
          <span className="exam-title" style={{ color: "white", fontWeight: "700", fontSize: "18px" }}>Security Monitor</span>
        </div>

        <div className="nav-center" style={{ flex: 1, display: "flex", justifyContent: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px", padding: "6px 20px" }}>
            <span style={{ fontSize: "12px", color: "#8b5cf6", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>{realDate}</span>
            <div style={{ width: "1px", height: "14px", backgroundColor: "rgba(255, 255, 255, 0.2)" }}></div>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "#e2e8f0", letterSpacing: "1.5px", fontFamily: "'Courier New', Courier, monospace" }}>{realTime}</span>
          </div>

          {timeLeftStr && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: isUrgent ? "rgba(239, 68, 68, 0.15)" : "rgba(255, 255, 255, 0.03)", border: isUrgent ? "1px solid rgba(239, 68, 68, 0.4)" : "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "8px", padding: "6px 20px" }}>
              <i className="ri-timer-line" style={{ color: isUrgent ? "#f87171" : "#a78bfa", fontSize: "16px" }}></i>
              <span style={{ fontSize: "12px", color: isUrgent ? "#fca5a5" : "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Time Left</span>
              <span style={{ fontSize: "16px", fontWeight: "800", color: isUrgent ? "#fecaca" : "#e2e8f0", letterSpacing: "1.5px", fontFamily: "'Courier New', Courier, monospace", marginLeft: "4px" }}>{timeLeftStr}</span>
            </div>
          )}
        </div>

        <div className="nav-right" style={{ display: "flex", gap: "12px", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
          {tabRemaining !== null && (
              <div style={{ backgroundColor: "#1e1e24", color: "#ccc", padding: "8px 20px", borderRadius: "99px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #2a2a35", fontWeight: "600" }}>
                <i className="ri-macbook-line" style={{ color: "#7c3aed", fontSize: "16px" }}></i> {tabRemaining} tabs left
              </div>
          )}
          {hoverRemaining !== null && (
              <div style={{ backgroundColor: "#1e1e24", color: "#ccc", padding: "8px 20px", borderRadius: "99px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #2a2a35", fontWeight: "600" }}>
                <i className="ri-cursor-line" style={{ color: "#7c3aed", fontSize: "16px" }}></i> {hoverRemaining} hovers left
              </div>
          )}
          
          {/* Main Submit Button moved to Navbar */}
          <button 
            onClick={() => {
              if(window.confirm("Are you sure you want to submit the entire assessment? You will not be able to return.")) {
                submitAssessment("Manual Submission");
              }
            }} 
            className="btn" 
            style={{ padding: "8px 24px", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", borderRadius: "8px", fontWeight: "700", cursor: "pointer", border: "none", marginLeft: "10px", boxShadow: "0 4px 15px rgba(16,185,129,0.3)" }}
          >
            Submit Exam
          </button>
        </div>
      </nav>

      <div className="workspace">
        <aside className="sidebar">
          <Sidebar
            questions={questions}
            selected={selected}
            setSelected={setSelected}
            codingQuestions={codingQuestions}
            mcqQuestions={mcqQuestions}
          />
        </aside>

        {selected?.question_type === "coding" && (
          <>
            <main className="center-panel">
              <ContentPanel question={selected} />
            </main>
            <section className="right-panel">
              <CodingPanel 
                question={selected} 
                answers={answers} 
                setAnswers={setAnswers} 
                onSubmit={() => submitAssessment()}
                addToast={addToast}
              />
            </section>
          </>
        )}

        {selected?.question_type === "mcq" && (
          <main className="center-panel">
            <MCQView
              question={selected}
              questionNumber={questions.findIndex(q => q.id === selected.id) + 1}
              answers={answers}
              setAnswers={setAnswers}
              onSubmit={() => submitAssessment()}
            />
          </main>
        )}
      </div>
    </div>
  );
}

export default TestPage;
```

---

### File: `react-app/vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---

### File: `sample_practice.json`

```json
[
  {
    "question_type": "mcq",
    "question_title": "Basic JavaScript",
    "question_text": "Which company developed JavaScript?",
    "option_a": "Netscape",
    "option_b": "Microsoft",
    "option_c": "Sun Microsystems",
    "option_d": "Oracle",
    "correct_answer": "Netscape",
    "difficulty": "Easy",
    "marks": 2
  },
  {
    "question_type": "mcq",
    "question_title": "React State",
    "question_text": "What hook is used to manage state in functional components?",
    "option_a": "useEffect",
    "option_b": "useState",
    "option_c": "useReducer",
    "option_d": "useMemo",
    "correct_answer": "useState",
    "difficulty": "Easy",
    "marks": 2
  },
  {
    "question_type": "mcq",
    "question_title": "CSS Display",
    "question_text": "Which CSS property is used to make a responsive grid layout?",
    "option_a": "display: flex",
    "option_b": "display: grid",
    "option_c": "display: block",
    "option_d": "display: inline",
    "correct_answer": "display: grid",
    "difficulty": "Medium",
    "marks": 2
  },
  {
    "question_type": "mcq",
    "question_title": "SQL Databases",
    "question_text": "Which of the following is NOT a NoSQL database?",
    "option_a": "MongoDB",
    "option_b": "Cassandra",
    "option_c": "PostgreSQL",
    "option_d": "CouchDB",
    "correct_answer": "PostgreSQL",
    "difficulty": "Medium",
    "marks": 2
  },
  {
    "question_type": "mcq",
    "question_title": "HTTP Methods",
    "question_text": "Which HTTP method is idempotent and usually used to update a resource?",
    "option_a": "POST",
    "option_b": "PUT",
    "option_c": "DELETE",
    "option_d": "PATCH",
    "correct_answer": "PUT",
    "difficulty": "Hard",
    "marks": 2
  },
  {
    "question_type": "coding",
    "question_title": "Multiply Array Elements",
    "question_text": "Write a program that takes a comma-separated list of integers and multiplies each element by 2. Print the resulting array.",
    "difficulty": "Medium",
    "marks": 10,
    "coding_input": "A comma-separated string of numbers (e.g., '1,2,3').",
    "coding_output": "The transformed comma-separated string.",
    "sample_testcase": "Input: 1,2,3\nOutput: 2,4,6",
    "visible_testcases": [
      {"input": "1,2,3", "expected": "2,4,6"},
      {"input": "10,-5,0", "expected": "20,-10,0"}
    ]
  }
]

```

---

### File: `server.js`

```js
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const db = require("./db");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FILES
========================= */
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* =========================
   PROCTORING ROUTES
========================= */

// Configure Multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "public", "recordings");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, req.body.student_email + "-" + req.body.assessment_id + "-" + uniqueSuffix + ".webm");
  }
});
const upload = multer({ storage });

app.post("/proctor/upload", upload.single("video"), (req, res) => {
  const { assessment_id, student_email, log_type } = req.body;
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = "/recordings/" + req.file.filename;

  const sql = "INSERT INTO proctoring_logs (assessment_id, student_email, log_type, file_path) VALUES (?, ?, ?, ?)";
  db.query(sql, [assessment_id, student_email, log_type, filePath], (err) => {
    if (err) {
      console.error("PROCTOR UPLOAD ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, filePath });
  });
});

app.post("/proctor/log", (req, res) => {
  const { assessment_id, student_email, log_type } = req.body;
  
  const sql = "INSERT INTO proctoring_logs (assessment_id, student_email, log_type) VALUES (?, ?, ?)";
  db.query(sql, [assessment_id, student_email, log_type], (err) => {
    if (err) {
      console.error("PROCTOR LOG ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true });
  });
});

/* =========================
   LOGIN (ADMIN + USER)
========================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const bcrypt = require("bcrypt");

  // 🔥 CHECK ADMIN
  const adminQuery = "SELECT * FROM admin_users WHERE email=?";

  db.query(adminQuery, [email], async (err, adminResult) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    if (adminResult.length > 0) {
      const match = await bcrypt.compare(password, adminResult[0].password);
      if (match) {
        return res.json({
          success: true,
          role: "admin",
          email: adminResult[0].email,
          name: adminResult[0].name || null
        });
      }
    }

    // 🔥 CHECK USER
    const userQuery = "SELECT * FROM users WHERE email=?";

    db.query(userQuery, [email], async (err, userResult) => {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }

      if (userResult.length > 0) {
        const match = await bcrypt.compare(password, userResult[0].password);
        if (match) {
          return res.json({
            success: true,
            role: "student",
            email: userResult[0].email,
            name: userResult[0].name || null
          });
        }
      }

      return res.json({ success: false });
    });
  });
});

const otps = new Map();

/* =========================
   FORGOT PASSWORD
========================= */
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, error: "Email required" });

  db.query("SELECT email FROM users WHERE email=? UNION SELECT email FROM admin_users WHERE email=?", [email, email], (err, results) => {
    if (err) return res.json({ success: false, error: "Database error" });
    if (results.length === 0) return res.json({ success: false, error: "Email not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otps.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    console.log(`\n======================================`);
    console.log(`[EMAIL SIMULATION] Password Reset`);
    console.log(`To: ${email}`);
    console.log(`Your OTP is: ${otp}`);
    console.log(`======================================\n`);

    res.json({ success: true });
  });
});

/* =========================
   RESET PASSWORD
========================= */
app.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  const record = otps.get(email);
  if (!record || record.otp !== otp || Date.now() > record.expires) {
    return res.json({ success: false, error: "Invalid or expired OTP" });
  }

  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.query("UPDATE users SET password=? WHERE email=?", [hashedPassword, email], (err, result) => {
    if (err) return res.json({ success: false, error: "Database error" });
    
    if (result.affectedRows > 0) {
      otps.delete(email);
      return res.json({ success: true });
    }

    db.query("UPDATE admin_users SET password=? WHERE email=?", [hashedPassword, email], (err, adminResult) => {
      if (err) return res.json({ success: false, error: "Database error" });
      if (adminResult.affectedRows > 0) {
        otps.delete(email);
        return res.json({ success: true });
      }
      res.json({ success: false, error: "User not found" });
    });
  });
});

/* =========================
   STUDENT ASSESSMENTS
========================= */
app.get("/student-assessments", (req, res) => {

  const email = req.query.email;

  if (!email) return res.json([]);

  const sql = `
    SELECT a.*, s.submitted,
           (SELECT COUNT(*) FROM student_feedback f WHERE f.assessment_id = a.id AND f.student_email = ?) as feedback_given,
           (SELECT show_result FROM exam_controls c WHERE c.assessment_id = a.id) as show_result
    FROM assessments a
    INNER JOIN assigned_students s
    ON a.id = s.assessment_id
    WHERE s.student_email = ?
    ORDER BY a.id DESC
  `;

  db.query(sql, [email.trim(), email.trim()], (err, result) => {

    if (err) {
      console.log(err);
      return res.json([]);
    }

    return res.json(result);

  });

});

/* =========================
   STUDENT PRACTICES
========================= */
app.get("/student-practices/:email", (req, res) => {
  const email = req.params.email;

  const sql = `
    SELECT p.*, ap.submitted, 'practice' as test_type
    FROM practices p
    INNER JOIN assigned_practices ap ON p.id = ap.practice_id
    WHERE ap.student_email = ?
    ORDER BY p.id DESC
  `;

  db.query(sql, [email.trim()], (err, result) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }
    return res.json(result);
  });
});

/* =========================
   FEEDBACK ROUTES
========================= */
app.post("/submit-feedback", (req, res) => {
  const {
    assessment_id, student_email,
    overall_rating, difficulty_rating, clarity_rating, platform_experience,
    recommendation, preferred_type, platform_issues
  } = req.body;

  const sql = `
    INSERT INTO student_feedback 
    (assessment_id, student_email, overall_rating, difficulty_rating, clarity_rating, platform_experience, recommendation, preferred_type, platform_issues)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    assessment_id, student_email, overall_rating, difficulty_rating, clarity_rating,
    platform_experience, recommendation, preferred_type, platform_issues
  ], (err) => {
    if (err) {
      console.error(err);
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
});

app.get("/feedback/:id/:email", (req, res) => {
  const sql = "SELECT * FROM student_feedback WHERE assessment_id = ? AND student_email = ? ORDER BY created_at DESC LIMIT 1";
  db.query(sql, [req.params.id, req.params.email], (err, results) => {
    if (err || results.length === 0) return res.json(null);
    res.json(results[0]);
  });
});

/* =========================
   ADVANCED RESULTS
========================= */
app.get("/results/analytics/:id/:email", (req, res) => {
  const assessment_id = req.params.id;

  // 1. Get assessment details
  db.query("SELECT * FROM assessments WHERE id = ?", [assessment_id], (err, aRes) => {
    if (err || aRes.length === 0) return res.json({ error: "Not found" });
    const assessment = aRes[0];

    // 2. Get leaderboard from student_results directly
    const lbSql = `
      SELECT student_email, score
      FROM student_results
      WHERE assessment_id = ?
      ORDER BY score DESC
    `;
    db.query(lbSql, [assessment_id], (err, lbRes) => {
      res.json({
        assessment: {
          title: assessment.title,
          start_time: assessment.start_time,
          duration: assessment.total_time
        },
        leaderboard: lbRes || []
      });
    });
  });
});

/* =========================
   SAVE EXAM CONTROLS
========================= */
app.post("/save-controls", (req, res) => {

  const {
    assessment_id,
    fullscreen,
    tab_switch,
    hover_detection,
    copy_paste_block,
    webcam,
    mic,
    screen_record,
    show_result,
    tab_limit,
    hover_limit,
    auto_submit_time,
    auto_submit_tab,
    auto_submit_hover,
    auto_submit_fullscreen
  } = req.body;

  const sql = `
    INSERT INTO exam_controls (
      assessment_id,
      fullscreen,
      tab_switch,
      hover_detection,
      copy_paste_block,
      webcam,
      mic,
      screen_record,
      show_result,
      tab_limit,
      hover_limit,
      auto_submit_time,
      auto_submit_tab,
      auto_submit_hover,
      auto_submit_fullscreen
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE
      fullscreen = VALUES(fullscreen),
      tab_switch = VALUES(tab_switch),
      hover_detection = VALUES(hover_detection),
      copy_paste_block = VALUES(copy_paste_block),
      webcam = VALUES(webcam),
      mic = VALUES(mic),
      screen_record = VALUES(screen_record),
      show_result = VALUES(show_result),
      tab_limit = VALUES(tab_limit),
      hover_limit = VALUES(hover_limit),
      auto_submit_time = VALUES(auto_submit_time),
      auto_submit_tab = VALUES(auto_submit_tab),
      auto_submit_hover = VALUES(auto_submit_hover),
      auto_submit_fullscreen = VALUES(auto_submit_fullscreen)
  `;

  db.query(sql, [
    assessment_id,
    fullscreen,
    tab_switch,
    hover_detection,
    copy_paste_block,
    webcam,
    mic,
    screen_record,
    show_result,
    tab_limit,
    hover_limit,
    auto_submit_time,
    auto_submit_tab,
    auto_submit_hover,
    auto_submit_fullscreen
  ], (err) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json({ success: true });

  });

});

/* =========================
   CREATE TEST (FINAL FIXED)
========================= */
app.post("/create-test", (req, res) => {

  const {
    title,
    start_time,
    end_time,
    description,
    total_time,
    emails,   // 👈 coming from frontend
    test_type // 👈 test or practice
  } = req.body;

  console.log("BODY:", req.body);

  const finalType = test_type || "test";

  /* =========================
     INSERT INTO assessments
  ========================== */
  const sql = `
    INSERT INTO assessments (
      title,
      description,
      start_time,
      end_time,
      total_time,
      test_type
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    title,
    description,
    start_time,
    end_time,
    total_time,
    finalType
  ], (err, result) => {

    if (err) {
      console.error("TEST INSERT ERROR:", err);
      return res.json({ success: false });
    }

    const assessmentId = result.insertId;

    const finalizeCreation = () => {
      /* =========================
         HANDLE MULTIPLE EMAILS
      ========================== */
      if (!emails || emails.trim() === "") {
        return res.json({ success: true, testId: assessmentId });
      }

      const emailArray = emails.split(",");

      /* =========================
         INSERT INTO assigned_students
      ========================== */
      const assignSql = `
        INSERT INTO assigned_students (assessment_id, student_email)
        VALUES ?
      `;

      const values = emailArray.map(email => [
        assessmentId,
        email.trim()
      ]);

      db.query(assignSql, [values], (err2) => {
        if (err2) {
          console.error("ASSIGN ERROR:", err2);
          return res.json({ success: false });
        }
        res.json({ success: true, testId: assessmentId });
      });
    };

    /* If Practice, auto-insert disabled controls to bypass Manage Controls step */
    if (finalType === "practice") {
      const controlSql = `
        INSERT INTO exam_controls (
          assessment_id, fullscreen, tab_switch, hover_detection, copy_paste_block,
          webcam, mic, screen_record, show_result, tab_limit, hover_limit,
          auto_submit_time, auto_submit_tab, auto_submit_hover, auto_submit_fullscreen
        ) VALUES (?, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0)
      `;
      db.query(controlSql, [assessmentId], (err3) => {
        if (err3) console.error("FAILED TO AUTO INSERT CONTROLS FOR PRACTICE", err3);
        finalizeCreation();
      });
    } else {
      finalizeCreation();
    }
  });

});

/* =========================
   CREATE PRACTICE (ISOLATED)
========================= */
app.post("/create-practice", (req, res) => {
  const { title, emails } = req.body;
  console.log("PRACTICE BODY:", req.body);

  const sql = `INSERT INTO practices (title) VALUES (?)`;

  db.query(sql, [title], (err, result) => {
    if (err) {
      console.error("PRACTICE INSERT ERROR:", err);
      return res.json({ success: false });
    }

    const practiceId = result.insertId;

    if (!emails || emails.trim() === "") {
      return res.json({ success: true, practiceId });
    }

    const emailArray = emails.split(",");
    const assignSql = `INSERT INTO assigned_practices (practice_id, student_email) VALUES ?`;
    const values = emailArray.map(email => [practiceId, email.trim()]);

    db.query(assignSql, [values], (err2) => {
      if (err2) {
        console.error("ASSIGN ERROR:", err2);
        return res.json({ success: false });
      }
      res.json({ success: true, practiceId });
    });
  });
});

/* =========================
   SAVE PRACTICE QUESTION
========================= */
app.post("/save-practice-question", (req, res) => {
  const { practice_id, questions } = req.body;

  if (!questions || !questions.length) return res.json({ success: true });

  const values = questions.map(q => [
    practice_id,
    q.question_title || "",
    q.question_text || "",
    q.difficulty || "Easy",
    q.marks || 1,
    typeof q.visible_testcases === "object" ? JSON.stringify(q.visible_testcases) : (q.visible_testcases || ""),
    typeof q.hidden_testcases === "object" ? JSON.stringify(q.hidden_testcases) : (q.hidden_testcases || ""),
    q.coding_input || "",
    q.coding_output || "",
    q.sample_testcase || ""
  ]);

  const sql = `
    INSERT INTO practice_questions (
      practice_id, question_title, question_text, difficulty, marks,
      visible_testcases, hidden_testcases, coding_input, coding_output, sample_testcase
    ) VALUES ?
  `;

  db.query(sql, [values], (err) => {
    if (err) {
      console.error("SAVE PRACTICE QUESTION ERROR:", err);
      return res.json({ success: false, error: "Database error" });
    }
    res.json({ success: true });
  });
});




/* =========================
   SAVE QUESTION
========================= */

app.post("/save-question", (req, res) => {
  console.log("SAVE QUESTION BODY:", req.body);

  const processQuestion = (q, assessment_id) => {
    return [
      assessment_id || 0,
      q.section_name || "",
      0, // section_id cannot be null
      q.question_type || "mcq",
      q.question_title || "",
      q.question_text || "",
      q.option_a || "",
      q.option_b || "",
      q.option_c || "",
      q.option_d || "",
      q.correct_answer || "",
      q.difficulty || "Easy",
      q.marks || 1,
      typeof q.visible_testcases === "object" ? JSON.stringify(q.visible_testcases) : (q.visible_testcases || ""),
      typeof q.hidden_testcases === "object" ? JSON.stringify(q.hidden_testcases) : (q.hidden_testcases || ""),
      q.coding_input || "", 
      q.coding_output || "",
      q.sample_testcase || ""
    ];
  };

  const sql = `
    INSERT INTO questions (
      assessment_id,
      section_name,
      section_id,
      question_type,
      question_title,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      difficulty,
      marks,
      visible_testcases,
      hidden_testcases,
      coding_input,
      coding_output,
      sample_testcase
    )
    VALUES ?
  `;

  let values = [];
  
  if (req.body.questions && Array.isArray(req.body.questions)) {
    // JSON Upload Array
    values = req.body.questions.map(q => processQuestion(q, req.body.assessment_id));
  } else {
    // Single Manual Question
    values = [processQuestion(req.body, req.body.assessment_id)];
  }

  if (values.length === 0) {
    return res.status(400).json({ success: false, error: "No questions provided" });
  }

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("SAVE QUESTION ERROR:", err);
      return res.status(500).json({
        success: false,
        error: "Database error occurred"
      });
    }

    const assessment_id = req.body.assessment_id || 0;

    const updateStatsSql = `
      UPDATE assessments
      SET questions = (SELECT COUNT(*) FROM questions WHERE assessment_id = ?),
          marks = (SELECT SUM(marks) FROM questions WHERE assessment_id = ?)
      WHERE id = ?
    `;

    db.query(updateStatsSql, [assessment_id, assessment_id, assessment_id], (err2) => {
      if (err2) {
        console.error("UPDATE STATS ERROR:", err2);
      }

      res.json({
        success: true,
        message: "Question(s) saved successfully"
      });
    });
  });
});


/* =========================
   GET ASSESSMENT + CONTROLS
========================= */
app.get("/assessment/:id", (req, res) => {

  const id = req.params.id;

  const assessmentQuery = `
    SELECT *
    FROM assessments
    WHERE id = ?
  `;

  const questionQuery = `
    SELECT 
      COUNT(*) as question_count, 
      SUM(marks) as total_marks 
    FROM questions 
    WHERE assessment_id = ?
  `;

  const controlQuery = `
    SELECT *
    FROM exam_controls
    WHERE assessment_id = ?
  `;

  db.query(assessmentQuery, [id], (err, assessmentResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: true });
    }

    if (assessmentResult.length === 0) {
      return res.json({
        error: true,
        message: "Assessment not found"
      });
    }

    const row = assessmentResult[0];

    db.query(questionQuery, [id], (err, questionResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: true });
      }

      const qStats = questionResult[0] || { question_count: 0, total_marks: 0 };

      db.query(controlQuery, [id], (err, controlResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: true });
        }

        const controls = controlResult[0] || {};

        console.log("Assessment Data:", row);
        console.log("Question Stats:", qStats);

        res.json({
          id: row.id,
          title: row.title,
          duration: row.total_time,
          questions: qStats.question_count || 0,
          total_marks: qStats.total_marks || 0,
          controls: {
            enableProctoring: 1,
            requireFullscreen: controls.fullscreen ?? 0,
            recordScreen: controls.screen_record ?? 0,
            recordWebcam: controls.webcam ?? 0,
            recordWebmic: controls.mic ?? 0,
            preventCopyPaste: controls.copy_paste_block ?? 0,
            preventTabSwitch: controls.tab_switch ?? 0
          }
        });
      });
    });
  });

});



app.get("/assessment-full/:id", (req, res) => {
  const id = req.params.id;

  const assessmentQuery = "SELECT * FROM assessments WHERE id = ?";
  const questionQuery = "SELECT * FROM questions WHERE assessment_id = ?";
  const controlQuery = "SELECT * FROM exam_controls WHERE assessment_id = ?";

  db.query(assessmentQuery, [id], (err, assessmentResult) => {
    if (err) return res.status(500).json({ error: err });

    db.query(questionQuery, [id], (err, questionResult) => {
      if (err) return res.status(500).json({ error: err });

      db.query(controlQuery, [id], (err, controlResult) => {
        if (err) return res.status(500).json({ error: err });

        res.json({
          assessment: assessmentResult[0] || {},
          questions: questionResult || [],
          controls: controlResult[0] || {}
        });
      });
    });
  });
});

/* =========================
   SUBMIT ASSESSMENT
========================= */
app.post("/submit-assessment", (req, res) => {
  const { assessment_id, student_email, answers } = req.body;

  const markSubmitted = () => {
    const markSql = `UPDATE assigned_students SET submitted = 1 WHERE assessment_id = ? AND student_email = ?`;
    db.query(markSql, [assessment_id, student_email], (err2) => {
      if (err2) console.error("MARK SUBMITTED ERROR:", err2);
      res.json({ success: true });
    });
  };

  if (!answers || Object.keys(answers).length === 0) {
    return markSubmitted();
  }

  // 1. Fetch all questions to evaluate answers
  db.query("SELECT * FROM questions WHERE assessment_id = ?", [assessment_id], (err, questions) => {
    if (err) {
      console.error("SUBMIT ERROR fetching questions:", err);
      return res.status(500).json({ success: false });
    }

    let totalScore = 0;
    
    // 2. Evaluate submitted answers
    for (const q of questions) {
      const studentAnswer = answers[q.id];
      if (studentAnswer) {
        if (q.question_type === 'mcq') {
          if (studentAnswer.trim() === q.correct_answer.trim()) {
            totalScore += Number(q.marks) || 1;
          }
        }
        // Note: Coding questions are not auto-graded on the server yet, so they receive 0.
      }
    }

    // 3. Save ONLY the final score to student_results
    const resultSql = `
      INSERT INTO student_results (assessment_id, student_email, score, assessment_title)
      SELECT ?, ?, ?, title FROM assessments WHERE id = ?
      ON DUPLICATE KEY UPDATE score = VALUES(score), assessment_title = VALUES(assessment_title)
    `;
    
    db.query(resultSql, [assessment_id, student_email, totalScore, assessment_id], (err2) => {
      if (err2) console.error("SAVE RESULT ERROR:", err2);
      
      markSubmitted();
    });
  });
});

/* =========================
   PRACTICE DETAILS (REACT ENDPOINT)
========================= */
app.get("/practice-full/:id", (req, res) => {
  const id = req.params.id;

  const practiceQuery = `SELECT * FROM practices WHERE id = ?`;
  const questionQuery = `SELECT * FROM practice_questions WHERE practice_id = ?`;

  db.query(practiceQuery, [id], (err, practiceResult) => {
    if (err) return res.status(500).json({ error: true });
    if (practiceResult.length === 0) return res.json({ error: true, message: "Practice not found" });

    const row = practiceResult[0];

    db.query(questionQuery, [id], (err, questions) => {
      if (err) return res.status(500).json({ error: true });

      res.json({
        id: row.id,
        title: row.title,
        questions: questions || []
      });
    });
  });
});

/* =========================
   SUBMIT PRACTICE
========================= */
app.post("/submit-practice", (req, res) => {
  const { practice_id, student_email } = req.body;
  // WE ONLY MARK IT SUBMITTED, WE NEVER SAVE THE ANSWERS
  const sql = `UPDATE assigned_practices SET submitted = 1 WHERE practice_id = ? AND student_email = ?`;
  
  db.query(sql, [practice_id, student_email], (err) => {
    if (err) {
      console.error("SUBMIT PRACTICE ERROR:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

---


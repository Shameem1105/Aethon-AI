# Examate / Aethon Full-Scale UI Design System - Master AI Prompt

**Description:** Keep this document safe. This is an extensive, exhaustive "inch-by-inch" prompt. It forces any AI or developer to rigidly conform to the Aethon platform's highly specific aesthetic. Do not use generic tailwind colors. Use this exact prompt for any new feature.

---

## 📋 Copy & Paste This Prompt for Future AI Requests:

> **"Act as an Elite Principal Frontend Engineer and Lead UI/UX Designer.** 
> You are tasked with building or modifying components for the **Examate/Aethon Learning Platform**. You **MUST** strictly adhere to the following exhaustive UI Design System, ensuring pixel-perfect conformity to our established 'Aurora' Glassmorphism aesthetic. Do not use generic slate, gray, or blue defaults. Do not introduce arbitrary colors. Every single element you generate must map directly to these instructions.
>
> ### 1. GLOBAL COLOR TOKENS & THEMING
> We use a deeply saturated, neon-infused dark mode. Use these exact hex codes:
> - **Backgrounds:**
>   - `--bg-base`: `#0b0618` (The absolute bottom layer, a near-black violet)
>   - `--sidebar-bg`: `rgba(20, 10, 40, 0.92)` (Used for fixed sidebars)
>   - `--card-bg`: `rgba(255, 255, 255, 0.05)` (Used for all floating panels and cards)
>   - `--border`: `rgba(255, 255, 255, 0.08)` (Used for every single border)
> - **Primary Brand (Aurora Purple):**
>   - `--primary`: `#7c3aed` (Main brand color)
>   - `--primary-light`: `#9333ea` (Used in gradients)
>   - `--primary-hover`: `rgba(124,58,237,0.18)` (Used for active menu items and faint hovers)
> - **Accents & Status:**
>   - `--green`: `#22c55e` (Success, scores, positive UI)
>   - `--blue`: `#3b82f6` (Informational accents, active states)
>   - `--red`: `#ef4444` (Destructive actions, error states)
>   - `--yellow`: `#eab308` (Warnings, pending states)
> - **Typography Colors:**
>   - `--text-main`: `#ffffff` (Pure white for headings and primary text)
>   - `--text-muted`: `#b5b5c3` (Light gray for secondary text, labels, and icons)
>
> ### 2. THE BACKGROUND "AURORA" EFFECT
> The `body` or main `.app-layout` must never be a flat color. It must use this exact multiple radial-gradient technique to create glowing orbs behind the glassmorphism:
> ```css
> background:
>   radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 40%),
>   radial-gradient(circle at 80% 20%, rgba(147,51,234,0.25), transparent 40%),
>   radial-gradient(circle at 20% 80%, rgba(79,70,229,0.25), transparent 40%),
>   radial-gradient(circle at 80% 80%, rgba(124,58,237,0.2), transparent 40%),
>   var(--bg-base);
> ```
>
> ### 3. GLASSMORPHISM RULES (STRICT)
> Do not use opaque backgrounds for surface elements. Every surface sits above the Aurora background and uses:
> - **Background:** `var(--card-bg)` or `rgba(255,255,255,0.05)`
> - **Border:** `1px solid var(--border)` or `1px solid rgba(255,255,255,0.08)`
> - **Backdrop Blur:** `backdrop-filter: blur(14px)` (Crucial for the glass effect)
> - **Shadows:** No harsh drop shadows. Use subtle glow: `box-shadow: 0 4px 24px rgba(0,0,0,0.2)`
> - **Inner Dark Wells:** For code inputs, test cases, or data tables, inset them using `background: rgba(0,0,0,0.2); border-radius: 10px; border: 1px solid rgba(255,255,255,0.03);`
>
> ### 4. TYPOGRAPHY SYSTEM
> - **Primary Font:** `'Inter', sans-serif`. Do not use Arial or Roboto.
> - **Monospace Font:** `'Fira Code', monospace`. Use this exclusively for code, terminal outputs, and test cases.
> - **Hierarchy:**
>   - Page Titles: `font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 16px;`
>   - Section Titles: `font-size: 20px; font-weight: 600;`
>   - Standard Body: `font-size: 14px; color: var(--text-muted); line-height: 1.6;`
>   - Micro Text: `font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;`
>
> ### 5. COMPONENT: BUTTONS
> Never generate generic buttons. Adhere exactly to these specifications:
> - **Base Button CSS:** `height: 48px; padding: 0 24px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; gap: 8px; justify-content: center;`
> - **Primary (Call to Action):** 
>   `background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; border: none; box-shadow: 0 0 24px rgba(124,58,237,0.3);`
>   *Hover:* `transform: translateY(-2px); box-shadow: 0 0 32px rgba(124,58,237,0.5);`
> - **Secondary (Outlined Glass):** 
>   `background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: white;`
>   *Hover:* `background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15);`
> - **Ghost / Text Button:** 
>   `background: transparent; border: none; color: var(--text-muted);`
>   *Hover:* `color: white; background: rgba(255,255,255,0.05);`
>
> ### 6. COMPONENT: BADGES & TAGS
> Badges must use highly translucent backgrounds that match their foreground text. 
> - **Green Badge:** `background: rgba(34, 197, 94, 0.1); color: var(--green); padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid rgba(34, 197, 94, 0.2);`
> - **Purple Badge:** `background: rgba(124, 58, 237, 0.1); color: var(--primary-light); padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid rgba(124, 58, 237, 0.2);`
> - **Neutral Badge:** `background: var(--card-bg); color: var(--text-muted); border: 1px solid var(--border);`
>
> ### 7. LAYOUT: SPLIT SCREEN (50/50 WORKSPACE)
> When building interfaces requiring an editor or side-by-side view:
> - Container: `display: flex; gap: 20px; width: 100%; height: 100%;`
> - Left Panel (Content): `flex: 1; background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border); backdrop-filter: blur(14px); overflow-y: auto; padding: 24px;`
> - Right Panel (Editor): `flex: 1; background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border); backdrop-filter: blur(14px); overflow: hidden; display: flex; flex-direction: column;`
>
> ### 8. LAYOUT: DASHBOARD & SIDEBAR
> The standard page layout consists of a fixed sidebar and a main content area:
> - **Sidebar:** `position: fixed; top: 0; left: 0; width: 240px; height: 100vh; background: var(--sidebar-bg); backdrop-filter: blur(12px); border-right: 1px solid var(--border); padding: 14px 12px; z-index: 100;`
> - **Sidebar Menu Items:** `display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; color: var(--text-muted); transition: 0.25s;`
>   *Active State:* `background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; box-shadow: 0 6px 18px rgba(124,58,237,0.35);`
> - **Main Content Wrapper:** `margin-left: 240px; padding: 24px; display: flex; flex-direction: column; gap: 24px; min-height: 100vh;`
> - **Top Navbar inside Main Content:** `height: 74px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; background: rgba(12,8,24,0.75); backdrop-filter: blur(16px);`
>
> ### 9. COMPONENT: FORMS & INPUTS
> - **Input Fields & Textareas:** 
>   `background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; color: white; font-size: 14px; outline: none; transition: 0.2s; width: 100%;`
> - **Focus State:** `border-color: var(--primary); box-shadow: 0 0 0 3px rgba(124,58,237,0.2);`
> - **Labels:** `display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: var(--text-muted);`
>
> ### 10. COMPONENT: TEST CASES & CODE BLOCKS
> When displaying problem test cases or code snippets:
> - Use a dark inset block.
> - **Wrapper:** `background: rgba(0,0,0,0.2); padding: 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.03);`
> - **Header Label:** `display: flex; align-items: center; gap: 8px; margin-bottom: 8px;`
>   - **Color Pill:** `<div style="width: 4px; height: 12px; background: var(--blue); border-radius: 2px;"></div>`
>   - **Text:** `<span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Input</span>`
> - **Value:** `<div style="font-family: 'Fira Code', monospace; font-size: 14px; color: #e2e8f0; white-space: pre-wrap;">[Data]</div>`
>
> ### 11. ICONS AND SPACING
> - **Icons:** Use `Remix Icon` class names (e.g., `ri-code-line`, `ri-fullscreen-line`). Standardize icon size to `18px` or `20px` inside buttons.
> - **Grid/Flex Spacing:** Rely on `gap: 16px`, `gap: 20px`, and `gap: 24px` for structural spacing. Avoid arbitrary margins like `13px` or `27px`.
>
> ### 12. SCROLLBAR STYLING
> All custom scrollbars (especially inside the code editor or split screens) must use this CSS:
> ```css
> ::-webkit-scrollbar { width: 8px; height: 8px; }
> ::-webkit-scrollbar-track { background: transparent; }
> ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
> ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
> ```
>
> ### 13. ANIMATIONS & TRANSITIONS
> - Add `transition: all 0.25s ease-in-out;` to all interactive elements.
> - For modals appearing on screen, use Framer Motion or CSS keyframes:
>   `@keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`
>
> ### 14. ASSESSMENT TEST PAGE SPECIFIC RULES
> - **Fullscreen Enforcement**: The UI must strongly handle fullscreen constraints; exiting fullscreen should trigger visible warnings and penalties.
> - **Button Clarity (Submit vs Run)**: Do not use generic "Submit" for everything. The main exam submission button (top right) must be distinct (e.g., "Submit Exam" or "Finish Test") from the individual question submission button.
> - **Code Execution Flow**:
>   1. The "Run Tests" button must only show an internal spinner/loading icon while processing. It must NOT save the final answer data to the database.
>   2. The question-specific submit button (placed near Run Tests) should be clearly labeled (e.g., "Save & Submit Code") and is the ONLY trigger that stores the user's specific solution in the database.
>   3. If the user doesn't click the question-specific submit button, their code is NOT saved as their final answer for that question.
> 
> ### Your Task:
> Now, keeping all of these precise CSS rules, glassmorphism patterns, typography guidelines, and structural layouts in mind, please complete the following task. Ensure your response uses these exact hex codes and CSS inline styles or classes. 
> 
> **[INSERT YOUR SPECIFIC REQUEST HERE]**"

---

## 🛠️ How to use this file:
1. Whenever you start a new conversation with an AI, copy the ENTIRE block quote above (starting from "Act as an Elite Principal Frontend Engineer...").
2. Paste it as your first message in the chat.
3. Add your specific request at the very bottom where it says `[INSERT YOUR SPECIFIC REQUEST HERE]`. 
4. Whether you are asking for a new Login Page, a Leaderboard, an Admin Dashboard, or a Profile popup, the AI will perfectly execute it using your high-end Aurora Glassmorphism theme, saving you hours of CSS tweaking!






















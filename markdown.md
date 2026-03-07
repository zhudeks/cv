# CV Webpage Development Guide

## Project Overview
This guide provides step-by-step instructions to build a modern, responsive CV webpage for **Zhudeks Ghazaryan**. The site will feature a **Red** color scheme, **Light/Dark mode toggle**, and **Print/Save as PDF** functionality.

## Prerequisites
1.  **VS Code** installed on your computer.
2.  **Web Browser** (Chrome, Firefox, or Edge).
3.  **Internet Connection** (to load fonts and icons).

---

## 1. Project Setup

1.  Create a new folder on your computer named `zhudeks-cv`.
2.  Open **VS Code**.
3.  Select `File` > `Open Folder` and choose `zhudeks-cv`.
4.  Inside VS Code, create a new file named `index.html`.
5.  *(Optional)* You may create separate files for `style.css` and `script.js`, but for a simple CV, embedding them in `index.html` is recommended for portability.

---

## 2. HTML Structure

Open `index.html` and set up the basic HTML5 boilerplate. You will need to link the following in the `<head>` section:

*   **Google Fonts:** Use 'Inter' or 'Roboto' for a modern look.
*   **Font Awesome:** Use the CDN link for icons (email, phone, github, print, moon/sun).

### Required Sections
Structure your `<body>` with the following semantic sections:
1.  `<header>`: Contains Name, Title, Contact Info, and Control Buttons (Print/Theme).
2.  `<section id="summary">`: Professional summary text.
3.  `<section id="skills">`: Grid layout for technical skills.
4.  `<section id="experience">`: List of job roles.
5.  `<section id="education">`: List of degrees.

---

## 3. Styling & Theme (CSS)

You need to define CSS variables to handle the **Red Color** and **Dark/Light Modes**.

### Step 3.1: Define Variables
In your `<style>` block, define `:root` variables for light mode:
*   `--primary-color`: Set to a Red hex code (e.g., `#e63946`).
*   `--bg-color`: White (`#ffffff`).
*   `--text-color`: Dark Blue/Gray (`#1d3557`).
*   `--card-bg`: Light Gray (`#f8f9fa`).

### Step 3.2: Define Dark Mode
Create a `[data-theme="dark"]` selector. Override the variables:
*   `--bg-color`: Dark Gray/Black (`#121212`).
*   `--text-color`: Light Gray/White (`#e0e0e0`).
*   `--card-bg`: Slightly lighter than background (`#1e1e1e`).

### Step 3.3: Print Styles
Add a `@media print` block to ensure the CV looks good on paper:
*   Hide the "Dark Mode" and "Print" buttons (`display: none`).
*   Ensure text is black and background is white.
*   Remove shadows and borders that waste ink.

---

## 4. Functionality (JavaScript)

You need two main functions: **Theme Toggle** and **Print**.

### Step 4.1: Theme Toggle Logic
1.  Create a button in your HTML header with an ID (e.g., `theme-toggle`).
2.  In your `<script>` tag, add an event listener to this button.
3.  **Logic:**
    *   Check if `data-theme` is 'dark'.
    *   If yes, switch to 'light'. If no, switch to 'dark'.
    *   Save the preference to `localStorage` so the browser remembers the choice.
    *   Swap the icon from Moon to Sun.

### Step 4.2: Print Function
1.  Create a button with an `onclick="window.print()"` attribute.
2.  This triggers the browser's native print dialog, which allows "Save as PDF".

---

## 5. Content Population

Use the provided CV data to fill the HTML sections. Do not hardcode text directly without tags; use semantic HTML.

### Header Information
*   **Name:** Zhudeks Ghazaryan (Ժուդեքս Ղազարյան)
*   **Title:** QA Engineer
*   **Location:** Yerevan, Armenia
*   **Email:** ghazaryan.zhudeks@gmail.com
*   **Phone:** +37477261190
*   **GitHub:** ghazaryanzhudeks

### Professional Summary
Paste the following text into a `<p>` tag within `<section id="summary">`:
> "QA Engineer with 7+ years of experience, specializing in backend API testing and automation within the regulated banking and gambling sectors. Strong foundation in software engineering principles and a proven track record in designing, executing, and maintaining test suites. Actively transitioning skills towards a full-time SDET role, with a focused interest in building robust test automation frameworks in C#/JAVA and gRPC/REST."

### Technical Skills
Create a grid layout. Group skills into categories using the following data:
*   **Programming & Scripting:** C# and Java (Learning/Projects), Shell Scripting, SQL, Regular Expressions.
*   **Test Automation & Tools:** Postman (Automation & Manual), Swagger/OpenAPI, TestRail, Azure DevOps.
*   **Testing Expertise:** API Testing (REST), Functional, Regression, Integration, Cross-platform, GUI Testing.
*   **Methodologies:** Agile/Scrum, CI/CD Concepts, Git Version Control, Bug Tracking & Triage.

### Professional Experience
Create a card for each role. Include Job Title, Company, Dates, and Bullet points.

1.  **QA Engineer** | Intelligent Digital Technologies | *Nov 2022 – Present*
    *   Engineered and executed automated API test suites using Postman.
    *   Performed in-depth manual API testing using Swagger and Postman.
    *   Designed test cases in TestRail and Azure DevOps.
    *   Led end-to-end regression testing for production releases.
2.  **QA Engineer** | Converse Bank | *Nov 2021 – Oct 2022*
    *   Executed manual testing for Mobile Banking (iOS/Android) and Web.
    *   Per rigorous regression and cross-platform testing.
    *   Developed and maintained test case libraries.
3.  **Junior QA Engineer** | Digitain Armenia | *Nov 2020 – Oct 2021*
    *   Conducted manual WEB application testing (Functional, Regression, Integration).
    *   Utilized Postman and Swagger for API testing.
    *   Maintained a repository of 600+ test cases.
4.  **Software Tester Intern** | Synopsys Armenia CJSC | *Oct 2016 – Jul 2018*

### Education
Create a card for each degree.

1.  **Master's degree, Electronic Design Automation (EDA)** | Synopsys Armenia | *2017-2018, 2020–2021*
    *   Thesis: Development and research of a system for testing algorithms embedded in Yield Explorer®.
2.  **Bachelor's degree, Electronic Design Automation (EDA)** | Synopsys Armenia | *2015-2017*
    *   Diploma work: "Software build system development with TCL C API".
3.  **Bachelor's degree, Information Technology** | National Polytechnic University of Armenia | *2013–2015*

---

## 6. Implementation Snippets

To ensure the specific features work, use the following logic in your code.

### For the Red Color
```css
:root {
    --primary-color: #e63946; /* Change this hex to adjust the red */
}
h1, h3, .btn-primary {
    color: var(--primary-color);
}
// Default CV Data
const defaultData = {
    profile: {
        name: "Zhudeks Ghazaryan",
        title: "QA Engineer",
        avatar: "images/avatar.jpg",
        email: "ghazaryan.zhudeks@gmail.com",
        phone: "+374 77 261190",
        linkedin: "https://www.linkedin.com/in/ghazaryanzhudeks/",
        github: "https://github.com/zhudeks"
    },
    summary: {
        text: "QA Engineer with 7+ years of experience, specializing in backend API testing and automation within the regulated banking and gambling sectors. Strong foundation in software engineering principles and a proven track record in designing, executing, and maintaining test suites. Actively transitioning skills towards a full-time SDET role, with a focused interest in building robust test automation frameworks in C#/JAVA and gRPC/REST."
    },
    skills: [
        {
            title: "Programming & Scripting",
            items: ["C# and Java (Learning/Projects)", "Shell Scripting", "SQL", "Regular Expressions"]
        },
        {
            title: "Test Automation & Tools",
            items: ["Postman (Automation & Manual)", "Swagger/OpenAPI", "TestRail", "Azure DevOps"]
        },
        {
            title: "Testing Expertise",
            items: ["API Testing (REST)", "Functional, Regression, Integration", "Cross-platform Testing", "GUI Testing"]
        },
        {
            title: "Methodologies",
            items: ["Agile/Scrum", "CI/CD Concepts", "Git Version Control", "Bug Tracking & Triage"]
        }
    ],
    experience: [
        {
            title: "QA Engineer",
            company: "Intelligent Digital Technologies",
            logo: "images/idt.jpg",
            date: "Nov 2022 – Present",
            description: [
                "Engineered and executed automated API test suites using Postman.",
                "Performed in-depth manual API testing using Swagger and Postman.",
                "Designed test cases in TestRail and Azure DevOps.",
                "Led end-to-end regression testing for production releases."
            ]
        },
        {
            title: "QA Engineer",
            company: "Converse Bank",
            logo: "images/converse.jpg",
            date: "Nov 2021 – Oct 2022",
            description: [
                "Executed manual testing for Mobile Banking (iOS/Android) and Web.",
                "Performed rigorous regression and cross-platform testing.",
                "Developed and maintained test case libraries."
            ]
        },
        {
            title: "Junior QA Engineer",
            company: "Digitain Armenia",
            logo: "images/digitain.png",
            date: "Nov 2020 – Oct 2021",
            description: [
                "Conducted manual WEB application testing (Functional, Regression, Integration).",
                "Utilized Postman and Swagger for API testing.",
                "Maintained a repository of 600+ test cases."
            ]
        },
        {
            title: "Software Tester Intern",
            company: "Synopsys Armenia CJSC",
            logo: "images/synopsys.jpg",
            date: "Oct 2016 – Jul 2018",
            description: []
        }
    ],
    education: [
        {
            title: "Master's degree, Electronic Design Automation (EDA)",
            company: "Synopsys Armenia",
            logo: "images/synopsys.jpg",
            date: "2017-2018, 2020–2021",
            description: "Thesis: Development and research of a system for testing algorithms embedded in Yield Explorer®."
        },
        {
            title: "Bachelor's degree, Electronic Design Automation (EDA)",
            company: "Synopsys Armenia",
            logo: "images/synopsys.jpg",
            date: "2015-2017",
            description: "Diploma work: \"Software build system development with TCL C API\"."
        },
        {
            title: "Bachelor's degree, Information Technology",
            company: "National Polytechnic University of Armenia",
            logo: "images/npua.png",
            date: "2013–2015",
            description: ""
        }
    ],
    settings: {
        primaryColor: "#e63946"
    }
};

// Get CV data from localStorage or use default
function getCVData() {
    const stored = localStorage.getItem('cvData');
    if (stored) {
        return JSON.parse(stored);
    }
    return defaultData;
}

// Helper to handle image source (path or base64)
function getImageSrc(path) {
    if (!path) return '';
    // If it's a data URL, return as is
    if (path.startsWith('data:')) return path;
    // Otherwise it's a file path
    return path;
}

// Render CV content
function renderCV() {
    const data = getCVData();

    // Apply primary color
    if (data.settings && data.settings.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', data.settings.primaryColor);
    }

    // Profile
    document.getElementById('displayName').textContent = data.profile.name;
    document.getElementById('displayTitle').textContent = data.profile.title;
    document.getElementById('displayAvatar').src = getImageSrc(data.profile.avatar);
    document.getElementById('displayAvatar').alt = data.profile.name;

    // Contact info
    const emailEl = document.getElementById('contactEmail');
    if (data.profile.email) {
        emailEl.querySelector('a').href = `mailto:${data.profile.email}`;
        emailEl.querySelector('a').textContent = data.profile.email;
    } else {
        emailEl.style.display = 'none';
    }

    const phoneEl = document.getElementById('contactPhone');
    if (data.profile.phone) {
        phoneEl.querySelector('a').href = `tel:${data.profile.phone}`;
        phoneEl.querySelector('a').textContent = data.profile.phone;
    } else {
        phoneEl.style.display = 'none';
    }

    const linkedinEl = document.getElementById('contactLinkedin');
    if (data.profile.linkedin) {
        linkedinEl.querySelector('a').href = data.profile.linkedin;
    } else {
        linkedinEl.style.display = 'none';
    }

    const githubEl = document.getElementById('contactGithub');
    if (data.profile.github) {
        githubEl.querySelector('a').href = data.profile.github;
        githubEl.querySelector('a').textContent = data.profile.github.replace('https://github.com/', '');
    } else {
        githubEl.style.display = 'none';
    }

    // Summary
    document.getElementById('displaySummary').textContent = data.summary.text;

    // Skills
    const skillsContainer = document.getElementById('displaySkills');
    skillsContainer.innerHTML = data.skills.map(skill => `
        <div class="skill-card">
            <h4>${skill.title}</h4>
            <ul class="skill-list">
                ${skill.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    // Experience
    const experienceContainer = document.getElementById('displayExperience');
    experienceContainer.innerHTML = data.experience.map(exp => `
        <div class="card">
            <img src="${getImageSrc(exp.logo)}" alt="${exp.company}" class="card-logo" onerror="this.style.display='none'">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <span class="card-title">${exp.title}</span>
                        <span class="card-company"> | ${exp.company}</span>
                    </div>
                    <span class="card-date">${exp.date}</span>
                </div>
                ${exp.description.length > 0 ? `
                    <ul>
                        ${exp.description.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        </div>
    `).join('');

    // Education
    const educationContainer = document.getElementById('displayEducation');
    educationContainer.innerHTML = data.education.map(edu => `
        <div class="card">
            <img src="${getImageSrc(edu.logo)}" alt="${edu.company}" class="card-logo" onerror="this.style.display='none'">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <span class="card-title">${edu.title}</span>
                        <span class="card-company"> | ${edu.company}</span>
                    </div>
                    <span class="card-date">${edu.date}</span>
                </div>
                ${edu.description ? `<p class="education-degree">${edu.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    renderCV();

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.childNodes[2];

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeUI(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = ' Light Mode';
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeText.textContent = ' Dark Mode';
        }
    }
});

// Print Function
function printCV() {
    window.print();
}

// Listen for storage changes (when admin panel updates)
window.addEventListener('storage', (e) => {
    if (e.key === 'cvData') {
        renderCV();
    }
});

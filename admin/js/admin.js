// Admin Panel JavaScript

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
        primaryColor: "#e63946",
        adminPassword: "admin123"
    }
};

// Initialize data from localStorage or use default
function getCVData() {
    const stored = localStorage.getItem('cvData');
    if (stored) {
        return JSON.parse(stored);
    }
    // Initialize with default data
    localStorage.setItem('cvData', JSON.stringify(defaultData));
    return defaultData;
}

function saveCVData(data) {
    localStorage.setItem('cvData', JSON.stringify(data));
}

// Check authentication
function isAuthenticated() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

function setAuthenticated(value) {
    sessionStorage.setItem('adminAuthenticated', value);
}

// DOM Elements
const loginModal = document.getElementById('loginModal');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const navItems = document.querySelectorAll('.nav-item');
const editSections = document.querySelectorAll('.edit-section');
const sectionTitle = document.getElementById('sectionTitle');
const saveBtn = document.getElementById('saveBtn');

// Current data
let cvData = null;

// Initialize Admin Panel
function init() {
    cvData = getCVData();

    if (!isAuthenticated()) {
        loginModal.classList.remove('hidden');
        adminPanel.classList.add('hidden');
    } else {
        loginModal.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loadFormData();
    }
}

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const storedPassword = cvData.settings.adminPassword || 'admin123';

    if (password === storedPassword) {
        setAuthenticated('true');
        loginModal.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loadFormData();
        showToast('Login successful!', 'success');
    } else {
        showToast('Invalid password!', 'error');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    setAuthenticated('false');
    window.location.reload();
});

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        showSection(section);
    });
});

function showSection(section) {
    // Update nav items
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    // Update sections
    editSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}Section`).classList.add('active');

    // Update title
    sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
}

// Load form data
function loadFormData() {
    // Profile
    document.getElementById('profileName').value = cvData.profile.name;
    document.getElementById('profileTitle').value = cvData.profile.title;
    document.getElementById('profileAvatar').value = cvData.profile.avatar;
    document.getElementById('profileEmail').value = cvData.profile.email;
    document.getElementById('profilePhone').value = cvData.profile.phone;
    document.getElementById('profileLinkedin').value = cvData.profile.linkedin;
    document.getElementById('profileGithub').value = cvData.profile.github;

    // Summary
    document.getElementById('summaryText').value = cvData.summary.text;

    // Settings
    document.getElementById('primaryColor').value = cvData.settings.primaryColor;

    // Render lists
    renderSkills();
    renderExperience();
    renderEducation();
}

// Render Skills
function renderSkills() {
    const container = document.getElementById('skillsList');
    container.innerHTML = '';

    cvData.skills.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-card-header">
                <h4>Skill Category ${index + 1}</h4>
                <div class="item-card-actions">
                    <button class="btn btn-danger btn-icon btn-sm" onclick="deleteSkill(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="item-card-body">
                <div class="form-group">
                    <label>Category Title</label>
                    <input type="text" value="${skill.title}" onchange="updateSkill(${index}, 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Skill Items</label>
                    <div class="bullet-list" id="skill-items-${index}">
                        ${skill.items.map((item, i) => `
                            <div class="bullet-item">
                                <input type="text" value="${item}" onchange="updateSkillItem(${index}, ${i}, this.value)">
                                <button class="btn btn-danger btn-icon btn-sm" onclick="deleteSkillItem(${index}, ${i})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-secondary btn-sm add-bullet-btn" onclick="addSkillItem(${index})">
                        <i class="fas fa-plus"></i> Add Item
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Render Experience
function renderExperience() {
    const container = document.getElementById('experienceList');
    container.innerHTML = '';

    cvData.experience.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-card-header">
                <h4>${exp.title} at ${exp.company}</h4>
                <div class="item-card-actions">
                    <button class="btn btn-secondary btn-icon btn-sm" onclick="moveExperience(${index}, -1)">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="btn btn-secondary btn-icon btn-sm" onclick="moveExperience(${index}, 1)">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button class="btn btn-danger btn-icon btn-sm" onclick="deleteExperience(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="item-card-body">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" value="${exp.title}" onchange="updateExperience(${index}, 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" value="${exp.company}" onchange="updateExperience(${index}, 'company', this.value)">
                </div>
                <div class="form-group">
                    <label>Logo Path</label>
                    <input type="text" value="${exp.logo}" onchange="updateExperience(${index}, 'logo', this.value)">
                </div>
                <div class="form-group">
                    <label>Date Range</label>
                    <input type="text" value="${exp.date}" onchange="updateExperience(${index}, 'date', this.value)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <div class="bullet-list" id="exp-items-${index}">
                        ${exp.description.map((item, i) => `
                            <div class="bullet-item">
                                <input type="text" value="${item}" onchange="updateExperienceItem(${index}, ${i}, this.value)">
                                <button class="btn btn-danger btn-icon btn-sm" onclick="deleteExperienceItem(${index}, ${i})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-secondary btn-sm add-bullet-btn" onclick="addExperienceItem(${index})">
                        <i class="fas fa-plus"></i> Add Description
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Render Education
function renderEducation() {
    const container = document.getElementById('educationList');
    container.innerHTML = '';

    cvData.education.forEach((edu, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-card-header">
                <h4>${edu.title}</h4>
                <div class="item-card-actions">
                    <button class="btn btn-secondary btn-icon btn-sm" onclick="moveEducation(${index}, -1)">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="btn btn-secondary btn-icon btn-sm" onclick="moveEducation(${index}, 1)">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button class="btn btn-danger btn-icon btn-sm" onclick="deleteEducation(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="item-card-body">
                <div class="form-group">
                    <label>Degree/Title</label>
                    <input type="text" value="${edu.title}" onchange="updateEducation(${index}, 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" value="${edu.company}" onchange="updateEducation(${index}, 'company', this.value)">
                </div>
                <div class="form-group">
                    <label>Logo Path</label>
                    <input type="text" value="${edu.logo}" onchange="updateEducation(${index}, 'logo', this.value)">
                </div>
                <div class="form-group">
                    <label>Date Range</label>
                    <input type="text" value="${edu.date}" onchange="updateEducation(${index}, 'date', this.value)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea onchange="updateEducation(${index}, 'description', this.value)">${edu.description}</textarea>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Skill functions
window.addNewSkill = function() {
    cvData.skills.push({ title: "New Skill Category", items: ["Item 1", "Item 2"] });
    renderSkills();
    showToast('Skill category added!', 'success');
};

window.updateSkill = function(index, field, value) {
    cvData.skills[index][field] = value;
};

window.updateSkillItem = function(skillIndex, itemIndex, value) {
    cvData.skills[skillIndex].items[itemIndex] = value;
};

window.deleteSkill = function(index) {
    cvData.skills.splice(index, 1);
    renderSkills();
    showToast('Skill category deleted!', 'success');
};

window.deleteSkillItem = function(skillIndex, itemIndex) {
    cvData.skills[skillIndex].items.splice(itemIndex, 1);
    renderSkills();
};

window.addSkillItem = function(skillIndex) {
    cvData.skills[skillIndex].items.push("New Item");
    renderSkills();
};

// Experience functions
window.addNewExperience = function() {
    cvData.experience.push({
        title: "New Position",
        company: "Company Name",
        logo: "images/favicon.png",
        date: "Date Range",
        description: ["Description point 1"]
    });
    renderExperience();
    showToast('Experience added!', 'success');
};

window.updateExperience = function(index, field, value) {
    cvData.experience[index][field] = value;
};

window.updateExperienceItem = function(expIndex, itemIndex, value) {
    cvData.experience[expIndex].description[itemIndex] = value;
};

window.deleteExperience = function(index) {
    cvData.experience.splice(index, 1);
    renderExperience();
    showToast('Experience deleted!', 'success');
};

window.deleteExperienceItem = function(expIndex, itemIndex) {
    cvData.experience[expIndex].description.splice(itemIndex, 1);
    renderExperience();
};

window.addExperienceItem = function(expIndex) {
    cvData.experience[expIndex].description.push("New description point");
    renderExperience();
};

window.moveExperience = function(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= cvData.experience.length) return;
    [cvData.experience[index], cvData.experience[newIndex]] = 
    [cvData.experience[newIndex], cvData.experience[index]];
    renderExperience();
};

// Education functions
window.addNewEducation = function() {
    cvData.education.push({
        title: "New Degree",
        company: "Institution Name",
        logo: "images/favicon.png",
        date: "Year Range",
        description: ""
    });
    renderEducation();
    showToast('Education added!', 'success');
};

window.updateEducation = function(index, field, value) {
    cvData.education[index][field] = value;
};

window.deleteEducation = function(index) {
    cvData.education.splice(index, 1);
    renderEducation();
    showToast('Education deleted!', 'success');
};

window.moveEducation = function(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= cvData.education.length) return;
    [cvData.education[index], cvData.education[newIndex]] = 
    [cvData.education[newIndex], cvData.education[index]];
    renderEducation();
};

// Save button
saveBtn.addEventListener('click', () => {
    // Update profile from form
    cvData.profile.name = document.getElementById('profileName').value;
    cvData.profile.title = document.getElementById('profileTitle').value;
    cvData.profile.avatar = document.getElementById('profileAvatar').value;
    cvData.profile.email = document.getElementById('profileEmail').value;
    cvData.profile.phone = document.getElementById('profilePhone').value;
    cvData.profile.linkedin = document.getElementById('profileLinkedin').value;
    cvData.profile.github = document.getElementById('profileGithub').value;

    // Update summary
    cvData.summary.text = document.getElementById('summaryText').value;

    // Update settings
    cvData.settings.primaryColor = document.getElementById('primaryColor').value;

    // Save to localStorage
    saveCVData(cvData);
    showToast('Changes saved successfully!', 'success');
});

// Update password
window.updatePassword = function() {
    const newPassword = document.getElementById('adminPassword').value;
    if (newPassword.length < 4) {
        showToast('Password must be at least 4 characters!', 'error');
        return;
    }
    cvData.settings.adminPassword = newPassword;
    saveCVData(cvData);
    document.getElementById('adminPassword').value = '';
    showToast('Password updated!', 'success');
};

// Reset to default
window.resetToDefault = function() {
    if (confirm('Are you sure you want to reset all data to default? This cannot be undone!')) {
        localStorage.removeItem('cvData');
        cvData = JSON.parse(JSON.stringify(defaultData));
        saveCVData(cvData);
        loadFormData();
        showToast('Data reset to default!', 'success');
    }
};

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize on load
init();

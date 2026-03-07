// CV Page JavaScript

// Render CV content from data.js
function renderCV() {
    const data = CV_DATA;

    // Apply primary color
    if (data.settings && data.settings.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', data.settings.primaryColor);
    }

    // Profile
    document.getElementById('displayName').textContent = data.profile.name;
    document.getElementById('displayTitle').textContent = data.profile.title;
    document.getElementById('displayAvatar').src = data.profile.avatar;
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
            <img src="${exp.logo}" alt="${exp.company}" class="card-logo" onerror="this.style.display='none'">
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
            <img src="${edu.logo}" alt="${edu.company}" class="card-logo" onerror="this.style.display='none'">
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

    // Footer year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
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

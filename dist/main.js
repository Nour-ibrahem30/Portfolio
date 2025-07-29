"use strict";
const links = document.querySelectorAll(".min-navbar ul li a");
const validSectionIds = ["about", "resume", "portfolio"];
const sections = {
    about: document.querySelector(".about"),
    resume: document.querySelector(".resume"),
    portfolio: document.querySelector(".portfolio"),
};
function hideAllSections() {
    Object.values(sections).forEach((section) => {
        section === null || section === void 0 ? void 0 : section.classList.remove("active");
    });
}
function showSection(id) {
    if (validSectionIds.includes(id)) {
        hideAllSections();
        const target = sections[id];
        target === null || target === void 0 ? void 0 : target.classList.add("active");
    }
}
links.forEach((link) => {
    link.addEventListener("click", function (e) {
        var _a;
        e.preventDefault();
        links.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
        const sectionId = (_a = this.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
        if (sectionId)
            showSection(sectionId);
    });
});
showSection("about");
const projectContainer = document.querySelector(".projects-container");
if (projectContainer) {
    fetch("https://api.github.com/users/Nour-ibrahem30/repos")
        .then((response) => response.json())
        .then((repos) => {
        repos.forEach((repo) => {
            const projectBox = document.createElement("div");
            projectBox.className = "project-box";
            const imageURL = `https://api.microlink.io/?url=https://nour-ibrahem30.github.io/${repo.name}/&screenshot=true&meta=false&embed=screenshot.url`;
            const screenshot = document.createElement("img");
            screenshot.src = imageURL;
            screenshot.alt = `Screenshot of ${repo.name}`;
            screenshot.style.maxWidth = "100%";
            screenshot.style.borderRadius = "10px";
            screenshot.style.marginBottom = "10px";
            const projectName = document.createElement("h3");
            projectName.textContent = repo.name;
            const githubLink = document.createElement("a");
            githubLink.textContent = "GitHub";
            githubLink.href = repo.html_url;
            githubLink.target = "_blank";
            githubLink.style.marginRight = "10px";
            const liveLink = document.createElement("a");
            liveLink.textContent = "Live Demo";
            liveLink.href = `https://nour-ibrahem30.github.io/${repo.name}/`;
            liveLink.target = "_blank";
            projectBox.appendChild(screenshot);
            projectBox.appendChild(projectName);
            projectBox.appendChild(githubLink);
            projectBox.appendChild(liveLink);
            projectContainer.appendChild(projectBox);
        });
    })
        .catch((error) => console.error("An error occurred while fetching data:", error));
}

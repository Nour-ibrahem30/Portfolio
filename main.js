const links = document.querySelectorAll(".min-navbar ul li a");
const sections = {
about: document.querySelector(".about"),
resume: document.querySelector(".resume"),
portfolio: document.querySelector(".portfolio")
};

function hideAllSections() {
Object.values(sections).forEach(section => {
if (section) section.classList.remove("active");
});
}

function showSection(id) {
hideAllSections();
const target = sections[id];
if (target) target.classList.add("active");
}

links.forEach(link => {
link.addEventListener("click", function (e) {
e.preventDefault();

links.forEach(l => l.classList.remove("active"));

this.classList.add("active");

const sectionId = this.textContent.trim().toLowerCase();
showSection(sectionId);
});
});

showSection("about");

let projectContainer = document.querySelector(".projects-container");

fetch("https://api.github.com/users/Nour-ibrahem30/repos")
  .then((response) => response.json())
  .then((repos) => {
    repos.forEach((repo) => {
      let projectBox = document.createElement("div");
      projectBox.className = "project-box";

      let imageURL = `https://api.microlink.io/?url=https://nour-ibrahem30.github.io/${repo.name}/&screenshot=true&meta=false&embed=screenshot.url`;

      let screenshot = document.createElement("img");
      screenshot.src = imageURL;
      screenshot.alt = repo.name;
      screenshot.style.maxWidth = "100%";
      screenshot.style.borderRadius = "10px";
      screenshot.style.marginBottom = "10px";

      let projectName = document.createElement("h3");
      projectName.textContent = repo.name;

      let githubLink = document.createElement("a");
      githubLink.textContent = "GitHub";
      githubLink.href = repo.html_url;
      githubLink.target = "_blank";
      githubLink.style.marginRight = "10px";

      let liveLink = document.createElement("a");
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
  .catch((error) => console.error("حدث خطأ أثناء جلب البيانات:", error));


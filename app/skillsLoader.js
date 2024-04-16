function renderSkills(skills) {
  const skillsContainer = document.querySelector(".skills");
  let html = "";

  skills.forEach((skill) => {
    html += `
    <div class="skill-box">
    <div class="skill-header">
      <i class="${skill.icon}"></i>
      <h2 class="skill-title">${skill.title} <i class="arrow-icon fas fa-chevron-down"></i></h2>
    </div>
    <div class="skill-content">
      <p>${skill.text}</p>
    </div>
  </div>
  `;
  });

  skillsContainer.innerHTML = html;
}

function initializeAccordion() {
  const skillHeaders = document.querySelectorAll(".skill-header");

  skillHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const skillContent = this.nextElementSibling;
      const arrowIcon = this.querySelector(".arrow-icon");

      // Fecha todos os outros accordions
      document.querySelectorAll(".skill-content").forEach((content) => {
        if (content !== skillContent && content.classList.contains("active")) {
          content.classList.remove("active");
          content.previousElementSibling
            .querySelector(".arrow-icon")
            .classList.remove("rotate");
        }
      });

      // Abre ou fecha o accordion atual
      skillContent.classList.toggle("active");
      arrowIcon.classList.toggle("rotate");
    });
  });
}

fetch("app/app-json/skills.json")
  .then((response) => response.json())
  .then((data) => {
    renderSkills(data.skills);
    initializeAccordion();
  })
  .catch((error) => {
    console.error("Erro ao carregar o arquivo JSON:", error);
  });

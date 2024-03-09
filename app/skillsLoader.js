fetch("app/app-json/skills.json")
  .then((response) => response.json())
  .then((data) => {
    renderSkills(data.skills);
  })
  .catch((error) => {
    console.error("Erro ao carregar o arquivo JSON:", error);
  });

function createSkillElement(skill) {
  const skillBox = document.createElement("div");
  skillBox.classList.add("skill-box");

  const icon = document.createElement("i");
  const iconClasses = skill.icon.split(" "); 
  iconClasses.forEach((className) => {
    icon.classList.add(className);
  });

  const title = document.createElement("h2");
  title.classList.add("skill__container__title");
  title.textContent = skill.title;

  skillBox.appendChild(icon);
  skillBox.appendChild(title);

  return skillBox;
}

// Função para adicionar habilidades dinamicamente ao HTML
function renderSkills(skills) {
  const skillsContainer = document.getElementById("skillsContainer");

  skills.forEach((skill) => {
    const skillElement = createSkillElement(skill);
    skillsContainer.appendChild(skillElement);
  });
}

// Chame a função para renderizar as habilidades quando a página for carregada
window.onload = function () {
  renderSkills();
};

// Função para inicializar os eventos após o carregamento completo da página
function initialize() {
  handleElementMouseOver(
    "app/app-json/interests.json",
    ".about-box",
    ".about__paragraph",
    ".about__title",
    "interests"
  );

  handleElementMouseOver(
    "app/app-json/skills.json",
    ".skill-box",
    ".skill__paragraph",
    ".skills__title",
    "skills"
  );
}

// Função para manipular eventos de mouseover e mouseout dos elementos
function handleElementMouseOver(
  jsonFile,
  elementSelector,
  textElementSelector,
  titleElementSelector,
  arrayName
) {
  const elements = document.querySelectorAll(elementSelector);
  const textElement = document.querySelector(textElementSelector);
  const titleElement = document.querySelector(titleElementSelector);
  let defaultText;
  let defaultTitle;

  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      const dataArray = data[arrayName];
      defaultText = textElement.innerHTML;
      defaultTitle = titleElement.innerHTML;

      elements.forEach((element, index) => {
        element.addEventListener("mouseover", () => {
          const { title, text } = dataArray[index];
          textElement.innerHTML = text;
          titleElement.innerHTML = title;
        });

        element.addEventListener("mouseout", () => {
          textElement.innerHTML = defaultText;
          titleElement.innerHTML = defaultTitle;
        });
      });
    })
    .catch((error) => console.error(error));
}

// Chame a função de inicialização após o carregamento completo da página
window.onload = initialize;

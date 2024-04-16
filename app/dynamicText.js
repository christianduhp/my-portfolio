// Função para inicializar os eventos após o carregamento completo da página
function initialize() {
  handleElementMouseOver(
    "app/app-json/interests.json",
    "interests",
    ".about-box",
    ".about__paragraph",
    ".about__title"
  );
}

// Função para manipular eventos de mouseover e mouseout dos elementos
function handleElementMouseOver(
  jsonFile,
  arrayName,
  elementSelector,
  textElementSelector,
  titleElementSelector
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

window.onload = initialize;

function handleElementMouseOver(elementSelector, textElementSelector, titleElementSelector, arrayName) {
  const elements = document.querySelectorAll(elementSelector);
  const textElement = document.querySelector(textElementSelector);
  const titleElement = document.querySelector(titleElementSelector);
  const defaultText = textElement.innerHTML;
  const defaultTitle = titleElement.innerHTML;

  fetch('app/app-json/about.json')
    .then(response => response.json())
    .then(data => {
      const dataArray = data[arrayName];
      elements.forEach((element, index) => {
        element.addEventListener('mouseover', () => {
          const { title, text } = dataArray[index];
          textElement.innerHTML = text;
          titleElement.innerHTML = title;
        });

        element.addEventListener('mouseleave', () => {
          textElement.innerHTML = defaultText;
          titleElement.innerHTML = defaultTitle;
        });

        element.addEventListener('touchstart', () => {
          const { title, text } = dataArray[index];
          textElement.innerHTML = text;
          titleElement.innerHTML = title;
        });

        element.addEventListener('touchend', () => {
          textElement.innerHTML = defaultText;
          titleElement.innerHTML = defaultTitle;
        });
      });
    })
    .catch(error => console.error(error));

  document.addEventListener('touchstart', (event) => {
    const isClickedElementDescendant = elements.some(element => element.contains(event.target));
    if (!isClickedElementDescendant) {
      textElement.innerHTML = defaultText;
      titleElement.innerHTML = defaultTitle;
    }
  });
}

handleElementMouseOver('.interests-box', '.about__paragraph', '.about__title', 'interests');
handleElementMouseOver('.skill__container', '.skill__paragraph', '.skills__title', 'skills');

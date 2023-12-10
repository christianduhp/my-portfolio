function handleElementMouseOver(jsonFile, elementSelector, textElementSelector, titleElementSelector, arrayName) {
  const elements = document.querySelectorAll(elementSelector);
  const textElement = document.querySelector(textElementSelector);
  const titleElement = document.querySelector(titleElementSelector);
  const defaultText = textElement.innerHTML;
  const defaultTitle = titleElement.innerHTML;


  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      const dataArray = data[arrayName];
      elements.forEach((element, index) => {
        element.addEventListener('mouseover', () => {
          const { title, text } = dataArray[index];
          textElement.innerHTML = text;
          titleElement.innerHTML = title;
        });
    
        element.addEventListener('mouseout', () => {
          textElement.innerHTML = defaultText;
          titleElement.innerHTML = defaultTitle;
        });
      });
    })
    .catch(error => console.error(error));
}

handleElementMouseOver('app/app-json/about.json', 
                      '.about-box', 
                      '.about__paragraph', 
                      '.about__title', 
                      'interests');

handleElementMouseOver('app/app-json/skills.json', 
                      '.skill-box', 
                      '.skill__paragraph', 
                      '.skills__title', 
                      'skills');
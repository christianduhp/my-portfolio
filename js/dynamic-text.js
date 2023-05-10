function handleElementMouseOver(elementSelector, textAttribute, titleAttribute, textElementSelector, titleElementSelector) {
    const elements = document.querySelectorAll(elementSelector);
    const textElement = document.querySelector(textElementSelector);
    const titleElement = document.querySelector(titleElementSelector);
    const defaultText = textElement.innerHTML;
    const defaultTitle = titleElement.innerHTML;
  
    elements.forEach(element => {
      const text = element.getAttribute(textAttribute);
      const title = element.getAttribute(titleAttribute);
      
      element.addEventListener('mouseover', () => {
        textElement.innerHTML = text;
        titleElement.innerHTML = title;
      });
  
      element.addEventListener('mouseout', () => {
        textElement.innerHTML = defaultText;
        titleElement.innerHTML = defaultTitle;
      });
    });
  }
  
  handleElementMouseOver('.interests-box', 'data-text', 'data-title', '.about__paragraph', '.about__title');
  handleElementMouseOver('.skill__container', 'data-skill-text', 'data-skill-title', '.skill__paragraph', '.skills__title');
  
const interestsBoxes = document.querySelectorAll('.interests-box');
const aboutText = document.querySelector('.about__paragraph');
const aboutTitle = document.querySelector('.about__title');

interestsBoxes.forEach(box => {
    const text = box.getAttribute('data-text');
    const title = box.getAttribute('data-title');
    const defaultText = aboutText.innerHTML;
    const defaultTitle = aboutTitle.innerHTML;
    
    box.addEventListener('mouseover', () => {
        aboutText.innerHTML = text;
        aboutTitle.innerHTML = title;
    });
    box.addEventListener('mouseout', () => {
        aboutText.innerHTML = defaultText;
        aboutTitle.innerHTML = defaultTitle;
    });
});

const skills = document.querySelectorAll('.skill__container');
const skillText = document.querySelector('.skill__paragraph');
const skillTitle = document.querySelector('.skills__title');

skills.forEach(skill => {
    const text = skill.getAttribute('data-skill-text');
    const title = skill.getAttribute('data-skill-title');
    const defaultText = skillText.innerHTML;
    const defaultTitle = skillTitle.innerHTML;
    
    skill.addEventListener('mouseover', () => {
        skillText.innerHTML = text;
        skillTitle.innerHTML = title;
    });
    skill.addEventListener('mouseout', () => {
        skillText.innerHTML = defaultText;
        skillTitle.innerHTML = defaultTitle;
    });
});


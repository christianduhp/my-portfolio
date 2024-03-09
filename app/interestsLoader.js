fetch('app/app-json/interests.json')
    .then(response => response.json())
    .then(data => {
        renderInterests(data.interests);
    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
    });

function createInterestElement(interest) {
    const interestBox = document.createElement('div');
    interestBox.classList.add('about-box');

    const icon = document.createElement('i');
    const iconClasses = interest.icon.split(' ');
    iconClasses.forEach(className => {
        icon.classList.add(className);
    });

    const title = document.createElement('h3');
    title.classList.add('interests');
    title.textContent = interest.title;

    interestBox.appendChild(icon);
    interestBox.appendChild(title);

    return interestBox;
}

function renderInterests(interests) {
    const interestsContainer = document.querySelector('.interests-box__all');

    interests.forEach(interest => {
        const interestElement = createInterestElement(interest);
        interestsContainer.appendChild(interestElement);
    });
}

window.onload = function () {
    renderInterests();
};

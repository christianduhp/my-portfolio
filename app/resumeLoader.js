  function fillTimeline(timelineId, items) {
    const timelineElement = document.getElementById(timelineId);
    let html = '';

    items.forEach(item => {
        html += `
            <div class="timeline-item">
                <div class="timeline-item-content">
                    <div class="timeline__title__date">
                        <h2>${item.company || item.university}</h2>
                        <p class="timeline__date">${item.date}</p>
                    </div>
                    <p class="timeline__text">${item.description}</p>
                </div>
            </div>
        `;
    });

    timelineElement.innerHTML = html;
}

fetch('app/app-json/resume.json')
    .then(response => response.json())
    .then(data => {
        fillTimeline('experience-timeline', data.experience);
        fillTimeline('education-timeline', data.education);
    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
    });
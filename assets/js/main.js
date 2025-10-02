document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navToggle = document.getElementById('nav-toggle');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle.checked) {
                navToggle.checked = false;
            }
        });
    });

    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', function (e) {
            const position = elem.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            elem.style.transition = `transform 0.1s ease`;
        });

        elem.addEventListener('mouseout', function (e) {
            elem.style.transform = `translate(0px, 0px)`;
            elem.style.transition = `transform 0.3s ease`;
        });
    });
    
});
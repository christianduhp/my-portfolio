function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  const start = window.pageYOffset;
  const end = section.offsetTop;
  const duration = 800; 
  function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easing(progress);
    window.scrollTo(0, start + (end - start) * ease);
    if (timeElapsed < duration) {
      requestAnimationFrame(animate);
    }
  }

  function easing(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  let startTime = null;
  requestAnimationFrame(animate);
}

function handleScroll(event) {
  // Detecta se a rolagem foi para cima ou para baixo
  const direction = event.deltaY > 0 ? 'down' : 'up';

  // Obtém as seções
  const sections = document.querySelectorAll('.section');

  // Calcula o índice da próxima ou anterior seção
  let nextIndex;
  if (direction === 'down') {
    nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
  } else {
    nextIndex = Math.max(currentSectionIndex - 1, 0);
  }

  // Obtém o ID da próxima ou anterior seção
  const nextSectionId = '#' + sections[nextIndex].id;

  // Rola para a próxima ou anterior seção
  scrollToSection(nextSectionId);

  // Atualiza o índice da seção atual
  currentSectionIndex = nextIndex;
}
// Evento de rolagem do mouse
let currentSectionIndex = 0; // Índice da seção atual
window.addEventListener('wheel', handleScroll);

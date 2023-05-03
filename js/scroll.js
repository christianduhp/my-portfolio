// Função para rolagem suave
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    const start = window.pageYOffset;
    const end = section.offsetTop;
    const duration = 800; // Defina a duração da animação em milissegundos
    let startTime = null;
  
    function animate(currentTime) {
      if (startTime === null) {
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
      // Use uma função de easing de sua escolha, por exemplo: easeInOutCubic
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
  
    requestAnimationFrame(animate);
  }
  
  // Evento de rolagem do mouse
  let currentSectionIndex = 0; // Índice da seção atual
  const scaleFactor = 100; // Fator de escala para ajustar a sensibilidade
  
  window.addEventListener('wheel', function(event) {
  
    // // Ajusta a sensibilidade da rolagem
    // window.scrollBy(0, scaleFactor);

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
  

  });
  
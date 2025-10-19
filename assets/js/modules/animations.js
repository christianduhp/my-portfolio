export function initAnimations() {
  // Inicia a biblioteca de animações AOS
  AOS.init({
    duration: 800,
    once: false,
  });

  // Garante que o AOS recalcule as posições após o carregamento
  window.addEventListener("load", () => {
    AOS.refresh();
  });
}

export function initTiltEffect() {
  // Inicia o efeito Tilt nos elementos com o atributo 'data-tilt'
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });
}

export function initMagneticEffect() {
  const magneticElements = document.querySelectorAll(".magnetic");

  magneticElements.forEach((elem) => {
    elem.addEventListener("mousemove", function (e) {
      const position = elem.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;

      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
      elem.style.transition = `transform 0.1s ease`;
    });

    elem.addEventListener("mouseout", function (e) {
      elem.style.transform = `translate(0px, 0px)`;
      elem.style.transition = `transform 0.3s ease`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Fecha o menu de navegação ao clicar em um link (para dispositivos móveis)
  const navLinks = document.querySelectorAll(".nav-menu a");
  const navToggle = document.getElementById("nav-toggle");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });

  const magneticElements = document.querySelectorAll(".magnetic");

  // Adiciona o efeito magnético aos elementos com a classe 'magnetic'
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

  // Inicia a biblioteca de animações AOS
  AOS.init();

  // Inicia o efeito Tilt nos elementos com o atributo 'data-tilt'
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15, // Rotação máxima em graus
    speed: 400, // Velocidade da transição
    glare: true, // Adiciona um efeito de brilho
    "max-glare": 0.5, // Intensidade do brilho
  });

  // Garante que o AOS recalcule as posições após o carregamento de todo o conteúdo
  window.addEventListener("load", function () {
    AOS.refresh();
  });

  // Configuração do efeito de digitação
  var typed = new Typed(".typing", {
    strings: [
      "Desenvolvendo software que resolve problemas reais",
      "Automatizando processos para acelerar seu negócio",
      "Soluções escaláveis e de alta performance",
      "Da arquitetura complexa à experiência do usuário",
      "Menos tarefas repetitivas, mais resultados estratégicos",
      "Transformando ideias complexas em software intuitivo",
      "Performance, segurança e escalabilidade em cada projeto",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2500,
    loop: true,
  });
});

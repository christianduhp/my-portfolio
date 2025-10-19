export function initTypingEffect() {
  const typingElement = document.querySelector(".typing");
  if (!typingElement) return;

  new Typed(".typing", {
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
}
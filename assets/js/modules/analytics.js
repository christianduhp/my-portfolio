export function initGtagAnalytics() {
  window.dataLayer = window.dataLayer || [];
  const id = "G-ZFDP80BWYQ";

  const imported = document.createElement("script");
  imported.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(imported);

  // define gtag globalmente
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // inicializa o GA
  gtag("js", new Date());
  gtag("config", id);
}

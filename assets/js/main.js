import {
  initAnimations,
  initTiltEffect,
  initMagneticEffect,
} from "./modules/animations.js";
import { initMobileNav } from "./modules/mobile-nav.js";
import { initTypingEffect } from "./modules/typing-effect.js";
import { initPortfolio } from "./modules/portfolio-loader.js";
import { initParticlesJS } from "./modules/particles-loader.js";
import { initGtagAnalytics } from "./modules/analytics.js";
import { initScrollSpy } from "./modules/scroll-spy.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa todos os módulos
  initAnimations();
  initTiltEffect();
  initMagneticEffect();
  initMobileNav();
  initTypingEffect();
  initPortfolio();
  initParticlesJS();
  initGtagAnalytics();
  initScrollSpy();
});

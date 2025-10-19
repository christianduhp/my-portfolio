export function initMobileNav() {
  const navLinks = document.querySelectorAll(".nav-menu a");
  const navToggle = document.getElementById("nav-toggle");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });
}

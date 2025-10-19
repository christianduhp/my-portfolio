export function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (sections.length === 0 || navLinks.length === 0) return;

  const navLinksArray = Array.from(navLinks);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          const correspondingLink = navLinksArray.find(
            (link) => link.getAttribute("href").substring(1) === sectionId
          );

          if (correspondingLink) {
            navLinks.forEach((link) => link.classList.remove("active"));
            correspondingLink.classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

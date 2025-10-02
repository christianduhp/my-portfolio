document.addEventListener("DOMContentLoaded", () => {
  const projectsGridHomepage = document.getElementById(
    "projects-grid-homepage"
  );
  const projectsGridAll = document.getElementById("projects-grid-all");
  const caseStudyContent = document.getElementById("case-study-content");

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `assets/data/projects.json?v=${new Date().getTime()}`
      );
      if (!response.ok) throw new Error("Erro ao carregar projetos.");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const createProjectCard = (project) => {
    return `
      <a href="projeto-template.html?id=${project.id}" class="project-card" data-aos="fade-up">
          <img src="${project.thumbnailImage}" alt="Mockup do ${project.title}">
          <div class="project-info">
              <h3>${project.title}</h3>
              <p>${project.subtitle}</p>
          </div>
      </a>
    `;
  };

  const loadHomepageProjects = (projects) => {
    if (!projectsGridHomepage) return;
    const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 3);
    let html = "";
    featuredProjects.forEach((project, index) => {
      const cardClass =
        index === 2 ? "project-card large-column" : "project-card";
      html += `
          <a href="projeto-template.html?id=${project.id}" class="${cardClass}" data-aos="fade-up">
              <img src="${project.thumbnailImage}" alt="Mockup do ${project.title}">
              <div class="project-info">
                  <h3>${project.title}</h3>
                  <p>${project.subtitle}</p>
              </div>
          </a>
      `;
    });
    projectsGridHomepage.innerHTML = html;
  };

  const loadAllProjects = (projects) => {
    if (!projectsGridAll) return;
    projectsGridAll.innerHTML = projects.map(createProjectCard).join("");
  };

  const loadSingleProject = (projects) => {
    if (!caseStudyContent) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    const currentIndex = projects.findIndex((p) => p.id === projectId);

    if (currentIndex === -1) {
      caseStudyContent.innerHTML = "<p>Projeto não encontrado.</p>";
      return;
    }

    const project = projects[currentIndex];

    document.title = `${project.title} | Christian Oliveira`;

    // Lógica de navegação em loop
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;
    const prevProject = projects[prevIndex];
    const nextProject = projects[nextIndex];

    let galleryHtml = "";
    if (project.galleryImages && project.galleryImages.length > 0) {
      galleryHtml = `
            <section class="project-gallery" data-aos="fade-up">
                <h2>Galeria</h2>
                <div class="gallery-grid">
                    ${project.galleryImages
                      .map(
                        (img) =>
                          `<img src="${img}" alt="Imagem da galeria do projeto ${project.title}">`
                      )
                      .join("")}
                </div>
            </section>
        `;
    }

    caseStudyContent.innerHTML = `
<section class="project-hero">

    <div class="project-header-nav">

        <a href="projeto-template.html?id=${prevProject.id}" 
           class="header-nav-link prev" 
           data-aos="fade-right" 
           aria-label="Projeto anterior: ${prevProject.title}">
            <i class="fas fa-arrow-left"></i>
            <span>${prevProject.title}</span>
        </a>

        <div class="project-title-container">
            <h1 data-aos="fade-down">${project.title}</h1>
            <p data-aos="fade-up">${project.subtitle}</p>
        </div>

        <a href="projeto-template.html?id=${nextProject.id}" 
           class="header-nav-link next" 
           data-aos="fade-left" 
           aria-label="Próximo projeto: ${nextProject.title}">
            <i class="fas fa-arrow-right"></i>
            <span>${nextProject.title}</span>
        </a>

    </div>
    
    <img src="${project.heroImage}" 
         alt="Imagem principal do projeto ${project.title}" 
         data-aos="zoom-out">
</section>

<div class="project-details">

    <div class="project-description" data-aos="fade-right">
        <h2>O Desafio</h2>
        <p>${project.challenge}</p>

        <h2>A Solução</h2>
        <p>${project.solution}</p>
    </div>

    <aside class="project-meta" data-aos="fade-left">
        <h3>Detalhes do Projeto</h3>

        <div class="meta-item">
            <strong><i class="fas fa-user-tie"></i> Cliente</strong>
            <span>${project.client}</span>
        </div>

        <div class="meta-item">
            <strong><i class="fas fa-user-cog"></i> Meu Papel</strong>
            <span>${project.myRole}</span>
        </div>

        <div class="meta-item">
            <strong><i class="fas fa-cogs"></i> Tecnologias</strong>
            <div class="tech-tags">
                ${project.technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
        </div>

        ${
          project.liveLink && project.liveLink !== "#"
            ? `
        <div class="meta-item">
            <strong><i class="fas fa-external-link-alt"></i> Ver Online</strong>
            <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">
                Acessar projeto
            </a>
        </div>`
            : ""
        }

    </aside>
</div>

${galleryHtml}
`;
  };

  (async () => {
    const projects = await fetchProjects();
    loadHomepageProjects(projects);
    loadAllProjects(projects);
    loadSingleProject(projects);
  })();
});

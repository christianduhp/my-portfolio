const PortfolioApp = {
  // REFERÊNCIAS AOS ELEMENTOS DO DOM
  elements: {
    homepageGrid: document.getElementById("projects-grid-homepage"),
    allProjectsGrid: document.getElementById("projects-grid-all"),
    caseStudyContent: document.getElementById("case-study-content"),
  },

  // ESTADO DA APLICAÇÃO
  state: {
    projects: [],
  },

  // FUNÇÕES UTILITÁRIAS
  utils: {
    async fetchProjects() {
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
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },

  // GERADORES DE HTML (TEMPLATES)
  templates: {
    createProjectCard(project, index) {
      const isLarge = project.isLarge ? "large-column" : "";
      const cardContent = this.createProjectCardContent(project);
      return `<a href="projeto-template.html?id=${project.id}" class="project-card ${isLarge}" data-id="${project.id}">${cardContent}</a>`;
    },
    createProjectCardContent(project) {
      return `
        <img src="${project.thumbnailImage}" alt="Mockup do ${project.title}">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
        </div>`;
    },
    createSingleProjectPage(project, prevProject, nextProject) {
      let galleryHtml = "";
      if (project.galleryImages && project.galleryImages.length > 0) {
        galleryHtml = `
    <section class="project-gallery" data-aos="fade-up">
        <h2>Galeria</h2>
        <div class="masonry-gallery"> 
            ${project.galleryImages
              .map(
                (img) => `
                <a href="${img}" class="gallery-item">
                    <img src="${img}" alt="Imagem da galeria do projeto ${project.title}">
                </a>
            `
              )
              .join("")}
        </div>
    </section>`;
      }

      return `
            <section class="project-hero">
                <div class="project-header-nav">
                    <a href="projeto-template.html?id=${
                      prevProject.id
                    }" class="header-nav-link prev" data-aos="fade-right" aria-label="Projeto anterior: ${
        prevProject.title
      }">
                        <i class="fas fa-arrow-left"></i><span>${
                          prevProject.title
                        }</span>
                    </a>
                    <div class="project-title-container">
                        <h1 data-aos="fade-down">${project.title}</h1>
                        <p data-aos="fade-up">${project.subtitle}</p>
                    </div>
                    <a href="projeto-template.html?id=${
                      nextProject.id
                    }" class="header-nav-link next" data-aos="fade-left" aria-label="Próximo projeto: ${
        nextProject.title
      }">
                        <i class="fas fa-arrow-right"></i><span>${
                          nextProject.title
                        }</span>
                    </a>
                </div>
                <img src="${
                  project.heroImage
                }" alt="Imagem principal do projeto ${
        project.title
      }" data-aos="zoom-out">
            </section>
            <div class="project-details">
                <div class="project-description" data-aos="fade-right">
                    <h2>O Desafio</h2><p>${project.challenge}</p>
                    <h2>A Solução</h2><p>${project.solution}</p>
                </div>
                <aside class="project-meta" data-aos="fade-left">
                    <h3>Detalhes do Projeto</h3>
                    <div class="meta-item"><strong><i class="fas fa-user-tie"></i> Cliente</strong><span>${
                      project.client
                    }</span></div>
                    <div class="meta-item"><strong><i class="fas fa-user-cog"></i> Meu Papel</strong><span>${
                      project.myRole
                    }</span></div>
                    <div class="meta-item">
                        <strong><i class="fas fa-cogs"></i> Tecnologias</strong>
                        <div class="tech-tags">${project.technologies
                          .map(
                            (tech) => `<span class="tech-tag">${tech}</span>`
                          )
                          .join("")}</div>
                    </div>
                    ${
                      project.liveLink && project.liveLink !== "#"
                        ? `
                    <div class="meta-item">
                        <strong><i class="fas fa-external-link-alt"></i> Ver Online</strong>
                        <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">Acessar projeto</a>
                    </div>`
                        : ""
                    }
                </aside>
            </div>
            ${galleryHtml}`;
    },
  },

  // FUNÇÕES QUE "MONTAM" AS PÁGINAS
  pageLoaders: {
    homepage() {
      const grid = PortfolioApp.elements.homepageGrid;
      if (!grid) return;

      // Embaralha os projetos para uma ordem aleatória a cada visita
      const allProjects = PortfolioApp.utils.shuffleArray([
        ...PortfolioApp.state.projects,
      ]);

      if (allProjects.length < 3) return;

      // --- EXIBIÇÃO INICIAL ---
      // Pega os 3 primeiros projetos para a visualização inicial
      let displayedProjects = allProjects.slice(0, 3);
      // Cria uma fila com os projetos restantes
      let projectQueue = allProjects.slice(3);

      // Função para obter o próximo projeto disponível de forma segura
      const getNextAvailableProject = () => {
        // Se a fila acabar, reabasteça-a com a lista principal,
        // excluindo os projetos que já estão em exibição.
        if (projectQueue.length === 0) {
          const displayedIds = displayedProjects.map((p) => p.id);
          projectQueue = allProjects.filter(
            (p) => !displayedIds.includes(p.id)
          );
          PortfolioApp.utils.shuffleArray(projectQueue); // Reembaralha para manter a aleatoriedade
        }
        // Retorna o próximo projeto da fila
        return projectQueue.shift();
      };

      // Define o terceiro projeto como 'grande' para o layout inicial
      if (displayedProjects.length === 3) {
        displayedProjects[2].isLarge = true;
      }

      // Renderiza o grid inicial
      grid.innerHTML = displayedProjects
        .map((p) => PortfolioApp.templates.createProjectCard(p))
        .join("");
      AOS.refresh();

      // --- LÓGICA DE ATUALIZAÇÃO DINÂMICA ---
      let cardToUpdateIndex = 0; // Começa pelo primeiro card (índice 0)
      const UPDATE_INTERVAL = 3000; // Intervalo para trocar UM card (em milissegundos)

      const updateNextCard = () => {
        const cardElements = grid.children;
        if (cardElements.length === 0) return;

        const cardToReplace = cardElements[cardToUpdateIndex];
        const newProject = getNextAvailableProject();

        if (!newProject) return;

        // Atualiza o estado dos projetos em exibição
        displayedProjects[cardToUpdateIndex] = newProject;

        // O terceiro card (índice 2) sempre terá o estilo 'grande'
        newProject.isLarge = cardToUpdateIndex === 2;

        // --- Animação e Atualização do DOM ---
        cardToReplace.style.opacity = 0;

        setTimeout(() => {
          // Atualiza o conteúdo do card
          cardToReplace.innerHTML =
            PortfolioApp.templates.createProjectCardContent(newProject);
          // Atualiza o link
          cardToReplace.href = `projeto-template.html?id=${newProject.id}`;
          // Garante que a classe de layout seja aplicada corretamente
          cardToReplace.classList.toggle("large-column", newProject.isLarge);

          // Animação de entrada
          cardToReplace.style.opacity = 1;
        }, 500); // Espera a transição de fade-out

        // Avança para o próximo card no próximo ciclo
        cardToUpdateIndex = (cardToUpdateIndex + 1) % cardElements.length;
      };

      // Inicia o loop de atualização
      setInterval(updateNextCard, UPDATE_INTERVAL);
    },
    allProjects() {
      const grid = PortfolioApp.elements.allProjectsGrid;
      if (!grid) return;
      grid.innerHTML = PortfolioApp.state.projects
        .map((p) => PortfolioApp.templates.createProjectCard(p, -1))
        .join("");
    },
    singleProject() {
      const content = PortfolioApp.elements.caseStudyContent;
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get("id");
      if (!content || !projectId) return;

      const projects = PortfolioApp.state.projects;
      const currentIndex = projects.findIndex((p) => p.id === projectId);
      if (currentIndex === -1) {
        content.innerHTML = "<p>Projeto não encontrado.</p>";
        return;
      }

      const project = projects[currentIndex];
      const prevProject =
        projects[(currentIndex - 1 + projects.length) % projects.length];
      const nextProject = projects[(currentIndex + 1) % projects.length];

      document.title = `${project.title} | Christian Oliveira`;
      content.innerHTML = PortfolioApp.templates.createSingleProjectPage(
        project,
        prevProject,
        nextProject
      );
    },
  },

  // FUNÇÃO DE INICIALIZAÇÃO
  async init() {
    this.state.projects = await this.utils.fetchProjects();
    this.pageLoaders.homepage();
    this.pageLoaders.allProjects();
    this.pageLoaders.singleProject();
  },
};

// Inicia a aplicação quando o DOM estiver pronto.
document.addEventListener("DOMContentLoaded", () => {
  PortfolioApp.init();
});

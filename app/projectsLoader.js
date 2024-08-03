function initializeProjectsSwiper() {
  const swiper = new Swiper(".projects_swiper", {
    loop: true,
    speed: 400,
    centeredSlides: true,
    allowTouchMove: true,
    pagination: {
      el: ".projects_swiper-pagination",
      type: "bullets",
    },
    autoplay: {
      delay: 2000,
    },
    cardsEffect: {
      slideShadows: false,
    },
    navigation: {
      nextEl: ".projects_swiper-button-next",
      prevEl: ".projects_swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 2,
      },
      750: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 15,
      },
    },
  });
}

async function fetchProjects() {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsWU-Gxle6meR8EJikA-vTLsw8O-3JjjT_ltyvvEYS8wWtk-AWa9ii8S8r3-ZXnO50dhBj34QfcPZk/pub?gid=0&single=true&output=csv"
  );
  const csvData = await response.text();
  projects = parseCSVtoJSON(csvData);
  // console.table(projects);
  return projects;
}

function parseCSVtoJSON(csvData) {
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  const projects = parsedData.data;

  return projects.map((project) => {
    const tags = project.tags.split(",").map((tag) => tag.trim());

    return {
      title: project.title.trim(),
      image: project.image.trim(),
      link: project.link.trim(),
      tags: tags,
    };
  });
}

const swiperWrapper = document.querySelector(".projects_swiper-wrapper");

function showProjectsOnPage(projectsList) {
  swiperWrapper.innerHTML = "";
  projectsList.forEach((project) => {
    const tags = project.tags || [];

    const tagsHTML = tags
      .map((tag) => {
        const icon = getIcon(tag);
        return `<li class="swiper-slide__tag"><i class="${icon}"></i> ${tag}</li>`;
      })
      .join("");

    swiperWrapper.innerHTML += `<div class="portfolio_swiper-slide swiper-slide">
      <a target="_blank" href="${project.link}">
        <div class="img__and__see-more">
          <img class="swiper__img" src="https://drive.google.com/thumbnail?id=${project.image}&sz=w1000" alt="${project.title}">
        
          <a target="_blank" href="${project.link}" class="swiper-slide__see-more">Ver mais</a>
        </div>
      </a>
      <div class="swiper__info__container">
        <h3 class="swiper-slide__title">${project.title}</h3>
        <ul class="swiper-slide__tags">
          ${tagsHTML}
        </ul>
      </div>
    </div>`;
  });
}

function getIcon(tag) {
  const tagMap = {
    HTML: "fab fa-html5",
    CSS: "fab fa-css3-alt",
    JavaScript: "fab fa-js-square",
    Python: "fab fa-python",
    "Excel VBA": "fas fa-file-excel",
    React: "fa-brands fa-react",
    Angular: "fa-brands fa-angular",
    Bootstrap: "fa-brands fa-bootstrap",
    "Vue.js": "fa-brands fa-vuejs",
    Docker: "fa-brands fa-docker",
    Code: "fa-solid fa-code",
    Java: "fa-brands fa-java",
    NodeJS: "fa-brands fa-node-js",
    "Machine Learning": "fa-solid fa-robot",
    MySQL: "fa-solid fa-database",
    PHP: "fa-brands fa-php",
    OpenCV: "fa-solid fa-eye",
    Mediapipe:  "fa-regular fa-hand",
    LangChain: "fa-solid fa-crow fa-flip-horizontal",
  };

  return tagMap[tag] || "";
}

fetchProjects().then(() => {
  showProjectsOnPage(projects);
  initializeProjectsSwiper();
});

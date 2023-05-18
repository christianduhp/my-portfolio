function initializeSwiper() {
    const swiper = new Swiper('.swiper', {
      loop: true,
      speed: 400,
      centeredSlides: true,
      allowTouchMove: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      autoplay: {
        delay: 2000
      },
      cardsEffect: {
        slideShadows: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 2
        },
        750: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 15    
        }
      }
    });
  }
  
  const endPointAPI = 'app/app-json/projects.json';
  fetchProjects();
  
  async function fetchProjects() {
    const res = await fetch(endPointAPI);
    projects = await res.json();
  }
  
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  
  function showProjectsOnPage(projectsList) {
    swiperWrapper.innerHTML = "";
    projectsList.forEach(project => {
      swiperWrapper.innerHTML +=
        `<div class="swiper-slide">
           <a target="_blank" href="${project.link}">
             <div class="img__and__see-more">
               <img class="swiper__img" src="${project.image}" alt="${project.title}">
               <a target="_blank" href="${project.link}" class="swiper-slide__see-more">See more</a>
             </div>
           </a>
           <div class="swiper__info__container">
             <h3 class="swiper-slide__title">${project.title}</h3>
             <ul class="swiper-slide__tags">
               ${project.tags.map(tag => `<li class="swiper-slide__tag"> ${tag}</li>`).join('')}
             </ul>
           </div>
         </div>`;
    });
  }
  
  fetchProjects().then(() => {
    showProjectsOnPage(projects);
    initializeSwiper();
  });
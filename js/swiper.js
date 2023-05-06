
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
        delay: 5000
     },
    // effect: 'cards',
    cardsEffect: {
        slideShadows: false
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2.5,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3.5,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 2.5,
            spaceBetween: 15    
        }
    
    }
});


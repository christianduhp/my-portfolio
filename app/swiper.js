const swiper = new Swiper('.swiper', {

    loop: true,
    speed: 400,
    centeredSlides: true,
    allowTouchMove: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    // autoplay: {
    //     delay: 2000
    // },
    // effect: 'cards',
    cardsEffect: {
        slideShadows: false
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is >= 
        320: {
            slidesPerView: 1,
            spaceBetween: 2
        },
        // when window width is >= 
        750: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        // when window width is >= 
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 15    
        }
    
    }
});


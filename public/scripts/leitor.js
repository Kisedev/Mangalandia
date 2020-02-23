$(document).ready(function() {
  //initialize swiper when document ready
  var Leitor = new Swiper(".swiper-container", {
    // Optional parameters
    slidesPerViews: 1,
    direction: "horizontal",
    noSwiping: true,
    noSwipingClass: "swiper-not",
    noSwipingSelector: "img",
    loop: false,
    grabCursor: true,
    keyboard: {
      enabled: true
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: true
    }
  });
  var Leitor = document.querySelector(".swiper-container").swiper;
});

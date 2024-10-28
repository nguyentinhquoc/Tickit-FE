$(document).ready(function () {
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      thresholdDelta: 70,
    },
    spaceBetween: 60,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $('#expand-button').click(function () {
    $('.extra').slideToggle()
    $('#expand-button p').text(function (i, text) {
      return text === 'Mở rộng' ? 'Thu gọn' : 'Mở rộng'
    })
  })
  $('.icon-search').click(function () {
    $('.input-search').fadeToggle()
  })
  $('.icon-pin').click(function () {
    $('.province-list').slideToggle()
  })
  $('.icon-love').click(function () {
    $(this).toggleClass('red')
  })
})

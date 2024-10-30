$(document).ready(function () {
  let currentIndex = 0;
  const slides = $(".big-banner .gallery-cell");
  const thumbnails = $(".small-banner .gallery-cell img");
  const totalSlides = slides.length;
  let autoSlideInterval;
  function showSlide(index) {
    slides.css("transform", `translateX(-${index * 100}%)`);
    thumbnails.removeClass("active");
    thumbnails.eq(index).addClass("active");
    currentIndex = index;
  }
  // function startAutoSlide () {
  //   autoSlideInterval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % totalSlides
  //     showSlide(nextIndex)
  //   }, 3000)
  // }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  // startAutoSlide()
  let startX = 0;
  $(".big-banner").on("touchstart", function (e) {
    startX = e.originalEvent.touches[0].clientX;
    stopAutoSlide();
  });
  $(".big-banner").on("touchend", function (e) {
    const endX = e.originalEvent.changedTouches[0].clientX;
    const distance = startX - endX;
    if (distance > 50) {
      showSlide((currentIndex + 1) % totalSlides);
    } else if (distance < -50) {
      showSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }
    // startAutoSlide()
  });
  thumbnails.on("click", function () {
    const index = $(this).parent().index();
    showSlide(index);
    stopAutoSlide();
    // startAutoSlide()
  });
  thumbnails.eq(currentIndex).addClass("active");
  const $listActor = $(".list-actor");
  let isDragging = false;
  let startx, scrollLeft;
  $listActor.on("mousedown", function (e) {
    isDragging = true;
    startx = e.pageX - $listActor.offset().left;
    scrollLeft = $listActor.scrollLeft();
    $listActor.css("cursor", "grabbing");
  });
  $listActor.on("mouseleave mouseup", function () {
    isDragging = false;
    $listActor.css("cursor", "grab");
  });
  $listActor.on("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - $listActor.offset().left;
    const walk = (x - startx) * 2;
    $listActor.scrollLeft(scrollLeft - walk);
  });
  $listActor.on("touchstart", function (e) {
    isDragging = true;
    const touch = e.touches[0];
    startx = touch.pageX - $listActor.offset().left;
    scrollLeft = $listActor.scrollLeft();
    $listActor.css("cursor", "grabbing");
  });
  $listActor.on("touchend touchcancel", function () {
    isDragging = false;
    $listActor.css("cursor", "grab");
  });
  $listActor.on("touchmove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - $listActor.offset().left;
    const walk = (x - startx) * 2;
    $listActor.scrollLeft(scrollLeft - walk);
  });
  $(".icon-seemore .see").on("click", function () {
    $(this).closest(".text-container").find(".text-none").slideToggle(300);
  });
  // an hien

  $(".select-infor").on("click", function () {
    var targetClass = $(this).data("target");
    console.log(targetClass);
    $(".select-infor").removeClass("active-infor");
    $(this).addClass("active-infor");

    $(".content > div").hide();

    $("." + targetClass).show();
  });
});

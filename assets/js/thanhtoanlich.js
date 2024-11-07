$(document).ready(function () {
  $(".seemore__price").on("click", function () {
    const infoNone = $(this)
      .closest(".information__price")
      .find(".information__none");
    const arrowIcon = $(this).find("img");
    const textElement = $(this).find("p");

    // Toggle slide effect with callback
    infoNone.slideToggle(300, function () {
      if (infoNone.is(":visible")) {
        textElement.text("Ẩn đi");
        arrowIcon.css("transform", "rotate(180deg)");
      } else {
        textElement.text("Chi tiết");
        arrowIcon.css("transform", "rotate(0deg)");
      }
    });
  });
});

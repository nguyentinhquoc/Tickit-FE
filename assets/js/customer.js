$(document).ready(function () {
  $("#birth-date-child-one").flatpickr({
    dateFormat: "d/m/Y",
    defaultDate: "today",
    locale: { firstDayOfWeek: 1 },
  });
  $("#birth-date-child-two").flatpickr({
    dateFormat: "d/m/Y",
    defaultDate: "today",
    locale: { firstDayOfWeek: 1 },
  });
  $("#birth-date-baby").flatpickr({
    dateFormat: "d/m/Y",
    defaultDate: "today",
    locale: { firstDayOfWeek: 1 },
  });
  $(".calendar-icon").on("click", function () {
    const inputId = $(this).next(".date-input").attr("id");
    if (inputId) {
      $("#" + inputId)[0]._flatpickr.open();
    }
  });
  $(".btn-succsit").click(function () {
    const inputs = {};
    let isValid = true;
    if (isValid) {
      console.log("Dữ liệu nhập vào:", inputs);
    }
  });

  $(".form_input").on("blur", function () {
    const $input = $(this);
    const $errorMessage = $input.siblings(".error-p");
    if ($input.val().trim() === "") {
      $input.css("border", "1px solid red");
      $errorMessage.text("Vui lòng không để trống");
    } else {
      $input.css("border", "");
      $errorMessage.text("");
    }
  });
  $(".form_input").on("click", function () {
    const $input = $(this);
    const $errorMessage = $input.siblings(".error-p");

    $input.css("border", "");
    $errorMessage.text("");
  });
  $("#phone-lh").on("blur", function () {
    const phonePattern = /^[0-9]{10,}$/;
    const $input = $(this);
    const $errorMessage = $input.siblings(".error-p");
    if ($input.val().trim() === "") {
      $input.css("border", "1px solid red");
      $errorMessage.text("Vui lòng nhập số điện thoại");
    } else if (!phonePattern.test($input.val())) {
      $input.css("border", "1px solid red");
      $errorMessage.text("Vui lòng nhập đúng số điện thoại");
    } else {
      $input.css("border", "");
      $errorMessage.text("");
    }
  });
  function validateEmail($input) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const $errorMessage = $input.siblings(".error-p");
    if ($input.val().trim() === "") {
      $input.css("border", "1px solid red");
      $errorMessage.text("Vui lòng nhập email");
    } else if (!emailPattern.test($input.val())) {
      $input.css("border", "1px solid red");
      $errorMessage.text("Vui lòng nhập đúng định dạng email");
    } else {
      $input.css("border", "");
      $errorMessage.text("");
    }
  }
  $("#email-lh").on("blur", function () {
    validateEmail($(this));
  });
  $("#email-hh").on("blur", function () {
    validateEmail($(this));
  });
  $("#mst-hh").on("blur", function () {
    const taxPattern = /^[0-9]+$/;
    const $input = $(this);
    const $errorMessage = $input.siblings(".error-p");
    if ($input.val().trim() === "") {
      $input.css("border", "1px solid red");
      $errorMessage.text("Vui lòng nhập mã số thuế");
    } else if (!taxPattern.test($input.val())) {
      $input.css("border", "1px solid red");
      $errorMessage.text("Mã số thuế chỉ được chứa số");
    } else {
      $input.css("border", "");
      $errorMessage.text("");
    }
  });
});

$(document).ready(function () {
  $(".click__date").on("click", function () {
    $(".date__none").toggle(); // Hiển thị hoặc ẩn phần lịch

    // Chỉ cuộn khi phần lịch được hiển thị
    if ($(".date__none").is(":visible")) {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      // Cuộn đến tháng hiện tại sau khi hiển thị lịch
      $(`#month-${currentYear}-${currentMonth}`)
        .get(0)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  let startDate = null;
  let endDate = null;

  function convertToLunar(date) {
    const lunarDate = date; // Placeholder for actual conversion
    return lunarDate;
  }

  function createYearCalendar(startYear) {
    const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let yearCalendar = "";

    for (let year = startYear; year <= startYear + 3; year++) {
      monthNames.forEach((monthName, month) => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        yearCalendar += `<h3 class="month__year" id="month-${year}-${month}">${monthName} ${year}</h3>`;
        yearCalendar += "<table><tr>";

        daysOfWeek.forEach((day) => {
          yearCalendar += `<th class="day">${day}</th>`;
        });
        yearCalendar += "</tr><tr>";

        for (let i = 0; i < firstDay.getDay(); i++) {
          yearCalendar += "<td></td>";
        }

        for (let date = 1; date <= lastDay.getDate(); date++) {
          const currentDate = new Date(year, month, date);
          const lunarDate = convertToLunar(currentDate);

          if (currentDate.getDay() === 0 && date !== 1) {
            yearCalendar += "</tr><tr>";
          }

          const isPastDate = currentDate < today;
          const dateClass = isPastDate ? "past-date" : "";
          yearCalendar += `<td data-date="${year}-${
            month + 1
          }-${date}" class="${dateClass}">
                      <span class="day_new">${date}
                          <span class="day_am">${lunarDate.getDate()}</span>
                      </span>
                  </td>`;
        }

        yearCalendar += "</tr></table><br>";
      });
    }

    document.getElementById("calendar").innerHTML = yearCalendar;

    // Thêm sự kiện click cho mỗi ô ngày
    $("#calendar td").on("click", function () {
      const clickedDate = $(this).data("date");
      if (clickedDate && !$(this).hasClass("past-date")) {
        const [year, month, day] = clickedDate.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        if (!startDate) {
          startDate = date;
          $("#start-date-text").text(
            ` ${daysOfWeek[date.getDay()]}, ${day}/${month}/${year}`
          );
          $(this).addClass("selected-range");
        } else if (!endDate) {
          if (date <= startDate) {
            alert("Ngày kết thúc phải lớn hơn ngày bắt đầu.");
            return;
          }
          endDate = date;
          $("#end-date-text").text(
            ` ${daysOfWeek[date.getDay()]}, ${day}/${month}/${year}`
          );
          $(this).addClass("selected-range");
        } else {
          alert(
            "Bạn đã chọn đủ ngày bắt đầu và ngày kết thúc. Vui lòng xóa một trong hai để chọn lại."
          );
        }

        highlightDates();
      }
    });

    function highlightDates() {
      $("#calendar td").removeClass("highlight-start highlight-end");

      if (startDate && endDate) {
        const start = startDate.getTime();
        const end = endDate.getTime();

        $("#calendar td").each(function () {
          const cellDate = $(this).data("date");
          if (cellDate) {
            const [year, month, date] = cellDate.split("-").map(Number);
            const currentDate = new Date(year, month - 1, date).getTime();

            if (currentDate >= start && currentDate <= end) {
              $(this).addClass("highlight");
            }
          }
        });

        const daysBetween =
          Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;
        $("#selected-days").text(`${daysBetween} ngày đã chọn`);
      }
    }

    $("#complete").on("click", function () {
      if (!startDate || !endDate) {
        alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.");
        return;
      }

      const daysBetween =
        Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;
      alert(
        `Bạn đã hoàn tất chọn ${daysBetween} ngày từ ${$(
          "#start-date-text"
        ).text()} đến ${$("#end-date-text").text()}`
      );

      $(".date__none").hide();
      $(".choose__date").removeClass("choose__date--item--click");
      $(".choose__date--item p").text(
        `Chọn từ ${$("#start-date-text p").text()} đến ${$(
          "#end-date-text p"
        ).text()}`
      );
    });

    $("#reset").on("click", function () {
      startDate = null;
      endDate = null;
      $("#start-date-text").text("Chưa chọn");
      $("#end-date-text").text("Chưa chọn");
      $("#selected-days").text("0 ngày đã chọn");
      $("#calendar td").removeClass("highlight selected-range");
    });
  }

  createYearCalendar(new Date().getFullYear());

  //

  $('.ticket-controls div:contains("+")').on("click", function () {
    let quantityElement = $(this).siblings("span");
    let quantity = parseInt(quantityElement.text());
    quantity++;
    quantityElement.text(quantity);
  });

  $('.ticket-controls div:contains("-")').on("click", function () {
    let quantityElement = $(this).siblings("span");
    let quantity = parseInt(quantityElement.text());
    if (quantity > 0) {
      quantity--;
      quantityElement.text(quantity);
    }
  });
  //
  $(".select__chon").on("click", () => {
    // Ẩn phần tử đầu tiên trong `.category__select > div`
    $(".category__select > div").first().hide();

    // Hiển thị phần tử `.date__info--none` bằng cách loại bỏ lớp `none` nếu có
    $(".date__info--none").toggleClass("hid__date");

    //
  });
  $(".btn__buy--now").on("click", () => {
    $(".category__select > div").first().show();

    // Hiển thị phần tử `.date__info--none` bằng cách loại bỏ lớp `none` nếu có
    $(".date__info--none").toggleClass("hid__date");
  });
  $(".btn__cart--date").on("click", () => {
    $(".category__select > div").first().show();

    // Hiển thị phần tử `.date__info--none` bằng cách loại bỏ lớp `none` nếu có
    $(".date__info--none").toggleClass("hid__date");
  });
});

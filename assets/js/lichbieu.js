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
          yearCalendar += `<td data-date="${year}-${month + 1
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


  // Tăng giảm số lươgnj
  document.querySelectorAll('.minus').forEach(button => { button.addEventListener('click', (event) => { const input = event.target.closest('.number-input').querySelector('.quantity'); if (input.value > 0) { input.value = parseInt(input.value) - 1; } }); }); document.querySelectorAll('.plus').forEach(button => { button.addEventListener('click', (event) => { const input = event.target.closest('.number-input').querySelector('.quantity'); input.value = parseInt(input.value) + 1; }); });

  // seat
  const btnPayment = document.getElementById('paymentTickit');
  const seatContainerEl = document.querySelector('.seating-container');
  btnPayment.addEventListener('click', function () {
    $(this).prop('disabled', true);
    var rowdata = $('#summary-table tr');
    var buoidienId = $('#hidBuoiDienId').val();
    var strtk = '';
    var i = 0;
    if (rowdata.length > 0) {
      rowdata.each(function () {
        var slve = 1;
        var veid = $(this)[0].attributes["data-giave-id"].value;
        var hanggheid = $(this)[0].attributes["data-hang-id"].value;
        var tangid = $(this)[0].attributes["data-tang-id"].value;
        var soghe = $(this)[0].attributes["data-soghe"].value;
        if (hanggheid == '0') {
          slve = parseInt($(this).find('td')[0].innerText);
        }
        if (i > 0)
          strtk += ', ';
        strtk += '{veid : ' + veid + ', hanggheid : ' + hanggheid + ', tangid : ' + tangid + ', soghe : ' + soghe + ',slve :' + slve + '}';
        i++;
      });
      var strJson = '{' +
        'buoidienid : ' + buoidienId + ',' +
        'listve : [' + strtk + ']' +
        '}';
      $.ajax({
        type: "POST",
        url: '/Home/XacNhanDatVe',
        contentType: "application/json; charset=utf-8",
        datatype: 'json',
        data: JSON.stringify({ jsonData: strJson }),
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
          $('#hidDonHangId').val(data.donhangid);
          $('#tongtienInfo').html('Tổng tiền(' + data.tickitnum + ' vé): ' + parseInt(data.amount, 10).format() + ' Đ');
          $('#exampleModalLong').modal('toggle');
        }
      });
    }
  });

  const summaryTable = document.getElementById('summary-table');

  // global variables
  let seatCount = 0;

  // function
  const totalPrice = function () {
    var countTicket = 0;
    var priceTicket = 0;
    var rowdata = $('#summary-table tr');
    countTicket = rowdata.length
    if (rowdata.length > 0) {
      countTicket = rowdata.length;
      rowdata.each(function () {
        var price = $(this).find('td')[1].innerText.replaceAll(',', '');
        priceTicket += parseInt(price);
      });
    }
    $('#summary-infor').html('Tổng tiền (' + countTicket + ' vé): ' + parseInt(priceTicket, 10).format()) + 'Đ';
  };

  const selectSeat = function (e) {
    if (e.target.classList.contains('selected')) {
      Number.prototype.format = function (n, x) {
        var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
      };
      var jsongia = JSON.parse(e.srcElement.attributes['data-giave'].value);
      var row = summaryTable.insertRow(0);
      row.setAttribute('id', 'row-' + e.target.id);
      row.setAttribute('data-giave-id', jsongia[0].giaid);
      row.setAttribute('data-soghe', e.srcElement.attributes["data-soghe"].value);
      row.setAttribute('data-hang-id', e.srcElement.attributes['data-hang'].value);
      row.setAttribute('data-tang-id', e.srcElement.attributes['data-tang'].value);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var textSeat = e.srcElement.innerText;
      // Add some text to the new cells:
      var div1 = document.createElement('div'),
        div2 = document.createElement('div'),
        div3 = document.createElement('div'),
        txt2 = document.createTextNode(textSeat);
      div1.setAttribute('class', 'sc-ticket first-class');
      div2.setAttribute('class', 'sc-ticket-seat-label');
      div2.appendChild(txt2);
      div3.setAttribute('class', 'sc-ticket-seat-type');
      if (jsongia.length > 1) {
        var i;
        var selectList = document.createElement('select');
        selectList.setAttribute('class', 'price-list');
        for (i = 0; i < jsongia.length; i++) {
          var option = document.createElement("option");
          option.value = jsongia[i].giaid + "-" + parseInt(jsongia[i].giave);
          option.text = jsongia[i].tengiave;
          selectList.appendChild(option);
        }
        selectList.addEventListener('change', function () {
          var idprice = $(this)[0].value.split('-')[0];
          var price = $(this)[0].value.split('-')[1];
          $(this).closest("tr").find('td')[1].innerText = parseInt(price, 10).format();
          console.log($(this).closest("tr"));
          $(this).closest("tr")[0].setAttribute('data-giave-id', idprice);
          totalPrice();
        });
        div3.appendChild(selectList);
      }
      else {
        var txt3 = document.createTextNode(jsongia[0].tengiave);
        div3.appendChild(txt3);
      }
      div1.appendChild(div2);
      div1.appendChild(div3);
      cell1.appendChild(div1);
      cell2.innerHTML = parseInt(jsongia[0].giave, 10).format();
      var buttonDel = document.createElement('button'),
        div4 = document.createElement('div');
      buttonDel.setAttribute('class', 'sc-cart-btn sc-cart-btn-delete');
      buttonDel.setAttribute('id', 'btndel-' + e.target.id);
      div4.setAttribute('class', 'sc-cart-btn-icon');
      div4.setAttribute('id', 'btndel-' + e.target.id);
      buttonDel.appendChild(div4);
      cell3.setAttribute('class', 'td-buttom');
      cell3.appendChild(buttonDel);
      buttonDel.addEventListener('click', function () {
        $(this).closest("tr").remove();
        e.target.classList.toggle('selected');
        totalPrice();
      });
    }
    else {
      var ide = e.target.id;
      $('#row-' + ide).remove();
    }
  }
  // event listeners
  seatContainerEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat')) {
      if (!e.target.classList.contains('sold')) {
        e.target.classList.toggle('selected');
        const selectedSeatEl = document.querySelectorAll('.seat-row .seat.selected');
        seatCount = selectedSeatEl.length;
        selectSeat(e);
        totalPrice();
        //var test = e.srcElement.attributes['data-row'].value;
      }
    }
  });
  // seat
  $('.select__chon').click(function () {
    $(this).closest('.date__items').find('.date__price').slideUp();
    $(this).closest('.date__items').find('.full_content-seat').slideDown();
    $(this).closest('.date__items').find('.sc-cart-btn-submit').click(function () {

    })
  });
});

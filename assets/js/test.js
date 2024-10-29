$(document).ready(function () {
  let selectedCategories = [];
  let selectedGenre = "all"; // Mặc định là tất cả
  let isTopGenre = false; // Biến kiểm tra thể loại top
  let topGenreName = ""; // Biến lưu tên thể loại đã chọn

  // Sự kiện khi nhấn vào radio button trong header__top--filter
  $("input[type='radio'][name='genre']").change(function () {
    // Kiểm tra nếu có radio nào đã được chọn thì bỏ chọn tất cả checkbox khác
    $("input[type='radio'][name='genre']").not(this).prop("checked", false);

    selectedGenre = this.id; // Lấy ID của radio được chọn
    isTopGenre = true; // Đánh dấu là đang chọn thể loại top
    topGenreName = $(this).next("label").text().trim(); // Lấy tên thể loại từ label tương ứng
    selectedCategories = []; // Đặt lại các thể loại đã chọn
    $(".filter input[type='checkbox']").prop("checked", false); // Bỏ chọn tất cả checkbox
    console.log("Selected Top Genre: " + topGenreName); // Ghi lại thể loại đã chọn
    applyFilter(); // Gọi hàm lọc
  });

  // Sự kiện khi nhấn vào checkbox trong header__bottom--filter
  $(".filter input[type='checkbox']").change(function () {
    const category = $(this).closest(".filter").data("filter");

    if (this.checked) {
      // Nếu checkbox được chọn, thêm vào mảng selectedCategories
      selectedCategories.push(category);
    } else {
      // Nếu checkbox bị bỏ chọn, xóa khỏi mảng selectedCategories
      selectedCategories = selectedCategories.filter(
        (item) => item !== category
      );
    }

    applyFilter(); // Gọi hàm lọc
  });

  // Hàm áp dụng lọc
  function applyFilter() {
    let items = $(".variant-fiter");

    // Nếu chọn "all" ở phần trên và không có lọc nào ở dưới
    if (selectedGenre === "all" && selectedCategories.length === 0) {
      items.css("display", "flex"); // Hiển thị tất cả sản phẩm
      return; // Kết thúc hàm
    }

    // Trường hợp chỉ lọc ở bottom
    if (!isTopGenre && selectedCategories.length > 0) {
      items.each(function () {
        const categories = $(this)
          .find(".variant2")
          .map(function () {
            return $(this).text().trim();
          })
          .get();

        const categoryMatch =
          selectedCategories.length === 0 ||
          categories.some((cat) => selectedCategories.includes(cat));

        // Hiển thị hoặc ẩn phần tử dựa trên điều kiện lọc
        if (categoryMatch) {
          $(this).css("display", "flex"); // Hiển thị phần tử
        } else {
          $(this).css("display", "none"); // Ẩn phần tử
        }
      });
      return; // Kết thúc hàm
    }

    // Trường hợp kết hợp cả hai
    items.each(function () {
      const categories = $(this)
        .find(".variant2")
        .map(function () {
          return $(this).text().trim();
        })
        .get();
      const genre = $(this).find(".time").text().trim(); // Lấy giá trị từ thẻ <p class="time">

      // Kiểm tra điều kiện lọc
      const genreMatch = isTopGenre
        ? genre === topGenreName // Hiển thị nếu thể loại khớp với tên đã chọn
        : selectedGenre === "all" || genre === selectedGenre; // Kiểm tra với thể loại khác

      const categoryMatch =
        selectedCategories.length === 0 || // Nếu không có thể loại nào được chọn
        categories.some((cat) => selectedCategories.includes(cat)); // Kiểm tra xem có thể loại nào phù hợp với sản phẩm

      // Hiển thị hoặc ẩn phần tử dựa trên điều kiện lọc
      if (genreMatch && categoryMatch) {
        $(this).css("display", "flex"); // Hiển thị phần tử
      } else {
        $(this).css("display", "none"); // Ẩn phần tử
      }
    });
  }
});

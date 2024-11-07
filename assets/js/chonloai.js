$(document).ready(function () {
  // Set initial quantity and price per item
  let quantity = 2; // initial quantity (you can change this if needed)
  const pricePerItem = 1843000; // price per item in Vietnamese currency format (e.g., 1,843,000 đ)

  // Function to format numbers to Vietnamese currency
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN") + " đ";
  }

  // Function to update the displayed quantity and price
  function updateTicketInfo() {
    // Update quantity display
    $(".ticket-controls span").text(quantity);

    // Calculate total price
    const totalPrice = quantity * pricePerItem;

    // Update total price display
    $(".ticket-item > div:first-child").text(formatCurrency(totalPrice));
  }

  // Event listener for the '-' button
  $(".ticket-controls div:first-child").on("click", function () {
    if (quantity > 1) {
      quantity--; // decrease quantity by 1
      updateTicketInfo(); // update display
    }
  });

  // Event listener for the '+' button
  $(".ticket-controls div:last-child").on("click", function () {
    quantity++; // increase quantity by 1
    updateTicketInfo(); // update display
  });

  // Initial update of ticket info on page load
  updateTicketInfo();

  // Function to get selected values and show alert
  function showSelectedValues() {
    // Get selected values from the form, or set default values if none selected
    const selectedQuantity = $(".ticket-controls > span").text();
    const selectedCapacity =
      $('input[name="capacity"]:checked').val() || "600ml";
    const selectedWineType =
      $('input[name="wine"]:checked').val() || "Vang Trắng";
    const selectedAccessory =
      $('input[name="accessory"]:checked').val() || "Không kèm ly";

    // Combine selected values into a message
    const message = `Selected Options:\n- Quantity: ${selectedQuantity}\n- Capacity: ${selectedCapacity}\n- Wine Type: ${selectedWineType}\n- Accessory: ${selectedAccessory}`;

    // Display the message in an alert
    alert(message);
  }

  // Attach click events to buttons using jQuery
  $(".btn__cart--date").on("click", showSelectedValues);
  $(".btn__buy--now").on("click", showSelectedValues);

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

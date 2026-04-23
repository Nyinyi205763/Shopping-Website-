function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("10htxS1seXS8eYNM5MK3rpWgLYBwT4JEdb9EjHZgu6gw").getSheetByName("Orders");
    var data = JSON.parse(e.postData.contents);

    var timestamp = new Date();
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var location = data.location || "";
    var orderedItems = data.orderedItems || "";
    var totalPrice = data.totalPrice || "";

    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      location,
      orderedItems,
      totalPrice,
      "Pending"
    ]);

    var telegramStatus = "skipped";

    try {
      var telegramToken = "YOUR_NEW_TELEGRAM_TOKEN";
      var chatId = "5014166684";

      var message =
        "🛒 New Order Received\n\n" +
        "👤 Name: " + name + "\n" +
        "📧 Email: " + email + "\n" +
        "📞 Phone: " + phone + "\n" +
        "📍 Location: " + location + "\n\n" +
        "📦 Ordered Items:\n" + orderedItems + "\n\n" +
        "💰 Total: $" + totalPrice;

      var telegramUrl = "https://api.telegram.org/bot" + telegramToken + "/sendMessage";

      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          chat_id: chatId,
          text: message
        }),
        muteHttpExceptions: true
      };

      var tgResponse = UrlFetchApp.fetch(telegramUrl, options);
      telegramStatus = tgResponse.getContentText();

    } catch (tgError) {
      telegramStatus = "Telegram failed: " + tgError.toString();
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Order saved successfully.",
        telegram: telegramStatus
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

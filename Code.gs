function doPost(e) {
  try {

    // ✅ (1) Google Sheet ID ထည့်
    var sheet = SpreadsheetApp
      .openById("10htxS1seXS8eYNM5MK3rpWgLYBwT4JEdb9EjHZgu6gw")
      .getSheetByName("Orders");

    // Frontend က data ကိုဖတ်
    var data = JSON.parse(e.postData.contents);

    var timestamp = new Date();
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var location = data.location || "";
    var orderedItems = data.orderedItems || "";
    var totalPrice = data.totalPrice || "";

    // Sheet ထဲ save
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

    // ✅ (2) Telegram Bot Token ထည့်
    var telegramToken = "8706026501:AAEgHPgzEpxTcan50SfPUJNkfLrDNpWcvGk";

    // ✅ (3) Chat ID ထည့်
    var chatId = "5014166684";

    var message =
      "🛒 New Order\n\n" +
      "👤 Name: " + name + "\n" +
      "📞 Phone: " + phone + "\n" +
      "📍 Location: " + location + "\n\n" +
      "📦 Items:\n" + orderedItems + "\n\n" +
      "💰 Total: $" + totalPrice;

    var url = "https://api.telegram.org/bot" + telegramToken + "/sendMessage";

    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem("Show", "showSidebar")
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("index.html");
  SpreadsheetApp.getUi().showSidebar(html);
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function onOpen() {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem("Show", "showSidebar")
    .addToUi();
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("index.html");
  SpreadsheetApp.getUi().showSidebar(html);
}

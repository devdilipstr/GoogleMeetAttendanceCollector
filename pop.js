var asSheets = document.getElementById("asSheets");
var asTxt = document.getElementById("astxt");
var meeting = document.getElementById("meeting");
var active = document.getElementById("active");
var refresh = document.getElementById("refresh");
var activeTab;
chrome.tabs.query({ active: true }, function (tab) {
  activeTab = tab[0].id;
  var fullUrl = tab[0].url;
  // https://meet.google.com/oiy-sxhx-wnh
  meeting.innerText = fullUrl.substr(24, 37);
});
asSheets.addEventListener("click", () => {
  console.log(activeTab);
  chrome.tabs.sendMessage(activeTab, "sheet");
});
refresh.addEventListener("click", () => {
  chrome.tabs.sendMessage(activeTab, "refreshed");
});

asTxt.addEventListener("click", () => {
  console.log(activeTab);
  chrome.tabs.sendMessage(activeTab, "Txt");
});

chrome.runtime.onMessage.addListener(function (response, sendResponse) {
  active.innerText = "Active" + ":" + response.active;
});

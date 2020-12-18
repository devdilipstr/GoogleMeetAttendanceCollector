function popusConverse(message) {
  chrome.extension.sendMessage(message);
}
chrome.runtime.onMessage.addListener(function (response, sendResponse) {
  var para = document.querySelectorAll(".ZjFb7c");
  var data = [];
  var counter = 0;
  date = new Date().toLocaleDateString();
  var url = document.URL;
  var textlooper = date + "\r\n" + "\r\n" + url.substr(24, 37) + "\r\n";

  while (counter < para.length) {
    textlooper = textlooper + "\r\n" + para[counter].innerText;
    data.push({ value: para[counter].innerText });
    counter++;
  }
  popusConverse({ active: data.length });

  if (response == "sheet") {
    //start
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Attendance" + Date,
      Subject: "class attendance",
      Author: "xenon chrome extension",
      CreatedDate: date,
    };
    wb.SheetNames.push("Test Sheet");
    var ws_data = [
      ["", url.substr(24, 37), ""],
      ["", date, ""],
    ];
    var c = 0;
    while (c < data.length) {
      ws_data.push(["", para[c].innerText, ""]);
      c++;
    }
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf); //create uint8array as viewer
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
      return buf;
    }
    var name = "Attendance" + date;

    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      name + ".xlsx"
    );
    ///end
  } else if (response == "Txt") {
    var blob = new Blob([textlooper], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "Attendance " + date);
  }
});

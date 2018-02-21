var reId = /^https:\/\/www\.facebook\.com\/profile\.php\?id=(\d+)$/;
var reUser = /^https:\/\/www\.facebook\.com\/([a-zA-Z0-9.]+)$/;
var lastUrlIsId = false;
var id = "";

function sendMsg(action) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {action: action,
       id: id}
    );
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.hasOwnProperty('url')) {

    // check if URL consists of username
    var resultUser = changeInfo.url.match(reUser);
    if (resultUser) {
      if (lastUrlIsId) {
        // resultUser[1] is username, but useless here.
        sendMsg("showid");
      }
    }

    // check if URL consists of Id
    var resultId = changeInfo.url.match(reId);
    if (resultId) {
      id = resultId[1];
      lastUrlIsId = true;
      sendMsg("tryAppendId");
    } else {
      lastUrlIsId = false;
    }

  }
});

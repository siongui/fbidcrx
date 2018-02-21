function showId(elm, id) {
  // check if already added
  if (elm.querySelector("a._my_added_id") != null) {
    return;
  }

  var link = document.createElement("a");
  link.setAttribute("href", "https://www.facebook.com/search/"+id+"/photos");
  link.setAttribute("target", "_blank");
  link.setAttribute("class", "_2nlw _2nlv _my_added_id");
  link.appendChild(document.createTextNode(id));

  elm.appendChild(document.createElement("br"));
  elm.appendChild(link);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.action == "showid") {
      // wait page to be loaded
      var timerId = setInterval(function() {
        var n = document.querySelector("#fb-timeline-cover-name");
        if (n != null) {
          showId(n, request.id);
          clearInterval(timerId);
        }
      }, 500);
    } else {
      // wait one second, and then try to append id to cover name
      setTimeout(function() {
        var n = document.querySelector("#fb-timeline-cover-name");
        if (n != null) {
          showId(n, request.id);
        }
      }, 2000);
    }
  });

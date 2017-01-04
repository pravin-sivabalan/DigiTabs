numberTabs();

chrome.tabs.onMoved.addListener(function() {
  numberTabs();
});

chrome.tabs.onCreated.addListener(function() {
  numberTabs();
})

function numberTabs() {
  chrome.tabs.query({currentWindow: true}, function(tabs){
    for (var i = 1; i < tabs.length + 1; ++i) {
      try {
          console.log(i);
          chrome.tabs.executeScript(tabs[i].id,{
            code:"document.title = " + i
          });
      } catch (TypeError) {
        console.log(i + "er");
        continue;
        // console.log("hello 2");
        // i = i + 1;
      }
      console.log(i + "as");
    }
  })
}

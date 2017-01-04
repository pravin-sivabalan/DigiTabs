chrome.windows.onCreated.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tab){
    chrome.tabs.executeScript(tab.id,{
      code:"document.title = 1"
    });
  });
});
// TODO: fix bug where new window opening tab doesn't give number

chrome.tabs.onMoved.addListener(function() {
  numberTabs();
});

chrome.tabs.onCreated.addListener(function() {
  console.log("new tab");
  numberTabs();
})

function numberTabs() {
  chrome.tabs.query({currentWindow: true}, function(tabs){
    for (var i = 0; i < tabs.length + 1; ++i) {
      // try {
          console.log(tabs[i]);
          var tabNum = i + 1;
          chrome.tabs.executeScript(tabs[i].id,{
            code:"document.title = "+tabNum+"."
          });
      // } catch (TypeError) {
      //   console.log("hohoh");
      //   continue;
      // }
    }
  })
}

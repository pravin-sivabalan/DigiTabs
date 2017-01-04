chrome.tabs.onMoved.addListener(function() {
  // chrome.tabs.query({currentWindow: true}, function(tabs){
  //   for (var i = 0; i < tabs.length; i++) {
  //     chrome.tabs.executeScript(tabs[i].id,{
  //       code:"document.title = " + i
  //     });
  //   }
  // })
  numberTabs();
});

chrome.tabs.onCreated.addListener(function() {
  numberTabs();
})

function numberTabs() {
  chrome.tabs.query({currentWindow: true}, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      console.log(tabs[i]);
      // chrome.tabs.executeScript(tabs[i].id,{
      //   code:"document.title = " + i
      // });
    }
  })
}

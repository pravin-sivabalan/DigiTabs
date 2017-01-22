var tabTitles = {} //stores title of tab (Key: tabId, Value: tab title)
var tabCurrNum = {} //stores location of tab for tab update scenarios (Key: tabId, Value: numLoc)

// Bug list
// TODO: Youtube new video doesn't work
// TODO: twitter new tweets doesn't reload
// TODO: facebook


setInterval(numberTabs(), 1000);


// When a tab is moved
chrome.tabs.onMoved.addListener(function() {
  numberTabs();
});

// When a tab is deleted
chrome.tabs.onRemoved.addListener(function() {
  numberTabs();
});

// When new tab is created
chrome.tabs.onCreated.addListener(function() {
  numberTabs();
});

chrome.windows.onCreated.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tab){
    chrome.tabs.executeScript(tab.id,{
      code:"document.title = 1"
    });
  });
});

// When a tabs URL is changed, thus changing title
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status == 'complete' && tab.active && !(tab.title.includes("New Tab"))){
    tabTitles[tab.id] = tab.title;
    chrome.tabs.executeScript(tabId,{
      code:"document.title = '" + tabCurrNum[tab.id] + ". " + tab.title + "'"
    });
  }
});

// Iterates through tabs and adds number to tab title
function numberTabs() {
  chrome.tabs.query({currentWindow: true}, function(tabs){
    for (var i = 0; i < tabs.length + 1; ++i) {
      try {
          var id = tabs[i].id
          var tabNum = i + 1;
          tabCurrNum[id] = tabNum;

          if (id in tabTitles) {
            var title = tabTitles[id];
            if (title === "Twitter") {
              title = tabs[i].title
            } 
          } else {
            var title = tabs[i].title;
            tabTitles[id] = title;
          }

          chrome.tabs.executeScript(id,{
            code:"document.title = '" + tabNum + ". " + title + "'"
          });
      } catch (TypeError) {
        continue;
      }
    }
  })
}

var tabTitles = {}
var tabCurrNum = {}

// TODO: Fix build up bug

chrome.windows.onCreated.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tab){
    chrome.tabs.executeScript(tab.id,{
      code:"document.title = 1"
    });
  });
});

chrome.tabs.onMoved.addListener(function() {
  numberTabs();
})

chrome.tabs.onRemoved.addListener(function() {
  numberTabs();
})

chrome.tabs.onCreated.addListener(function() {
  numberTabs();
})

chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
    if (info.url == null) {
      console.log("ignore");
    } else if (info.url === "New Tab"){
      console.log(tab.title);
    } else {
      chrome.tabs.executeScript(tabId,{
        code:"document.title = '" + tabCurrNum[tab.id] + ". " + tab.title + "'"
      });
    }
});

// function customUpdateListner(tabId, info, tab) {
//   if (info.url == null) {
//     console.log("ignore");
//   } else {
//     console.log(tab.title);
//     chrome.tabs.executeScript(tabId,{
//       code:"document.title = '" + 1 + ". " + tab.title + "'"
//     });
//     chrome.tabs.onUpdated.removeListener(customUpdateListner);
//     // return;
//   }
//     // if (info.status === "complete" && tab.active == true) {
//     //   // chrome.tabs.executeScript(tab.id,{
//     //   //   code:"document.title = '" + tabCurrNum[tab.id] + ". " + tab.title + "'"
//     //   // });
//     //   // chrome.tabs.onUpdated.removeListener(customUpdateListner);
//     //   // return;
//     //   console.log("A tab has been updated");
//     //   chrome.tabs.onUpdated.removeListener(customUpdateListner);
//     //   return
//     // }
// }
// chrome.tabs.onUpdated.addListener(customUpdateListner);


// chrome.tabs.onUpdated.addListener(function(id, url, tab) {log(tab.title);
//   console.log(tab.id);
//   console.log(tab.status);
//
//   var url = tab.url;
//   if (url !== undefined && tab.status == "complete") {
//     chrome.tabs.executeScript(tab.id,{
//       code:"document.title = '" + tabCurrNum[tab.id] + ". " + tab.title + "'"
//     });
//     chrome.tabs.onUpdated.removeListener
//   }
//
//
//   //   var title = tab.title;
//   //   tabTitles[tab.id] = title;
//   // })
//   // // numberTabs();
//   // console.log("updated");
// })

function numberTabs() {
  chrome.tabs.query({currentWindow: true}, function(tabs){
    for (var i = 0; i < tabs.length + 1; ++i) {
      try {
          var id = tabs[i].id
          var tabNum = i + 1;
          tabCurrNum[id] = tabNum;

          if (id in tabTitles) {
            var title = tabTitles[id]
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

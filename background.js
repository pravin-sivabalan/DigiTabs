document.addEventListener('DOMContentLoaded', function() {
  var print = chrome.extension.getBackgroundPage();
  var submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', function(){

  // chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tab){
  //     chrome.tabs.executeScript(tab.id,{code:"document.title = 'My lame title!'"});
  //  });

   chrome.tabs.query({}, function(tabs){
     for (var i = 0; i < tabs.length; i++) {
       print.console.log(tabs[i].id);
       chrome.tabs.executeScript(tabs[i].id,{code:"document.title = 'Pravin is Awesome'"});
     }
   });

  }, false);
}, false);

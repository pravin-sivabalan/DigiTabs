// document.addEventListener('DOMContentLoaded', function() {
//   var print = chrome.extension.getBackgroundPage();
//   var submitButton = document.getElementById('submit');
//
//   submitButton.addEventListener('click', function(){
//    chrome.tabs.query({}, function(tabs){
//      for (var i = 0; i < tabs.length; i++) {
//        chrome.tabs.executeScript(tabs[i].id,{code:"document.title = 'Pravin is Awesome'"});
//      }
//    });
//
//   }, false);
// }, false);

chrome.tabs.onCreated.addListener(function() {
  chrome.tabs.query({currentWindow: true}, function(tabs){
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.executeScript(tabs[i].id,{
        code:"document.title = " + i
      });
    }
  })
});


function changeTitle(title){
  document.title = title
}

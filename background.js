// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function OpenUrl(url, disposition){
    switch (disposition) {
        case "currentTab":
            chrome.tabs.update({url});
            break;
        case "newForegroundTab":
            chrome.tabs.create({url});
            break;
        case "newBackgroundTab":
            chrome.tabs.create({url, active: false});
            break;
      }
}

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {
        console.log('inputChanged: ' + text);
        var command = getCommand(text);
        var search = getSearchTerm(text, command);
        var apiFactory = new ApiFactory();
        var api = apiFactory.getApi(command);
        if (api !== null)
            api.GetSuggestions(search, suggest);
    });
  
  // This event is fired with the user accepts the input in the omnibox.
  chrome.omnibox.onInputEntered.addListener(
    function(text, disposition) {
      console.log('inputEntered: ' + text);
      if (text.startsWith("https://"))
        OpenUrl(text, disposition);
      else OpenUrl("http://telescope.epam.com", "newForegroundTab");
    });
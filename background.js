var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);

if (isChrome) {

    function openOrFocusOptionsPage() {
        var optionsUrl = chrome.extension.getURL('options.html');
        chrome.tabs.query({}, function (extensionTabs) {
            var found = false;
            for (var i = 0; i < extensionTabs.length; i++) {
                if (optionsUrl == extensionTabs[i].url) {
                    found = true;
                    chrome.tabs.update(extensionTabs[i].id, {
                        "selected": true
                    });
                }
            }
            if (found == false) {
                chrome.tabs.create({
                    url: "/options.html"
                });
            }
        });
    }

    chrome.extension.onConnect.addListener(function (port) {
        var tab = port.sender.tab;
        port.onMessage.addListener(function (info) {
            var max_length = 1024;
            if (info.selection.length > max_length)
                info.selection = info.selection.substring(0, max_length);
            openOrFocusOptionsPage();
        });
    });

    chrome.browserAction.onClicked.addListener(function (tab) {
        openOrFocusOptionsPage();
    });

} else {

    browser.browserAction.onClicked.addListener(function () {
        browser.tabs.create({
            url: "/options.html"
        });
    });
}
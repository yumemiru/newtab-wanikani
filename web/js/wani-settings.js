var token = "";

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);

if (isChrome) {
    chrome.storage.sync.get(['api_key'], function (items) {
        token = items.api_key;
    });
} else {
    token = window.localStorage.getItem(['api_key'])
}

$('#wanikey').val(token)

function save_form() {
    if (isChrome) {
        chrome.storage.sync.set({
            'api_key': $('#wanikey').val()
        });
    } else {
        window.localStorage.setItem("api_key", $('#wanikey').val())
    }
}
$(document).ready(function () {
    $("#save-settings").on("click", function () {
        save_form();
    });
});
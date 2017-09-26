// chrome.storage.sync.set({'api_key': 'abcdfghijklmnopqrstuvwxyz'});

var token = "";

chrome.storage.sync.get(['api_key'], function (items) {
    token = items.api_key;
    $('#wanikey').val(token)
});

function save_form() {
    chrome.storage.sync.set({
        'api_key': $('#wanikey').val()
    });
}
$(document).ready(function () {
    $("#save-settings").on("click", function () {
        save_form();
    });
});
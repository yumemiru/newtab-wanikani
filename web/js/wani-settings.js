var token = "";

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);

var version = chrome.app.getDetails().version;
var latest_version = "";

// https://api.github.com/repos/bleeps-n-bloops/newtab-wanikani/releases


function _set_version(version) {
    latest_version = version;
    $('#latest-version').text(latest_version);
}

function get_latest_version() {

    var API = "https://api.github.com/repos/bleeps-n-bloops/newtab-wanikani/releases";
    
    var version = "0.0.0";

    var status = $.ajax({
        url: API,
        dataType: 'jsonp',
        success: function(data, status){
            version = data.data[0]['tag_name']
            return version
        },
        error: function() {
            return '?.?.?'
        }
    })
    .then(_set_version(version))

}

function save_form() {
    if (isChrome) {
        chrome.storage.sync.set({
            'api_key': $('#wanikey').val()
        });
    } else {
        window.localStorage.setItem("api_key", $('#wanikey').val())
    }

    alert('Thanks! Your settings have been saved!')
}

$(document).ready(function () {

    if (isChrome) {
        chrome.storage.sync.get(['api_key'], function (items) {
            token = items.api_key;
        });
    } else {
        token = window.localStorage.getItem(['api_key'])
    }

    $('#wanikey').val(token);
    
    $('#user-version').text(version);
    $('#footer-version').text(version);

    $("#save-settings").on("click", function () {
        save_form();
    });

});
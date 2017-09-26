function show_content(key) {
    var API = "https://www.wanikani.com/api/user/" + key + "/";
    
    var API_SRS = API + "srs-distribution"
    var API_STUDY = API + "study-queue"

    $.getJSON(API_SRS, function (jsonContent) {
        var user = jsonContent.user_information;
        var study = jsonContent.requested_information;

        // #user

            // #avatar

        $('.avatar img').attr("src", "http://www.gravatar.com/avatar/" + user.gravatar + ".png?s=128");
        $('.avatar #level').text(user.level)

            // #user

        $('#info h1').text(user.username);
        $('#info h2 span').text(user.title);

        // #information

            // #statistics

        $('#information #statistics #apprentice span').text(study.apprentice.total);
        $('#information #statistics #guru span').text(study.guru.total);
        $('#information #statistics #master span').text(study.master.total);
        $('#information #statistics #enlighten span').text(study.enlighten.total);
        $('#information #statistics #burned span').text(study.burned.total);

    });

    $.getJSON(API_STUDY, function (jsonContent) {
        var user = jsonContent.user_information;
        var study = jsonContent.requested_information;

        $('#information #review #lessons span').text(study.lessons_available);
        $('#information #review #reviews span').text(study.reviews_available);
    });

};

$(document).ready(function () {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);

    if (isChrome){
        chrome.storage.sync.get(['api_key'], function(content) {
            show_content(content.api_key);
        });
    } else if(isFirefox) {
        show_content(window.localStorage.getItem(['api_key']))
    }
});
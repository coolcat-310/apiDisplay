/**
 * Created by juancarlosnavarrete on 3/7/17.
 */

var apiKey = "dc6zaTOxFJmzC";

var topics = ["Terry Crews", "puppy", "Eddie Murphy", "Amy WineHouse"];

$(document).ready(function () {

    for(var i =0; i< topics.length; i++){
        var btn = $('<a>');
        btn.addClass("btn btn-primary btn-lg");
        btn.attr('role', 'button');
        btn.text(topics[i]);
        $(".btn-container").append(btn);
    }
    $(".btn-lg").on("click", function() {
        console.log('btn click');
    })
});


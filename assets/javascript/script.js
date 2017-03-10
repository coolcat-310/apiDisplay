/**
 * Created by juancarlosnavarrete on 3/7/17.
 */

var DEBUG = true;

const apiKey = "dc6zaTOxFJmzC";
const baseURL = "http://api.giphy.com/v1/gifs/search?q=";

var topics = {
    people : ["Terry Crews", "puppy", "Eddie Murphy", "Amy WineHouse"],


    addPerson: function (person) {
        this.people.push(person);
    },
    getPeople: function () {
        return this.people;
    },
    removeSpace: function(name){
        return name.replace(/\s/g, "+");
    },
    removePlus: function(name){
        return name.replace(/\+/g, " ");
    }

};

function buildInitialButtons(){
    var arr = topics.getPeople();

    for(var i =0; i< arr.length; i++){
        buildButton(arr[i]);
    }
}

function buildGiphy(arr) {

    for(var i = 0; i < arr.length; i++){
        console.log(arr[i]);
        buildGif(arr[i]);
    }
}

function callApi(name) {

    console.log(name);
    var queryURL = baseURL + name + "&api_key=" + apiKey +"&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        if(DEBUG){
            console.log(response.data);
            console.log(Object.keys(response.data).length)
        }
        if(Object.keys(response.data).length === 0){
            //There are no gif for the given 'name'
            //change color of button to red(warning)
            console.log('inside the check');
            $("#" + name).addClass('btn-danger').removeClass('btn-primary');
            alert("There are no gif for " + topics.removePlus(name));
        }
        else {
            buildGiphy(response.data);
        }
        });
}

function buildButton(newName){
    var btn = $('<a>');
    btn.addClass("btn btn-primary btn-lg");
    btn.attr({'role': 'button', 'data-person': topics.removeSpace(newName), id: newName});
    btn.text(newName);
    $(".btn-container").append(btn);
}

function buildGif(obj){
    var gifDiv = $("<div class='item'>");
    var rating = obj.rating;
    var p = $("<p>").text("Rating: " + rating);
    var personImage = $("<img>");
    personImage.attr("src", obj.images.fixed_height.url);

    gifDiv.prepend(p);
    gifDiv.prepend(personImage);

    $(".giphy").prepend(gifDiv);
}


$(document).ready(function () {
    buildInitialButtons();
    if(DEBUG){
        console.log("Create Initial Buttons");
    }
});

$("#add-user").on("click", function(event) {
    event.preventDefault();
    var name = $("#name-input").val();
    topics.addPerson(name);
    buildButton(name);
    if(DEBUG){
        console.log("Create Button name: " + name);
    }
    $("#name-input").val(' ')
});

$(document.body).on("click", ".btn-primary", function() {

    var person = $(this).attr("data-person");
    callApi(person);
    if(DEBUG){
        console.log("Click on this button: " + person);
    }
} );



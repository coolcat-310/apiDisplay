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
    /**
     * This function creates buttons based on the array in the 'topics' object.
     * @method buildInitialButtons
     * @param none
     */
    var arr = topics.getPeople();

    for(var i =0; i< arr.length; i++){
        buildButton(arr[i]);
    }
}

function buildGiphy(arr) {
    /**
     * This function displays the results of the trivia game as a table and invokes the function updatePie()
     * @method buildGiphy
     * @param none
     */

    for(var i = 0; i < arr.length; i++){
        console.log(arr[i]);
        buildGif(arr[i]);
    }
}

function callApi(name) {
    /**
     * This function creates the URL and utilize AJAX to retrieve gifs from the API.
     * @method callApi
     * @param str: the name of the topic
     */

    console.log(name);
    var queryURL = baseURL + "" +  name + "&api_key=" + apiKey +"&limit=10";
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
            //check this if statement
            console.log('inside the check');
            var checkName = topics.removePlus(name);
            alert("There are no gif for " + topics.removePlus(name));
            $("#" + checkName).addClass('btn-danger').removeClass('btn-primary');
        }
        else {
            buildGiphy(response.data);
        }
        });
}

function buildButton(newName){
    /**
     * This function creates a button and adds classes, attributes and id
     * @method buildButton
     * @param str: which will be used as the id of the button
     */
    var btn = $('<a>');
    btn.addClass("btn btn-primary btn-lg");
    btn.attr({
        'role': 'button',
        'data-person': topics.removeSpace(newName),
        id: newName
    });
    btn.text(newName);
    $(".btn-container").append(btn);
}

function buildGif(obj){
    /**
     * This function creates a gif with several attributes
     * @method buildGif
     * @param obj: a gif object
     */

    var gifDiv = $("<div class='item'>");
    var rating = obj.rating;
    var p = $("<p>").text("Rating: " + rating);
    var personImage = $("<img>");
    personImage.attr({
        "src": obj.images.original_still.url,
        "data-animate": obj.images.fixed_height.url,
        "data-still": obj.images.original_still.url,
        "data-state": "still"
    })
    personImage.addClass("gif");
    gifDiv.prepend(p);
    gifDiv.prepend(personImage);
    $(".giphy").prepend(gifDiv);
}


$(document).ready(function () {
    /**
     * When index.html loads then this function will run.
     * @method buildGif
     */
    buildInitialButtons();
    if(DEBUG){
        console.log("Create Initial Buttons");
    }
});

$("#add-user").on("click", function(event) {
    /**
     * When the button with id:add-user is clicked then this function will run.
     * @method click
     */
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
    /**
     * When the button with class:btn-primary is clicked then this function will run.
     * @method click
     */
    var person = $(this).attr('id');
    callApi(person);
    if(DEBUG){
        console.log("Click on this button: " + person);
    }
});

$(document.body).on("click", ".gif", function () {
    /**
     * When the button with class:gif is clicked then this function will run.
     * @method click
     */
    if($(this).attr("data-state") === "animate"){
        console.log("current state has change from animate to still");
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
    else{
        console.log("current state has change from still change to animate");
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }

});



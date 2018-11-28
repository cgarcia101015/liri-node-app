require("dotenv").config();
var importKeys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


var inputString = process.argv;

var command = inputString[2];

var parameter = inputString[3];

// var outPutData;

if (command === 'concert-this') {
    BandsInTown(parameter);
};


function BandsInTown() {
    var artist = parameter;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Venue: " + response.venue.name);
        console.log("Venue Location: " + response.venue.city + "," + response.venue.country);
        console.log("Date: " + datetime);
    });
};


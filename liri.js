// variables and required packages

require("dotenv").config();

// // spotify variables
// var spotify = require("./keys.js");
var Spotify = require('node-spotify-api');
// spotify = new Spotify(keys.spotify);


// BandsInTown Variables
var axios = require("axios");
var moment = require("moment");

// OMDB Variables


// input handler
var nodeArgs = process.argv;
var command = nodeArgs[2];
var parameter = nodeArgs[3];


// command logic

if (command === 'concert-this') {
    // console.log(parameter);
    BandsInTown(parameter);
} else if (command === 'spotify-this-song') {
    console.log(parameter);
    spotify(parameter);
} else if (command === 'movie-this') {
    console.log(parameter);
    OMDB(parameter);
}


// functions

function spotify() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occured: ' + err);
        }
    console.log(data);
    });
};

   

function BandsInTown() {
    var artist = parameter;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist +  "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Venue Location: " + response.data[0].venue.city + "," + response.data[0].venue.country);
        var dateTime = response.data[0].datetime;
        dateTime = moment(dateTime).format("dddd, MMMM Do YYYY, h:mm a");
        console.log("Date: " + dateTime );
    });
};


function OMDB() {
    var movieName = parameter;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);

        }
    );
}

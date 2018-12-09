// variables and required packages

require('dotenv').config();
var fs = require("fs");

// // spotify variables
const keys = require('./keys.js');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
console.log(process.env.SPOTIFY_ID);

// BandsInTown Variables
var axios = require("axios");
var moment = require("moment");

// OMDB Variables


// input handler
var nodeArgs = process.argv;
var command = nodeArgs[2];
var parameter = "";

for (var i= 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        parameter = parameter + "+" +  nodeArgs[i];
    } else {
        parameter += nodeArgs[i];
    }
}



function spotifyx() {
    if (!parameter) {
        parameter = "the sign";
        var divider = "\n------------------------------------------------------------\n\n";
        spotify
        .search({ type: 'track', query: parameter, limit:1 })
        .then(function (response) {
            console.log("\n===============================================\n")
            console.log("Artists: " + response.tracks.items[0].artists[0].name);
            console.log("Name: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album Name: " + response.tracks.items[0].album.name);

            var spotifyData = [
                "Artists: " + response.tracks.items[0].artists[0].name,
                "Name: " + response.tracks.items[0].name,
                "Preview URL: " + response.tracks.items[0].preview_url,
                "Album Name: " + response.tracks.items[0].album.name
              ].join("\n\n");
    
            fs.appendFile("log.txt", spotifyData + divider, function(err) {
                if (err) throw err;
                console.log(spotifyData);
        });
    })
        .catch(function (err) {
            console.log(err);
        });
    } else {
    spotify
        .search({ type: 'track', query: parameter, limit:1 })
        .then(function (response) {
            console.log("\n===============================================\n")
            console.log("Artists: " + response.tracks.items[0].artists[0].name);
            console.log("Name: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log(response.tracks.items[0].album.name);

            var spotifyData = [
                "Artists: " + response.tracks.items[0].artists[0].name,
                "Name: " + response.tracks.items[0].name,
                "Preview URL: " + response.tracks.items[0].preview_url,
                "Album Name: " + response.tracks.items[0].album.name
              ].join("\n\n");
    
            fs.appendFile("log.txt", spotifyData + divider, function(err) {
                if (err) throw err;
                console.log(spotifyData);
        });
    })
        .catch(function (err) {
            console.log(err);
        });
    };

}

   

function BandsInTown() {
    var artist = parameter;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist +  "/events?app_id=codingbootcamp";
    var divider = "\n------------------------------------------------------------\n\n";

    axios.get(queryURL).then(
        function (response) {
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Venue Location: " + response.data[0].venue.city + "," + response.data[0].venue.country);
        var dateTime = response.data[0].datetime;
        dateTime = moment(dateTime).format("dddd, MMMM Do YYYY, h:mm a");
        console.log("Date: " + dateTime );

        var bandsData = [
            "Venue: " + response.data[0].venue.name,
            "Venue Location: " + response.data[0].venue.city + "," + response.data[0].venue.country,
            "Date: " + dateTime,
          ].join("\n\n");

        fs.appendFile("log.txt", bandsData + divider, function(err) {
            if (err) throw err;
            console.log(bandsData);
    });
});
};


function OMDB() {
    var movieName = parameter;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    var divider = "\n------------------------------------------------------------\n\n";


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

            var movieData = [
                "Title: " + response.data.Title,
                "Release Year: " + response.data.Year,
                "IMDB Rating: " + response.data.imdbRating,
                "Country: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors,
              ].join("\n\n");
    
            fs.appendFile("log.txt", movieData + divider, function(err) {
                if (err) throw err;
                console.log(movieData);
        });
        }
    );
}

// function randomCommand() {
//     fs.readFile("random.txt", "utf8", funciton(err, data) {
//         if (err) {
//           console.log(err);
//         }

//       });
// };


if (command === 'concert-this') {
    // console.log(parameter);
    BandsInTown(parameter);
} else if (command === 'spotify-this-song') {
    // console.log(parameter);
    spotifyx();
} else if (command === 'movie-this') {
    console.log(parameter);
    OMDB(parameter);
} else if (command === 'do-what-it-says') {
    console.log(parameter);
    randomCommand(parameter);
} else {
    console.log("Give me a proper command!");
}
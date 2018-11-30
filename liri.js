// variables and required packages

require("dotenv").config();

// // spotify variables
var importKeys = require("./keys.js");
var SpotifyWebApi = require('spotify-web-api-node');
var spotify = new Spotify(keys.spotify);

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
clientId: '08ed08fb5e044421813e9c183a7d65a0',
clientSecret: 'cc7c7e361b4848fb9312c5947847ca4c',
redirectUri: 'http://www.example.com/callback'
});

// BandsInTown Variables
var axios = require("axios");
var moment = require("moment");

// input handler
var inputString = process.argv;
var command = inputString[2];
var parameter = inputString[3];


// command logic

if (command === 'concert-this') {
    // console.log(parameter);
    BandsInTown(parameter);
} else if (command === 'spotify-this-song') {
    console.log(parameter);
    spotify(parameter);
}


// functions

function spotify() {
    // Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
  );
    
    
    // $.ajax({
    //     method: "GET",
    //     url: `https://api.spotify.com/v1/search?q=track:antarctica&type=track`
    //   }).done(function(data) {
    //     console.log(data);
    //   });
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


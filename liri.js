require("dotenv").config();
var importKeys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


var inputString = process.argv;

var command = inputString[2];

var parameter = inputString[3];

// var outPutData;

if (command === 'concert-this') {
    console.log(parameter);
    BandsInTown(parameter);
};


function BandsInTown() {
    var artist = parameter;
      

    $.ajax({
        url: artist + "/events?app_id=codingbootcamp",
        baseURL = "https://rest.bandsintown.com/artists/",
        method: "get",
        responseType: 'json',
    axios.get('')
    }).then(function (response) {
        console.log("Venue: " + response.venue.name);
        console.log("Venue Location: " + response.venue.city + "," + response.venue.country);
        console.log("Date: " + datetime);
    });
};


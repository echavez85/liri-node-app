require("dotenv").config();

// require request
let request = require("request");

// require moment
const moment = require('moment');

// require file systems
const fs = require("fs");

// link key page
const keys = require("./keys");

// initialize spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// take user command and input
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

// logic for app
function userCommand(userInput, userQuery) {
    // make decision based on the command
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays(userQuery);
            break;
        default:
            console.log("I don't understand.");
            break;
    }
}

userCommand(userInput, userQuery);

// concert function
function concertThis() {
    console.log(
        `
=================
SEARCHING FOR...${userQuery}'s next show...`);
    // use request as query
    request(`https://rest.bandsintown.com/artists/${userQuery}/events?app_id=codingbootcamp`, function (error, response, body) {
        // if everything ok, give ok message
        if (!error && response.statusCode === 200) {            
            // capture data using JSON to format
            let userBand = JSON.parse(body);
            // format date with moment
            let concertDate = moment(userBand[0].dateTime).format("MM/DD/YYYY hh:00 A");            
            // parse data
                    // console log data
                    console.log(
                        `
Artist: ${userBand[0].lineup}
Venue: ${userBand[0].venue.name}
Venue Location: ${userBand[0].venue.latitude},${userBand[0].venue.longitude}
Venue City: ${userBand[0].venue.city}, ${userBand[0].venue.country}
Date and Time: ${concertDate}
=================
                        `);

        };
    });
};

// spotify search function
function spotifyThisSong() {
    console.log(
        `
=================
SEARCHING FOR...${userQuery}`);

    //if artist not found, pass in Ace of Base instead
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };

    // spotify search
    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        // turn collected data into an array
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(
                `
Artist: ${data.tracks.items[i].album.artists[0].name}
Song: ${data.tracks.items[i].name}
Spotify link: ${data.tracks.items[i].external_urls.spotify}
Album: ${data.tracks.items[i].album.name}
=================
                `)
        };
    });
}

// omdb search function
function movieThis() {
    console.log(
        `
=================
SEARCHING FOR...${userQuery}`);
    if (!userQuery) {
        userQuery = "mr nobody";
    };
    // omdb API request
    request(`http://www.omdbapi.com/?t=${userQuery}&apikey=trilogy`, function (error, response, body) {
        if (error) {
            return console.log("Movie not found: " + error)
        }

        let userMovie = JSON.parse(body);
        if (!userMovie.Error) {
            console.log(
            `
Title: ${userMovie.Title}
Released: ${userMovie.Year}
IMDb Rating: ${userMovie.imdbRating}
Rotten Tomatoes Rating: ${userMovie.Ratings[1].Value}
Country: ${userMovie.Country}
Language: ${userMovie.Language}
Plot: ${userMovie.Plot}
Cast: ${userMovie.Actors}
=================
            `  
            )
        }
        else{
            console.log('NOT A MOVIE');
            
        }
    })
};

function doWhatItSays() {
    // read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // split data into new array
        let dataArr = data.split(",");
        // turn random.txt objects into parameters
        userInput = dataArr[0];
        userQuery = dataArr[1];
        // call function with new parameters
        userCommand(userInput, userQuery);
    });
};
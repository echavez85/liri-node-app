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

// OMDB and Bands in Town APIs
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

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
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("I don't understand.");
            break;
    }
}

userCommand(userInput, userQuery);


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
    console.log(`\n - - - - -\n\nSEARCHING FOR...${userQuery}'s next show...`);
    // use request as query
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown, function (error, response, body) {
        // if everything ok, give ok message
        if (!error && response.statusCode === 200) {
            // capture data using JSON to format
            let userBand = JSON.parse(body);
            // parse and use for loop to access data
            if(userBand.length > 0) {
                for(i=0; i<1; i++) {
                    // console log data
                    console.log(`\nWoohoo!!\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)
                    // format date with moment
                    let concertDate = moment(userBand[i].dateTime).format("MM/DD/YYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n\n- - - - -`);
                }; 
            } else{
                console.log('Band or concert not found!');
            };
        };
    });
};

// spotify search function
function spotifyThisSong() {
    console.log(`\n - - - - -\n\nSEARCHING FOR..."${userQuery}"`);

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
            console.log(`\nYass!\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
        };
    });
}


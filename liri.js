require("dotenv").config();

// require request
let request = require("request");

// require moment
const moment = require('moment');

// require file systems
const fs = require("fs");

// link key page
const keys = require("./keys.js");

// initialize spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMDB and Bands in Town APIs
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);


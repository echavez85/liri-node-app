**LIRI NODE APP**

*Description*
Liri is a command line application that takes user commands and queries from the command line and returns data from API's. The following commands have been hard coded into the program to give the user the capability to look up songs, concerts and movie information:

* **Concerts**
    *uses the bandsintown API to take a band name from the user and returns that band's next concert.

* **Spotify Songs**
    *uses the spotify API to take a song name from the user and returns the artist, song name, link to the song on spotify, and album the song is on.

* **Movies**
    *uses the OMDB API to take a movie name and returns the movie name, release year, IMDB and Rotten Tomatoes ratings, country of origin, language, plot, and cast.

* **Tasks**
    *uses readFile() method to access data from a .txt file and returns its information to execute a command/search query.

*Functionality*

* **concert-this**
    *Function takes user input and query and returns the next concert time and date for that artist as well as the location and city.
        *node liri.js concert-this **artist name**

* **spotify-this**
    *Function takes user input and query and returns the artist, track name, link to the song on Spotify, and album.
        *node liri.js spotify-this-song **song title**

* **movie-this**
    *Function takes user input and query and returns the title, release date, ratings on IMDB and Rotten Tomatoes, country of origin, language, plot, and cast.
        *node liri.js movie-this **movie title**

* **do-what-it-says**
    *Function takes user input and query to produce a surprise search based on a .txt file.
        *node liri.js do-what-it-says





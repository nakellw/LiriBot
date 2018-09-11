// Core node package for reading and writing files

require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var command = process.argv[2];
var searchOption = process.argv.slice(3).join(" ");
var fs = require('fs');

//switch or if/else to check command ='concert'/'spotify'
search(command, searchOption);

function search(command, searchOption) {
  switch (command) {
    case "concert-this":
      concertThis(searchOption);
      break;

    case "spotify-this-song":
      spotifyThisSong(searchOption);
      break;

    case "movie-this":
      movieThis(searchOption);
      break;

    case "do-what-it-says":
      doWhatItSays(searchOption);
      break;
    default:
      console.log("Enter a command");
  };
}

function concertThis(searchOption) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + searchOption + "/events?app_id=codingbootcamp";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      
      var data = JSON.parse(body);

      var display = 
        `
        \nName of the Venue: ${data[0].venue.name}
        \nVenue Location: ${data[0].venue.city}
        \nDate of the Event: ${moment(data[0].datetime).format('L')}
        `

      fs.appendFile("log.txt", display, function (error) {
        if (error) throw error;
        console.log(display);
      });
    }
  });
};


function spotifyThisSong(searchOption) {

  spotify.search({ type: 'track', query: searchOption }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songInfo = data.tracks.items[0];

    var display = `
    \nArtist(s): ${songInfo.album.artists[0].name}
    \nSong Name: ${songInfo.name}
    \nPreview Link: ${songInfo.preview_url}
    \nAlbum: ${songInfo.album.name}
    `

    fs.appendFile("log.txt", display, function (error) {
      if (error) throw error;
      console.log(display);
    });

  });
}

function movieThis(searchOption) {

  var queryUrl = "http://www.omdbapi.com/?t=" + searchOption + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body))

      display = `
      
      \nTitle: ${JSON.parse(body).Title}
      \nRelease Year: ${JSON.parse(body).Year}
      \nIMDB Rating: ${JSON.parse(body).imdbRating}
      \nRotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value }
      \nCountry: ${JSON.parse(body).Country}
      \nLanguage: ${JSON.parse(body).Language}
      \nPlot: ${JSON.parse(body).Plot}
      \nActors: ${JSON.parse(body).Actors}
      `
    }

    fs.appendFile("log.txt", display, function (error) {
      if (error) throw error;
      console.log(display);
    });

  });
};

function doWhatItSays() {
  fs.readFile('random.txt', "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
    if (dataArr[0] === "spotify-this-song") {
      var songcheck = dataArr[1].slice(1, -1);
      spotifyThisSong(songcheck);
    } else if (dataArr[0] === "concert-this") {
      var concert_event = dataArr[1].slice(1, -1);
      concertthis(concert_event);
    } else if (dataArr[0] === "movie-this") {
      var movie_name = dataArr[1].slice(1, -1);
      movieThis(movie_name);
    }

  });

};



// function song(){
//   console.log(keys.spotify)
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }

// console.log(data); 
// });
// }
// song();
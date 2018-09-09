// Core node package for reading and writing files

require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys=require('./keys.js')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var command = process.argv[2];
var searchoption= process.argv[3];
//switch or if/else to check command ='concert'/'spotify'
switch (command){
  case "concert-this":
  Spotify(searchoption);
  break;

  case "spotify-this-song":
  Spotify(searchoption);
  break;

  case "movie-this":
  Spotify(searchoption);
  break;

  case "concert-this":
  Spotify(searchoption);
  break;

}

function song(){
  console.log(keys.spotify)
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}
song();
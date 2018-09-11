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
  concertthis(searchoption);
  break;

  case "spotify-this-song":
  spotifythissong(searchoption);
  break;

  case "movie-this":
  moviethis(searchoption);
  break;


  case "do-what-it-says":
  dowhatitsays(searchoption);
  break;



};
function concertthis(searchoption) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + searchoption + "/events?app_id=codingbootcamp";

  request(queryUrl, function(error, response, body) {
    
    if (!error && response.statusCode === 200) {
      console.log(data);
      console.log("Name of the Venue: " + JSON.parse(body).venue.name);
      console.log("Venue Location: " + JSON.parse(body).venue.city);
      console.log("Date of the Event: " + JSON.parse(body).datetime.format('L'));
      
  }``
});
};


function spotifythissong (searchoption){

  
      spotify.search({ type: 'track', query: searchoption }, function(err, data) {
        if (err){
                console.log('Error occurred: ' + err);
                return;
            }
  
            var songInfo = data.tracks.items;
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);

            fs.appendFile("log.txt", results, function (error) {
              if (error) throw error;
              console.log(results);
          });
      
    });
    }

  function moviethis(searchoption) {

    var queryUrl = "http://www.omdbapi.com/?t=" + searchoption + "&y=&plot=short&apikey=40e9cece";
  
    request(queryUrl, function(error, response, body) {
      
      if (!error && response.statusCode === 200) {
  
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
  };

  function dowhatitsays() {
    fs.readFile('random.txt', "utf8", function(error, data){
  
      if (error) {
          return console.log(error);
        }
  
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
  
      // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
      if (dataArr[0] === "spotify-this-song") {
        var songcheck = dataArr[1].slice(1, -1);
        spotifythissong(songcheck);
      } else if (dataArr[0] === "concert-this") {
        var concert_event = dataArr[1].slice(1, -1);
        concertthis(concert_event);
      } else if(dataArr[0] === "movie-this") {
        var movie_name = dataArr[1].slice(1, -1);
        moviethis(movie_name);
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
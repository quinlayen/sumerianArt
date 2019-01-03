"use strict";
const request = require("request-promise-native");
const cheerio = require("cheerio");

/* this function will scrape the url and return an array of objects which will
   contain pairs of links and jpeg images.  The links will be to art that contains the key
   word(s) provided by the user.  Each link will also be accompanied by a thumbnail to each
   painting that will be used in the Sumerian app.
*/

module.exports.getArtList = async (event, context) => {
  var query_word = "hawaiian";
  // if (process.argv.length > 2) {
  //   query_word = process.argv[2];
  // }

  // Send query to the Chicago museum site
  let url = "https://www.artic.edu/collection?q=" + query_word;


  let baseReq = await request(url);
    
    try {
    
      const $ = cheerio.load(baseReq);
  
      var links = [];
      $("#artworksList")
        .children()
        .each(function() {
          let $link = $(this)
            .find("a")
            .attr("href");
          let $image = $(this).find("img").attr("data-pin-media")
          if($image) {
            links.push({'link':$link, 'image':$image});
          }
        });

      if (links.length > 0) {
        console.log(
          "Found " + links.length + " '" + query_word + "' pictures.\n"
        );
        links.forEach(function(item) {
          console.log(item);
        });
      } else {
        console.log("No image found for '" + query_word + "'");
      }
    } catch (e) {
      console.error(e);
    }
  };



  
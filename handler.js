"use strict";
const request = require("request-promise-native");
const cheerio = require("cheerio");

module.exports.getArt = async (event, context) => {
  var query_word = "hawaiian";
  // if (process.argv.length > 2) {
  //   query_word = process.argv[2];
  // }

  // Send query to the Chicago museum site
  let url = "https://www.artic.edu/collection?q=" + query_word;

 

  let baseReq = await request(url);
    console.log('baseReq: ')
    try {
      console.log("trying");
      const $ = cheerio.load(baseReq);

      var links = [];
      $("#artworksList")
        .children()
        .each(function() {
          let $link = $(this)
            .find("a")
            .attr("href");
          links.push($link);
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



  
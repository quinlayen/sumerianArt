"use strict";
const request = require("request-promise-native");
const cheerio = require("cheerio");


module.exports.getDimensions = async (event, context) => {
  let url = 'https://www.artic.edu/artworks/27992/a-sunday-on-la-grande-jatte-1884';

  let baseReq = await request(url);
  
    try {
      const $ = cheerio.load(baseReq);
      var re_cm = /([\d\.]+) × ([\d\.]+) cm/;
  
      $("#dl-artwork-details").children().each(function() {
          var $dt = $(this);
          var $dd = $dt.nextUntil('dt');
          
          if ( $dt.text().trim() === "Dimensions" ){
              var trimedLine = $dd.text().trim();
     
              if (re_cm.test(trimedLine)) {
                  var size = trimedLine.match(re_cm);
                  console.log("size (h,w) = (" + size[1] + " cm, " + size[2] + " cm)");
              } else {
                  // Unknown format
                  //console.log(trimedLine);
              }
          } else {
            //console.log($dt.text().trim());
        }   
    }
      )} catch (e){
    console.log(e);
  }
}
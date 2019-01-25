"use strict";

const dispatch = require('../lex/dispatch');

module.exports.lexIntents = async (event, context) => {
  try {
    //console.log(`event.bot.name:  ${event.bot.name}`);
    console.log("received event: ", JSON.stringify(event));
    //console.log("context: ", context);
    dispatch(event, (response)=>{
        console.log(`response: ${response}`)
    })

  } catch (e) {
    console.log(e);
  }
};

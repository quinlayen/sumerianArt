'use strict';

module.exports = intentRequest =>{
    const intentName = intentRequest.currentIntent.name;
    console.log(`intentRequestUser: ${intentRequest.userId}, intentName: ${intentName}`);
    
    if (intentName == 'ChoosePaintingToLookAt'){
        console.log(intentName + ' was called');
    }
    
    throw new Error(`Intent with name ${intentName} is not supported`);
}
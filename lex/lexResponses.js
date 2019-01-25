'use strict';

//these responses tell Lex what to do following the response

//the delegate response directs Lex to chose the next course of action based on the configuration.
//must include any session attributes, and the slots field must include all of the slots 
//specified for the requested intent. If the value of the field is unknown, you must set it to null
module.exports.delegate = (sessionAttributes, slots) =>{
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots
        },
    };
}

//Informs Amazon Lex that the user is expected to provide a slot value in the response.
//The intentName, slotToElicit, and slots fields are required. The slots field must include 
//all of the slots specified for the requested intent. 
module.exports.elicitSlot = (sessionAttributes, intentName, slots, slotToElicit, message) =>{
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message
        },
    };
}

//Informs Amazon Lex not to expect a response from the user. 
//The fulfillmentState field is required. Amazon Lex uses this value to set the dialogState
//field in the PostContent or PostText response to the client application.
module.exports.close = (sessionAttibutes,fulfillmentState, message) =>{
    return {
        sessionAttibutes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message
        },
    };
}
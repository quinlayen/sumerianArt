"use strict";

const lexResponses = require("./lexResponses");

//validation rules
const styles = ["post-impressionism", "impressionism", "realism", "modernism"];

const buildValidationResult = (isValid, violatedSlot, messageContent) => {
  if (messageContent === null) {
    return {
      isValid,
      violatedSlot
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: "PlainText", content: messageContent }
  };
};

module.exports = intentRequest => {
  let paintingStyle = intentRequest.currentIntent.slots.paintingStyles;
  console.log(`You want to see ${paintingStyle}`);

  const source = intentRequest.invocationSource;

  if (source === "DialogueCodeHook") {
    const slots = intentRequest.currentIntent.slots;
    const validationResult = validateRequest(paintingStyle);

    if (!validationResult.isValid) {
      slots[`${validationResult.violatedSlot}`] = null;
      lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        intentRequest.currentIntent.name,
        slots,
        validationResult
      );
    }
    lexResponses.delegate(
      intentRequest.sessionAttributes,
      intentRequest.currentIntent.slots
    );
    return;
  }
};

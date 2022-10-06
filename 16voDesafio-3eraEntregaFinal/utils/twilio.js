const { config } = require("./config");

const client = require("twilio")(config.accountSid, config.authToken);

module.exports = { client };

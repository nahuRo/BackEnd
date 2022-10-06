// mail
const { createTransport } = require("nodemailer");
const { config } = require("./config");

const transporter = createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: config.FROM_MAIL, // mail que envia
		pass: config.PASS_MAIL, // pass general del mail que envia
	},
});

module.exports = { transporter };

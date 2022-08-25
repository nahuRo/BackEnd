const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema(
	{
		user: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = prodSchema;

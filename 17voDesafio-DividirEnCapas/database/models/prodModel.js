const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema(
	{
		tittle: { type: String, required: true },
		price: { type: Number, required: true },
		thumbnail: { type: String, required: true },
		description: { type: String, required: true },
		stock: { type: Number, required: true },
		codeBar: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = prodSchema;

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
	{
		tittle: { type: String, required: true },
		products: [
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
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = cartSchema;

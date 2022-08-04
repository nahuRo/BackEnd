import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema(
	{
		tittle: { type: String, required: true },
		products: [
			{
				tittle: { type: String, required: true, unique: false },
				price: { type: Number, required: true },
				thumbnail: { type: String, required: true },
				descripcion: { type: String, required: true },
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

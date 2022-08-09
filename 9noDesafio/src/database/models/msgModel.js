import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema(
	{
		author: {
			id: { type: String, required: true, unique: false },
			nombre: { type: String, required: true, unique: false },
			apellido: { type: String, required: true, unique: false },
			edad: { type: Number, required: true, unique: false },
			alias: { type: String, required: true, unique: false },
			avatar: { type: String, required: true, unique: false },
		},
		text: { type: String, required: true, unique: false },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

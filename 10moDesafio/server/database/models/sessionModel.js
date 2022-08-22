import mongoose from "mongoose";

export const sessionSchema = new mongoose.Schema({
	_id: { type: String },
	expires: { type: String },
	session: { type: String },
});

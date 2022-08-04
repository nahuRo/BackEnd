import mongoose from "mongoose";

export const ConnectionDB = () => {
	// uri
	const DB_URI = "mongodb+srv://agussCoder:agus123@cluster0.ezyymjl.mongodb.net/mibase?retryWrites=true&w=majority";

	// conexion con la bd
	mongoose.connect(DB_URI, {}, (err) => {
		err ? console.log("Error de Conexion", err) : console.log("Conexion con Exitosa con DB");
	});
};

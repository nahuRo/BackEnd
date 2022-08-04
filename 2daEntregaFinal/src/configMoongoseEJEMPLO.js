// import mongoose from "mongoose";
// // import { Product } from "../models/prodModel.js";

// const ConnectionDB = async () => {
// 	// conexion con la bd
// 	// const DB_URI = process.env.DB_URI;
// 	const DB_URI = "mongodb+srv://agussCoder:agus123@cluster0.ezyymjl.mongodb.net/mibase?retryWrites=true&w=majority";
// 	// password agus123

// 	await mongoose.connect(DB_URI, {}, (err) => {
// 		err ? console.log("Error de Conexion", err) : console.log("Conexion con Exitosa con DB");
// 	});

// 	// creo el modelo de una coleccion
// 	const prodSchema = new mongoose.Schema(
// 		{
// 			tittle: String,
// 			price: Number,
// 			thumbnail: String,
// 			descripcion: String,
// 			stock: Number,
// 			codeBar: Number,
// 		},
// 		{
// 			timestamps: true,
// 			versionKey: false,
// 		}
// 	);

// 	// creo un "clase" de prodSchema
// 	const Product = mongoose.model("Product", prodSchema);

// 	const item = new Product({
// 		tittle: "ultimo",
// 		price: "1000",
// 		thumbnail:
// 			"https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
// 		descripcion: "Zapatillas",
// 		stock: "9",
// 		codeBar: 105776,
// 	});

// 	console.log(await item.save());
// 	await mongoose.connection.close();
// };

// ConnectionDB();

// export default main;

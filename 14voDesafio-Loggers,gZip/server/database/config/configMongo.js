const mongoose = require("mongoose");

const ConnectionDB = () => {
	// conexion con la bd
	mongoose.connect(process.env.DB_URI, {}, (err) => {
		err ? console.log("Error de Conexion", err) : console.log("Conexion con Exitosa con DB");
	});
};

module.exports = { ConnectionDB };

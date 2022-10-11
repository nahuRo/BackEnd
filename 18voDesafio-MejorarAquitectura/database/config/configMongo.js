const mongoose = require("mongoose");
const { config } = require("../../utils/config");

const ConnectionDB = () => {
	// conexion con la bd
	mongoose.connect(config.DB_URI, {}, (err) => {
		err ? console.log("Error de Conexion", err) : console.log("Conexion con Exitosa con DB");
	});
};

module.exports = { ConnectionDB };

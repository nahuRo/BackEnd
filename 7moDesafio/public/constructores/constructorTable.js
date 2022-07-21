const knex = require("knex");

// traigo las configuraciones
const { config__MariaDB, config__SQLite3 } = require("../db/configDBs");

const createTableProd = async () => {
	try {
		await knex(config__MariaDB).schema.dropTableIfExists("products");

		// creo una tabla
		await knex(config__MariaDB).schema.createTable("products", (productsTable) => {
			// creacion de las columnas , tienen que tener el mismo nombre que los datos que les paso <--
			productsTable.increments("id").primary(); // creo columna id
			productsTable.string("tittle", 20).notNullable();
			productsTable.integer("price", 10).notNullable();
			productsTable.string("thumbnail", 500).notNullable();
			productsTable.string("descripcion", 150).notNullable();
			productsTable.integer("stock", 5).notNullable();
			productsTable.timestamp("fecha").defaultTo(knex(config__MariaDB).fn.now());
			productsTable.integer("codeBar", 20).notNullable();
		});
		console.log("Tabla construida");

		// elimino la tabla, desactivo la conexion
		knex(config__MariaDB).destroy();
	} catch (error) {
		console.log("error en constructor database", error);
	}
};

const createTableSms = async () => {
	try {
		await knex(config__SQLite3).schema.dropTableIfExists("Mensajes");

		// creo una tabla
		await knex(config__SQLite3).schema.createTable("Mensajes", (smsTable) => {
			// productsSms.increments("id").primary(); // creo columna id
			smsTable.string("user", 20).notNullable();
			smsTable.timestamp("fechayhora").defaultTo(knex(config__SQLite3).fn.now());
			smsTable.string("msg", 500).notNullable();
		});
		console.log("Tabla construida");

		// elimino la tabla, desactivo la conexion
		knex(config__SQLite3).destroy();
	} catch (error) {
		console.log("error en constructor database", error);
	}
};

createTableProd();
createTableSms();

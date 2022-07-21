// configuracion para mariaDB
const config__MariaDB = {
	client: "mysql", // mysql para MariaDB
	connection: {
		host: "127.0.0.1", // localhost
		user: "root",
		password: "",
		database: "7modesafio",
	},
	pool: { min: 0, max: 7 },
};

// configuracion para SQLite3
const config__SQLite3 = {
	client: "sqlite3",
	useNullAsDefault: true,
	connection: { filename: "./public/db/mydb.sqlite" },
};

// cambio la configuracion para usar la base de datos mariaDB o mySQlite3
// pero los metodos son los mismo en ambas
// con metodos me refiero a los where, max, etc

// exporto las configuraciones
module.exports = { config__MariaDB, config__SQLite3 };

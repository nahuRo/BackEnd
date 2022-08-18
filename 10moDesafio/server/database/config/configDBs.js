// configuracion para mariaDB
export const config__MariaDB = {
	client: "mysql", // mysql para MariaDB
	connection: {
		host: "127.0.0.1", // localhost
		user: "root",
		password: "",
		database: "10modesafio",
	},
	pool: { min: 0, max: 7 },
};

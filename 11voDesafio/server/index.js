const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

const routes = require("./routes/index");
const { ConnectionDB } = require("./database/config/configMongo");

// metodo para usar variable de entorno
dotenv.config();

// Middleware
app.use(express.json()); //midu usa solo este middleware
app.use(express.urlencoded({ extended: true }));

// conexion a la DB
ConnectionDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`sevidor iniciado en http://localhost:${PORT}/`);
});

app.use(routes);

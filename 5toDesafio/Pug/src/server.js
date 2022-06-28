const express = require("express");
const app = express();
const path = require("path");
const rutas = require("./routes/index");

// conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuracion pug
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

// escuchando puerto
app.listen(8080, (err) => (err ? console.log("hubo un error", err) : console.log("Servidor iniciado en http://localhost:8080/")));

// redireccion a rutas
app.use("/", rutas);

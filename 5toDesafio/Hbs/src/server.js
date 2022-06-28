const express = require("express");
const app = express();
const path = require("path");
const rutas = require("./routes/index");
const { engine } = require("express-handlebars");

// conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config handlebars
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: path.join(__dirname, "./views/layout/main.hbs"),
		layoutsDir: path.join(__dirname, "./views/layout"),
		partialsDir: path.join(__dirname, "./views/partials"),
	})
);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

// escuchando puerto
app.listen(8080, (err) => (err ? console.log("hubo un error", err) : console.log("Servidor iniciado en http://localhost:8080/")));

// redireccion a rutas
app.use("/", rutas);

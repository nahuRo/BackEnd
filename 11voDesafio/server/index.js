const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const { ConnectionDB } = require("./database/config/configMongo");

const passport = require("passport");

const engine = require("ejs-mate");

// metodo para usar variable de entorno
dotenv.config();

// configuraciones ejs
app.set("views", path.join(__dirname, "./views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // el extend es para decirle que voy a recibir imagenes o archivos pesados, ademas de los datos 'simples' del formulario

app.use(cookieParser());

// session
app.use(
	session({
		secret: "coderHouse",
		resave: false,
		rolling: true, // para que se resetee el tiempo de expiracion al hacer una petision
		saveUninitialized: false,
		// con la cookie me da un error el  req.isAuthenticated() , como que me lo reinicia por mas que le aumente el maxAge
		// cookie: {
		// 	maxAge: 3000,
		// },
	})
);

// passport
require("./passport/local-auth");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	app.locals.user = req.user; // app.locals.user , es como crear una variable global para toda la app
	console.log("LOCALS", app.locals.user);
	next();
});

// ----

// conexion a la DB
ConnectionDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`sevidor iniciado en http://localhost:${PORT}/`);
});

// rutas
app.use(require("./routes/prueba"));

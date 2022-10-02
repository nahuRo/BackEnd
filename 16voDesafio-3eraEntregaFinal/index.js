const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const session = require("express-session");
const cookieParser = require("cookie-parser");

const { ConnectionDB } = require("./database/config/configMongo");

const passport = require("passport");

const engine = require("ejs-mate");

const flash = require("connect-flash");

const yargs = require("yargs")(process.argv.slice(2));

const args = yargs
	.alias({
		p: "puerto",
	})
	.default({
		puerto: 8080,
	}).argv;

const log4js = require("log4js");

log4js.configure({
	appenders: {
		miLoggerConsole: { type: "console" },
	},
	categories: {
		default: { appenders: ["miLoggerConsole"], level: "info" },
	},
});

const loggerInfo = log4js.getLogger("default");

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
		secret: process.env.SESSION_SECRET,
		resave: false,
		rolling: true, // para que se resetee el tiempo de expiracion al hacer una petision
		saveUninitialized: false,
		// con la cookie me da un error el  req.isAuthenticated() , como que me lo reinicia por mas que le aumente el maxAge
		// cookie: {
		// 	maxAge: 3000,
		// },
	})
);

// connect-flash
app.use(flash());

// passport
require("./passport/local-auth");
app.use(passport.initialize());
app.use(passport.session());

// mensajes de flash
app.use((req, res, next) => {
	app.locals.registerMsg = req.flash("registerMsg");
	app.locals.loginMsg = req.flash("loginMsg");

	app.locals.user = req.user; // app.locals.user , es como crear una variable global para toda la app
	// console.log("LOCALS", app.locals.user);
	next();
});

// middleware de desafio
app.use((req, res, next) => {
	loggerInfo.info(req.method, req.url);
	next();
});

// ----

// conexion a la DB
ConnectionDB();

app.listen(process.env.PORT || args.puerto, (err) => {
	err ? console.log(err) : console.log(`sevidor iniciado en http://localhost:${process.env.PORT || args.puerto}/`);
});

// rutas
app.use(require("./routes/index"));

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const engine = require("ejs-mate");
const flash = require("connect-flash");
const yargs = require("yargs")(process.argv.slice(2));

const { config } = require("./utils/config");
const { ConnectionDB } = require("./database/config/configMongo");
const { loggerInfo } = require("./utils/logger");

const args = yargs
	.alias({
		p: "puerto",
	})
	.default({
		puerto: 8080,
	}).argv;

// configuraciones ejs
app.set("views", path.join(__dirname, "./views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// session
app.use(
	session({
		secret: config.SESSION_SECRET,
		resave: false,
		rolling: true,
		saveUninitialized: false,
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
	// CON 'req.user' OBTENGO LOS DATOS DEL USUARIO ACTUAL, EL QUE HACE EL LOGIN
	// console.log("LOCALS", app.locals.user);
	next();
});

// middleware para loggers
app.use((req, res, next) => {
	loggerInfo.info(req.method, req.url);
	next();
});

// conexion a la DB
ConnectionDB();

app.listen(process.env.PORT || args.puerto, (err) => {
	err ? console.log(err) : console.log(`sevidor iniciado en http://localhost:${process.env.PORT || args.puerto}/`);
});

// rutas
app.use(require("./routes/index"));

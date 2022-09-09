const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: "../.env" });

const session = require("express-session");
const cookieParser = require("cookie-parser");

const { ConnectionDB } = require("./database/config/configMongo");

const passport = require("passport");

const engine = require("ejs-mate");

const flash = require("connect-flash");

const cluster = require("cluster");
const { cpus } = require("os");

const yargs = require("yargs")(process.argv.slice(2));

const args = yargs
	.alias({
		p: "puerto", // node index.js -p=8081
		m: "modo",
	})
	.default({
		puerto: 8082,
		modo: "fork",
	}).argv;

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

// ----

// conexion a la DB
ConnectionDB();

const numCPUs = cpus().length;

console.log("cluster", cluster.isPrimary);

if (cluster.isPrimary && args.modo === "cluster") {
	console.log(`Primary ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
		console.log("nuevo worker");
	}

	// metodo que se ejecuta cuando un worker se muere o lo mato
	// When any of the workers die the cluster module will emit the 'exit' event.
	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);

		// creo un worker
		cluster.fork();
	});
} else {
	console.log("server 2");

	console.log(`Worker ${process.pid} started`);

	app.listen(3000, (err) => {
		err ? console.log(err) : console.log(`sevidor iniciado en  http://localhost:${args.puerto}/, worked: ${process.pid}`);
	});

	// rutas
	app.use("/api/random", require("./routes/index"));
}

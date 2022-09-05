const { Router } = require("express");
const route = Router();

const passport = require("passport");

const util = require("util");

const { fork } = require("child_process");

let repetidos = {};

const isAuthenticated = (req, res, next) => {
	// req.isAuthenticated() , retorna true/false
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
};

const yargs = require("yargs")(process.argv.slice(2));
const args = yargs
	.alias({
		p: "puerto",
	})
	.default({
		puerto: 8080,
	}).argv;

route
	.post(
		"/register",
		passport.authenticate("register", {
			successRedirect: "/login",
			failureRedirect: "/register",
			passReqToCallback: true, // para pasarle 'req' a la estrategia de passport
		})
		// todo lo que hacia antes por ejeplo --> const { user } = req.body , etc
		// lo manejo en las estrategias
		// 0 - pero todo el recorrido del passport empieza aca
		// 1 - luego va a la estrategias
		// 2 - y sin que yo haga algo , va a serializarse
	)

	.post(
		"/login",
		passport.authenticate("login", {
			successRedirect: "/profile",
			failureRedirect: "/login",
			passReqToCallback: true, // para pasarle 'req' a la estrategia de passport
		})
	)

	.get("/register", (req, res) => {
		res.render("register");
	})

	.get("/login", (req, res) => {
		res.render("login");
	})

	.get("/logout", (req, res) => {
		req.logout((err) => {
			if (err) return next(err);
			res.redirect("/login");
		});
	})

	.get("/", (req, res) => {
		res.render("index");
	})

	.get("/profile", isAuthenticated, (req, res) => {
		res.render("profile");
	})

	.get("/info", isAuthenticated, (req, res) => {
		res.render("info", {
			argumentsEntri: args, // puerto
			systemName: process.platform,
			nodeV: process.version,
			memory: util.inspect(process.memoryUsage()),
			pathEjecusion: process.execPath,
			idPross: process.pid,
			ruta: process.cwd(),
		});
	})

	.get("/api/randoms", isAuthenticated, (req, res) => {
		console.log(repetidos);
		res.render("random", { repetidos });
		repetidos = {}; // para pintar nuevas valores en la tabla y no que se concatenen
	})

	.post("/api/randoms", (req, res) => {
		let { numberR } = req.body;
		numberR = Number(numberR) ? Number(numberR) : 1000; // no le puse 100000000 porque es mucho y son numeros pero igual funciona
		arrayRandoms = []; // para crear nuevos numeros randoms y no que se concatenen

		const forked = fork("./fork/child.js");

		forked.on("message", (msg) => {
			repetidos = { ...msg };
		});

		forked.send(numberR);

		res.redirect("/api/randoms");
	})

	// Atajo URLs no validas
	.use((req, res) => {
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

module.exports = route;

const { Router } = require("express");
const route = Router();
const path = require("path");

const passport = require("passport");

const isAuthenticated = (req, res, next) => {
	// req.isAuthenticated() , retorna true/false
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
};

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

	// Atajo URLs no validas
	.use((req, res) => {
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

module.exports = route;

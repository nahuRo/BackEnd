const passport = require("passport");

const { loggerArchivoE } = require("../utils/logger");

const getRegister = (req, res) => {
	try {
		res.render("register");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

const getLogin = (req, res) => {
	try {
		res.render("login");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

const logout = (req, res) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/login");
	});
};

const resgisterPassport = passport.authenticate("register", {
	successRedirect: "/login",
	failureRedirect: "/register",
	passReqToCallback: true,
});

const loginPassport = passport.authenticate("login", {
	successRedirect: "/profile",
	failureRedirect: "/login",
	passReqToCallback: true,
});

module.exports = { resgisterPassport, getRegister, loginPassport, getLogin, logout };

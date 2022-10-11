const { Router } = require("express");
const route = Router();

const { sessionC, infoC, productsC, viewsC } = require("../controllers/index");
const { loggerArchivoW, loggerInfo } = require("../utils/logger");

const compression = require("compression");

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
};

route
	.post("/register", sessionC.resgisterPassport)

	.post("/login", sessionC.loginPassport)

	.get("/register", sessionC.getRegister)

	.get("/login", sessionC.getLogin)

	.get("/logout", sessionC.logout)

	.get("/", viewsC.getHome)

	// is Authenticated

	.get("/profile", isAuthenticated, infoC.getProfile)

	.get("/products", isAuthenticated, productsC.getAllProducts)

	.post("/products", isAuthenticated, productsC.postProducts)

	.get("/info", isAuthenticated, infoC.getInfo)

	.get("/infoGzip", isAuthenticated, compression(), infoC.getInfoGzip)

	.get("/api/randoms", isAuthenticated, viewsC.getRandoms)

	.post("/api/randoms", isAuthenticated, viewsC.postRandoms)

	// Atajo URLs no validas

	.use((req, res) => {
		loggerInfo.warn("ruta no implementada");
		loggerArchivoW.warn("ruta no implementada");
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

module.exports = route;

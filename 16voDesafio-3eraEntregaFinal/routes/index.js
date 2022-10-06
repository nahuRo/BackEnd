const { Router } = require("express");
const route = Router();

const { config } = require("../utils/config");

const passport = require("passport");

const util = require("util");

const { fork } = require("child_process");

const os = require("os");

const compression = require("compression");
const mensaje = "hola".repeat(1000);

let repetidos = {};
let arrayRandoms = [];

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

const ChildProcess = false;
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

const log4js = require("log4js");

log4js.configure({
	appenders: {
		miLoggerConsole: { type: "console" },
		miLoggerArchivoWarnings: { type: "file", filename: "warn.log" },
		miLoggerArchivoErrores: { type: "file", filename: "error.log" },
	},
	categories: {
		default: { appenders: ["miLoggerConsole"], level: "info" },
		archivoWarn: { appenders: ["miLoggerArchivoWarnings"], level: "warn" },
		archivoError: { appenders: ["miLoggerArchivoErrores"], level: "error" },
	},
});

const loggerInfo = log4js.getLogger("default");
const loggerArchivoW = log4js.getLogger("archivoWarn");
const loggerArchivoE = log4js.getLogger("archivoError");

// const prodModel = require("../database/models/prodModel");
// const { prodClassMongo } = require("../utils/constructorProd");
// const ProdCreate = new prodClassMongo("products", prodModel);

const cartModel = require("../database/models/cartModel");
const { cartGenMon } = require("../utils/constructorCart");
const CartCreate = new cartGenMon("carts", cartModel);

// array de pedido
let ProdArrayCart = [];

// nodemailer
const { transporter } = require("../utils/email");

// sms twilio
const { client } = require("../utils/twilio");

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
		try {
			res.render("register");
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.get("/login", (req, res) => {
		try {
			res.render("login");
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.get("/logout", (req, res) => {
		req.logout((err) => {
			ProdArrayCart = [];
			if (err) return next(err);
			res.redirect("/login");
		});
	})

	.get("/", (req, res) => {
		try {
			res.render("index");
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.get("/profile", isAuthenticated, (req, res) => {
		try {
			res.render("profile");
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.get("/products", isAuthenticated, async (req, res) => {
		try {
			const myCart = await CartCreate.getByNameCart(req.user.email);
			// console.log("carrito", myCart);
			const { products } = myCart[0];
			res.render("products", { products });
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.post("/products", isAuthenticated, async (req, res) => {
		const cartFound = await CartCreate.getByNameCart(req.user.email);
		let objetos = cartFound[0].products;
		objetos.push(req.body);
		await CartCreate.updateCart(req.user.email, objetos);

		res.redirect("/products");
	})

	.get("/orden", isAuthenticated, async (req, res) => {
		try {
			res.render("orden", { ProdArrayCart });
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.post("/cart", isAuthenticated, async (req, res) => {
		const myCart = await CartCreate.getByNameCart(req.user.email);
		const { products } = myCart[0];
		ProdArrayCart = [...products];

		// envio de pedido via mail
		await transporter.sendMail({
			from: "Server Node.js",
			to: config.TO_MAIL, // mail al que le envio el mensaje
			subject: `Nuevo Pedido de: ${req.user.name} con email: ${req.user.email}`,
			html: ProdArrayCart.map((prod) => {
				return `<h1 style="color:blue">Articulo</h1><h3>Nombre: ${prod.tittle}</h3><h3>Precio: ${prod.price}</h3><h3>Descripción: ${prod.description}</h3><h3>codeBar: ${prod.codeBar}</h3><img style="width:300px" src=${prod.thumbnail}/>`;
			}).toString(),
		});

		// envio de sms twilio
		await client.messages.create({
			body: "Su pedido ha sido recibido y se encuentra en proceso",
			messagingServiceSid: "MG7cf0cd35d95730fa35f667086c3652b4",
			to: config.toNumberSms,
		});

		// envio de whatsapp twilio
		await client.messages.create({
			body: `Nuevo Pedido\n\nde: ${req.user.name}\ncon email: ${req.user.email}`,
			from: `whatsapp:${config.wspTwilioNumber}`,
			to: `whatsapp:${config.toNumberSms}`,
		});

		res.redirect("/orden");
	})

	.get("/info", isAuthenticated, compression(), (req, res) => {
		try {
			res.render("info", {
				argumentsEntri: args, // puerto
				systemName: process.platform,
				nodeV: process.version,
				memory: util.inspect(process.memoryUsage()),
				pathEjecusion: process.execPath,
				idPross: process.pid,
				ruta: process.cwd(),
				cpus: os.cpus().length,
				mensaje,
			});
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.get("/api/randoms", isAuthenticated, (req, res) => {
		try {
			res.render("random", { repetidos });
			repetidos = {}; // para pintar nuevas valores en la tabla y no que se concatenen
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

	.post("/api/randoms", (req, res) => {
		try {
			let { numberR } = req.body;
			numberR = Number(numberR) ? Number(numberR) : 1000; // no le puse 100000000 porque es mucho y son numeros pero igual funciona
			arrayRandoms = []; // para crear nuevos numeros randoms y no que se concatenen

			if (ChildProcess) {
				console.log("con child");
				const forked = fork("./fork/child.js");

				forked.on("message", (msg) => {
					repetidos = { ...msg };
				});

				forked.send(numberR);
			} else {
				console.log("sin child");

				for (let i = 0; i < numberR; i++) {
					arrayRandoms.push(getRandomArbitrary(1, 1000).toFixed(0));
				}

				arrayRandoms.forEach((numero) => {
					repetidos[numero] = (repetidos[numero] || 0) + 1;
				});
			}

			res.redirect("/api/randoms");
		} catch (error) {
			loggerArchivoE.error(error);
		}
	})

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

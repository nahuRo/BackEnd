const path = require("path");
const { Router } = require("express");
const route = Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require("../database/models/userModel");
const { userClassMongo } = require("../utils/constructorUser");
const privateKey = "coderHouse";

const { Strategy } = require("passport-local");
const passport = require("passport");

const userDB = new userClassMongo("users", userModel);

function authUser(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.json({ error: true, message: "you don't have permisse" });

	const token = authHeader.split(" ")[1];

	jwt.verify(token, privateKey, (err, decodePayload) => {
		if (err) return res.json({ error: true, message: "you don't have permisse" });

		req.user = decodePayload.data;

		next();
	});
}

function generateToken(user) {
	const payload = { data: { username: user.user, email: user.email } };
	return jwt.sign(payload, privateKey, { expiresIn: "1m" });
}

route
	.get("/register", (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/register.html"));
	})
	.post("/register", passport.authenticate("registerStrategy", { failureRedirect: "/hola" }), async (req, res) => {
		// const { userName, userPass, userEmail } = req.body;

		// // en el constructor de mongo hacer un metodo que me busque un usuario para ver si ya esta registrado
		// const baseUsers = await userDB.getAll();
		// const buscado = baseUsers.find((user) => user.user === userName);

		// // si el user name ya esta registado, con este if no te deja registrarlo
		// if (buscado) return res.json({ error: true, message: "User already exists" });
		// // if (buscado.user === userName || buscado.email === userEmail) return res.json({ error: true, message: "User already exists" });

		// const userToAdd = { user: userName, email: userEmail, password: userPass };
		// await userDB.save(userToAdd);

		// redirigo a la direccion /login, que luego con un get('/login') muestreo lo que quiero
		res.redirect("/login");
	})

	// LogIn
	.get("/login", (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/login.html"));
	})
	.post("/login", passport.authenticate("loginStrategy", { failureRedirect: "/hola" }), async (req, res) => {
		// const { userName, userPass } = req.body;

		// const baseUsers = await userDB.getAll();
		// const buscado = baseUsers.find((user) => user.user === userName);

		// // verifico que los datos al logearse sean correctos con los de la base de datos
		// if (!buscado || buscado.password !== userPass) return res.json({ error: true, message: "Invalid credentials" });

		// const authToken = generateToken(buscado);
		// res.json({ authToken });
		res.send("se pudooo");
		// res.redirect("/home");
	})

	// Home
	.get("/", authUser, (req, res) => {
		req.json(req.user);
	})

	// Home
	.get("/home", (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/home.html"));
	})

	// script, cuando quiera asociar un css,js o lo que sea a un html, me da un error de quie no encuentra el archivo
	// es porque le tengo que hacer una ruta a ese archivo, o sea un get
	.get("/index.js", (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/index.js"));
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

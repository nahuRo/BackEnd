const path = require("path");
const { Router } = require("express");
const route = Router();

const userModel = require("../database/models/userModel");
const { userClassMongo } = require("../utils/constructorUser");

const userDB = new userClassMongo("users", userModel);

route
	.get("/register", (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/register.html"));
	})
	.post("/register", async (req, res) => {
		const { userName, userPass, userEmail } = req.body;

		// en el constructor de mongo hacer un metodo que me busque un usuario para ver si ya esta registrado
		const baseUsers = await userDB.getAll();
		const buscado = baseUsers.find((user) => user.user === userName);

		// si el user name ya esta registado, con este if no te deja registrarlo
		if (buscado) return res.json({ error: true, message: "User already exists" });
		// if (buscado.user === userName || buscado.email === userEmail) return res.json({ error: true, message: "User already exists" });

		const userToAdd = { user: userName, email: userEmail, password: userPass };
		await userDB.save(userToAdd);

		// redirigo a la direccion /login, que luego con un get('/login') muestreo lo que quiero
		res.redirect("/login");
	})

	// LogIn
	.get("/login", (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/login.html"));
	})
	.post("/login", async (req, res) => {
		const { userName, userPass } = req.body;

		const baseUsers = await userDB.getAll();
		const buscado = baseUsers.find((user) => user.user === userName);

		// verifico que los datos al logearse sean correctos con los de la base de datos
		if (!buscado || buscado.password !== userPass) return res.json({ error: true, message: "Invalid credentials" });

		res.redirect("/home");
	})

	// Home
	.get("/home", (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/home.html"));
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

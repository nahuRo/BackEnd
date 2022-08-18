// para rutas
import { Router } from "express";
const route = Router();

import { getProdTest } from "../controllers/controller.js";

route
	//login
	.post("/login", (req, res) => {
		const { userName } = req.body;
		req.session.user = userName;
		req.session.admin = true;
		console.log(req.session);
		res.send(`usuario ${req.session.user} logeado`);
	})

	//logOut
	.get("/logout", (req, res) => {
		req.session.destroy();
	})

	// ruta para traer los productos generador con faker.js
	.get("/productos-test", getProdTest)

	// Atajo URLs no validas
	.use((req, res) => {
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

export default route;

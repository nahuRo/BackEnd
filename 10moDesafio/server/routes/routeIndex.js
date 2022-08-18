// para rutas
import { Router } from "express";
const route = Router();

import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import { getProdTest } from "../controllers/controller.js";

route
	//login
	.use("/", (req, res) => {
		const { user } = req.body;
		req.session.user = user;
		res.send(user);
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

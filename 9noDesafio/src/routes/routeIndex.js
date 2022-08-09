// para rutas
import { Router } from "express";
const route = Router();

import { getProdTest } from "../controllers/controller.js";

// funcionan todos los metodos , la unica condicion es que halla un txt creado para que empiece ejecutar todo joia
route
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

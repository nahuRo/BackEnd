// para rutas
import { Router } from "express";
const route = Router();
import { getProdTest } from "../controllers/controller.js";

import { sessClassMongo } from "../utils/constructores.js";
import { sessionSchema } from "../database/models/sessionModel.js";

const ObjSess = new sessClassMongo("sessions", sessionSchema);

route
	//login

	.post("/login", (req, res) => {
		const { userName } = req.body;
		req.session.user = userName;
		res.send(req.session);
	})

	//logOut
	.get("/logout", async (req, res) => {
		let listSess = await ObjSess.getAll();
		if (listSess.length === 0) {
			return res.send("no hay usuarios logeados");
		} else {
			let deleted = await ObjSess.deleteSession(listSess[0]._id);
			return res.send(deleted);
		}
	})
	// sesiones
	.get("/sessions", async (req, res) => {
		let listSess = await ObjSess.getAll();
		res.send(listSess);
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

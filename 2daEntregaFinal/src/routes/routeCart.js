// para rutas
import { Router } from "express";
const route = Router();

// administracion
import { isAdmin, permiso } from "../utils/Admin&URL.js";

// controllers
import {
	createOneCart,
	deleteOneCart,
	getAllProdFromOneCart,
	createProdForOneCart,
	deleteOneProdFromOneCart,
} from "../controllers/cartsControllers.js";

// ---- Rutas para cart ----

route
	// POST: '/' - Crea un carrito y devuelve su id.
	.post("/:name", isAdmin(permiso), createOneCart)

	// DELETE: '/:id' - Vacía un carrito y lo elimina.
	.delete("/:name", isAdmin(permiso), deleteOneCart)

	// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
	.get("/:name/productos", isAdmin(permiso), getAllProdFromOneCart)

	// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
	.post("/:name/productos", isAdmin(permiso), createProdForOneCart)

	// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
	.delete("/:name/productos/:name_prod", isAdmin(permiso), deleteOneProdFromOneCart)

	// Atajo URLs no validas
	.use((req, res) => {
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

export default route;

// para rutas
import { Router } from "express";
const route = Router();

// traigo las rutas a donde quiero ir
import routeProd from "./routeProd.js";
import routeCart from "./routeCart.js";

// funcionan todos los metodos , la unica condicion es que halla un txt creado para que empiece ejecutar todo joia
route.use("/productos", routeProd);
route.use("/carrito", routeCart);

// Atajo URLs no validas
route.use((req, res) => {
	res.status(404).json({
		error: -1,
		descripcion: req.path,
		método: "no autorizada",
	});
});

export default route;

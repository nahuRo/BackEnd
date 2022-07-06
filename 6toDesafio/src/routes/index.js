const { Router } = require("express");
const route = Router();

// manejo del los datos del form
route.post("/productos", (req, res) => {
	try {
		const { tittle, price, thumbnail } = req.body;
		let id = productos.length + 1 || 0;
		productos.push({ tittle, price, thumbnail, id });
		res.redirect("/"); // redirijo luevo de enviar el formulario a la ruta "/"
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
});

// aqui tengo que poner las direcciones a las plantillas para este get
route.get("/productos", (req, res) => {
	try {
		res.render("products.ejs", { productos });
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
});

//manejar con Postman
route.get("/productos/:id", (req, res) => {
	try {
		const { id } = req.params;
		const buscado = productos.filter((item) => item.id === Number(id));
		res.json(buscado.length === 0 ? { error: "producto no encontrado" } : buscado);
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
});

//manejar con Postman
route.put("/productos/:id", (req, res) => {
	try {
		const id = Number(req.params.id);
		const { tittle, price, thumbnail } = req.body;
		const indice = productos.findIndex((item) => item.id === id);
		productos.splice(indice, 1, { tittle, price, thumbnail, id });
		res.json({ tittle, price, thumbnail, id });
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
});

//manejar con Postman
route.delete("/productos/:id", (req, res) => {
	try {
		const id = Number(req.params.id);
		productos = productos.flatMap((item) => (item.id === id ? [] : item));
		res.json(productos.length === 0 ? { error: "producto no encontrado" } : productos);
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
});

// module.exports = route;

const { Router } = require("express");
const route = Router();
let productos = [
	{
		tittle: "nombre1",
		price: 1000,
		thumbnail:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		id: 1,
	},
	{
		tittle: "nombre2",
		price: 2000,
		thumbnail:
			"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=698&q=80",
		id: 2,
	},
	{
		tittle: "nombre3",
		price: 3000,
		thumbnail:
			"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
		id: 3,
	},
];

// render main.pug
route.get("/", (req, res) => {
	try {
		res.render("main.pug", {}); //form
	} catch (error) {
		console.log("error: ", error);
		res.sendStatus(500);
	}
});

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
		res.render("products.pug", { productos });
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

module.exports = route;

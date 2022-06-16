const { Router } = require("express");
const router = Router();
let productos = [];

router.get("/productos/form", (req, res) => {
	res.sendFile(__dirname + "/Index.html");
});

router.get("/productos", (req, res) => {
	res.json(productos);
});

router.get("/productos/:id", (req, res) => {
	const { id } = req.params;
	const buscado = productos.filter((item) => item.id === Number(id));
	res.json(buscado.length === 0 ? { error: "producto no encontrado" } : buscado);
});

router.post("/productos", (req, res) => {
	const { tittle, price, thumbnail } = req.body;
	let id = productos.length + 1 || 0;
	productos.push({ tittle, price, thumbnail, id });
	res.sendStatus(201).json({ tittle, price, thumbnail, id });
});

router.put("/productos/:id", (req, res) => {
	const id = Number(req.params.id);
	const { tittle, price, thumbnail } = req.body;
	const indice = productos.findIndex((item) => item.id === id);
	productos.splice(indice, 1, { tittle, price, thumbnail, id });
	res.json({ tittle, price, thumbnail, id });
});

router.delete("/productos/:id", (req, res) => {
	const id = Number(req.params.id);
	productos = productos.flatMap((item) => (item.id === id ? [] : item));
	res.json(productos.length === 0 ? { error: "producto no encontrado" } : productos);
});

module.exports = router;

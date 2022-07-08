const { Router } = require("express");
const route = Router();

// const routeProd = require("./routeProd");
// const routeCard = require("./routeCart");

// route.use("/productos", routeProd);
// route.use("/carrito", routeCard);

const {GeneratorProd} = require('../../public/constructores')

const Nuevo = new GeneratorProd(objeto)

const objeto = {
    timestamp : new Date(Date.now()),
	tittle : 'pantalon',
	description : 'una descripcion',
	code : 11212,
	price : 1212,
	thumbnail : 'thumbnail',
	stock : 10,
}

route.get("/productos/", (req, res) => {
	try {
        res.json(productos);
        res.json(await productos.getAll());
    } catch (err) { 
        res.status(500)
        console.log(err)
    }
});

route.get("/productos/:id", (req, res) => {
    try {
        const { id } = req.params;
        const buscado = productos.filter((item) => item.id === Number(id));
        res.json(buscado.length === 0 ? { error: "producto no encontrado" } : buscado);
    } catch (err) {
        res.status(500)
        console.log(err)
    }
        
});

route.post("/productos", (req, res) => {
	const { tittle, price, thumbnail } = req.body;
	let id = productos.length + 1 || 0;
	productos.push({ tittle, price, thumbnail, id });
	res.sendStatus(201).json({ tittle, price, thumbnail, id });
});

route.put("/productos/:id", (req, res) => {
	const id = Number(req.params.id);
	const { tittle, price, thumbnail } = req.body;
	const indice = productos.findIndex((item) => item.id === id);
	productos.splice(indice, 1, { tittle, price, thumbnail, id });
	res.json({ tittle, price, thumbnail, id });
});

route.delete("/productos/:id", (req, res) => {
	const id = Number(req.params.id);
	productos = productos.flatMap((item) => (item.id === id ? [] : item));
	res.json(productos.length === 0 ? { error: "producto no encontrado" } : productos);
});

module.exports = route;

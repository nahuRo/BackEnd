// constructores
import { GeneratorProd } from "../utils/ConstructorProd.js";

// Objeto
const Producto = new GeneratorProd("ProductosFinal.txt");

export const getAllProducts = async (req, res) => {
	const id = Number(req.params.id);
	const long = await Producto.getAll(); // "entre"  por el return
	long.length >= id ? res.json(await Producto.getById(id)) : res.json(await Producto.getAll()); // los 2 devuelven objetos
};

export const createProduct = async (req, res) => {
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	let id = (await Producto.getAll()).length + 1 || 0;
	await Producto.save({ tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date(), id });
	res.redirect("/");
};

export const updateOneProduct = async (req, res) => {
	const id = Number(req.params.id);
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	res.json(Producto.update(id, { tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date() })); // nuevo metodo
};

export const deleteOneProduct = async (req, res) => {
	const id = Number(req.params.id);
	res.json(await Producto.deleteById(id));
};

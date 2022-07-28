// constructores
import { GeneratorCart, GeneratorProd } from "../utils/ConstructorProd.js";

// Instancias
const Cart = new GeneratorCart("CartFinal.txt");
const Producto = new GeneratorProd("ProductosFinal.txt");

export const createOneCart = async (req, res) => {
	const productos = await Producto.getAll();
	const obj = { timestamp: new Date(), productos };
	res.json(await Cart.save(obj));
};

export const deleteOneCart = async (req, res) => {
	const id = Number(req.params.id);
	res.json(await Cart.deleteById(id));
};
export const getAllProdFromOneCart = async (req, res) => {
	const id = Number(req.params.id);
	res.json(await Cart.getById(id));
};
export const createProdForOneCart = async (req, res) => {
	const id = Number(req.params.id);
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	res.json(await Cart.updateCart(id, { tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date() }));
};

export const deleteOneProdFromOneCart = async (req, res) => {
	const id = Number(req.params.id);
	const id_prod = Number(req.params.id_prod);
	res.json(await Cart.deleteProdfromCart(id, id_prod));
};

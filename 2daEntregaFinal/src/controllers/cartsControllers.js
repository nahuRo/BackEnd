// para constructores
import { cartGenFire } from "../utils/constructorFirebase.js";
import { cartGenMon } from "../utils/constructorMongo.js";
import { cartSchema } from "../database/models/cartModel.js";

import { whichDB } from "../utils/Admin&URL.js";
import { generatorCode } from "../utils/codeGenerator.js";

// intancias
// para usar una u otra DB tenes que comentar un constructor de la que no vas a usar
// ya que tienen el mismo nombre las instacias creadas

const Cart = new cartGenMon("Cart", cartSchema);
// const Cart = new cartGenFire("cart");

export const createOneCart = async (req, res) => {
	const { name } = req.params;
	await Cart.create(name);
	res.json({ message: "successfully created", status: 200 });
};

export const deleteOneCart = async (req, res) => {
	const { name } = req.params;
	!(await Cart.deleteByNameCart(name))
		? res.json({ message: "not found", status: 400 })
		: res.json({ message: "resource deleted successfully", status: 201 });
};

export const getAllProdFromOneCart = async (req, res) => {
	const { name } = req.params;
	if (whichDB === "F") {
		const { products } = await Cart.getByNameCart(name);
		res.json(products);
	} else {
		const carrito = await Cart.getByNameCart(name);
		carrito.length === 0 ? res.json({ message: "not found", status: 400 }) : res.json(carrito[0].products);
	}
};

export const createProdForOneCart = async (req, res) => {
	const { name } = req.params;
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = generatorCode();

	if (whichDB === "F") {
		if (!(await Cart.getByNameCart(name))) return res.json({ message: "not found", status: 400 });
		const { products } = await Cart.getByNameCart(name);
		const objetos = [...products, { tittle, price, thumbnail, descripcion, stock, codeBar }];
		await Cart.updateCart(name, objetos);
	} else {
		const cartFound = await Cart.getByNameCart(name);
		let objetos = cartFound[0].products;
		objetos.push({ tittle, price, thumbnail, descripcion, stock, codeBar });
		res.json(await Cart.updateCart(name, objetos));
	}
};

export const deleteOneProdFromOneCart = async (req, res) => {
	const { name, name_prod } = req.params;

	if (whichDB === "F") {
		if (!(await Cart.getByNameCart(name))) return res.json({ message: "not found", status: 400 });
		const { products } = await Cart.getByNameCart(name);
		const sinBorrado = products.filter((item) => item.tittle !== name_prod);
		await Cart.updateCart(name, sinBorrado);
	} else {
		const cartFound = await Cart.getByNameCart(name);
		if (cartFound.length === 0) return res.json({ message: "not found", status: 400 });
		let objetos = cartFound[0].products;
		const sinBorrado = objetos.filter((item) => item.tittle !== name_prod);
		res.json(await Cart.updateCart(name, sinBorrado));
	}
};

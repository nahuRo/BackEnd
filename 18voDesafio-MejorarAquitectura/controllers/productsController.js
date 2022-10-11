const { cartDao } = require("../database/daos/cart.dao");
const cartModel = require("../database/models/cartModel");
const CartCreate = new cartDao("carts", cartModel);

const { loggerArchivoE } = require("../utils/logger");

const getAllProducts = async (req, res) => {
	try {
		const myCart = await CartCreate.getByNameCart(req.user.email);
		const { products } = myCart[0];
		res.render("products", { products });
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

const postProducts = async (req, res) => {
	const cartFound = await CartCreate.getByNameCart(req.user.email);
	let objetos = cartFound[0].products;
	objetos.push(req.body);
	await CartCreate.updateCart(req.user.email, objetos);

	res.redirect("/products");
};

module.exports = { getAllProducts, postProducts };

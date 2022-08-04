// para constructores
import { prodGenFire } from "../utils/constructorFirebase.js";
import { prodGenMon } from "../utils/constructorMongo.js";
import { prodSchema } from "../database/models/prodModel.js";

// intancias
// para usar una u otra DB tenes que comentar un constructor de la que no vas a usar
// ya que tienen el mismo nombre las instacias creadas

const Producto = new prodGenMon("products", prodSchema);
// const Producto = new prodGenFire("products");

export const getAllProducts = async (req, res) => {
	const { id } = req.params;
	const listProd = await Producto.getAll();
	const buscado = listProd.find((item) => item.id === id);
	res.json(buscado || listProd);
};

export const createProduct = async (req, res) => {
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	await Producto.save({ tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date() });
	res.redirect("/");
};

export const updateOneProduct = async (req, res) => {
	const { id } = req.params;
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	(await Producto.update(id, { tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date() }))
		? res.json({ message: "successfully updated", status: 201 })
		: res.json({ message: "not found", status: 400 });
};

export const deleteOneProduct = async (req, res) => {
	const { id } = req.params;
	!(await Producto.deleteById(id))
		? res.json({ message: "not found", status: 400 })
		: res.json({ message: "resource deleted successfully", status: 201 });
};

const mongoose = require("mongoose");

class cartDao {
	constructor(nameCollection, schema) {
		this.collection = mongoose.model(nameCollection, schema);
	}
	// creo un nuevo carrito
	async create(nameCart) {
		try {
			const item = new this.collection({ tittle: nameCart, products: [] });
			await item.save();
			return console.log("cart created --> ", nameCart);
		} catch (error) {
			console.log(`Hubo un error en - save PRODUCT Cart: ${error}`);
		}
	}
	// elimino un carrito
	async deleteByNameCart(nameCart) {
		try {
			let borrado = await this.collection.deleteOne({ tittle: nameCart });
			if (borrado.deletedCount === 0) return false;
			return borrado;
		} catch (error) {
			console.log(`Hubo un error en - deleteById: ${error}`);
		}
	}
	async getByNameCart(nameCart) {
		try {
			// console.log("soy el nombre", nameCart);
			const productos = await this.collection.find({ tittle: nameCart });
			// console.log(productos);
			return productos;
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async updateCart(nameCart, obj) {
		try {
			const upgraded = await this.collection.findOneAndUpdate({ tittle: nameCart }, { tittle: nameCart, products: obj });
			return upgraded;
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
}

module.exports = { cartDao };

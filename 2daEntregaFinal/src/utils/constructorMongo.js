import mongoose from "mongoose";

export class prodGenMon {
	constructor(nameCollection, schema) {
		this.collection = mongoose.model(nameCollection, schema);
	}
	async save(object) {
		try {
			const item = await new this.collection(object);
			return console.log(await item.save());
		} catch (error) {
			console.log(`Hubo un error en - save PRODUCT Cart: ${error}`);
		}
	}
	async getAll() {
		try {
			return await this.collection.find();
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async update(idProd, obj) {
		try {
			if (idProd.length === 12 || idProd.length === 24) {
				const upgraded = await this.collection.findOneAndUpdate({ _id: mongoose.Types.ObjectId(idProd) }, obj);
				return upgraded;
			} else {
				return 0;
			}
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async deleteById(idProd) {
		try {
			if (idProd.length === 12 || idProd.length === 24) {
				const borrado = await this.collection.deleteOne({ _id: mongoose.Types.ObjectId(idProd) });
				console.log(borrado);
				return borrado.deletedCount;
			} else {
				return 0;
			}
		} catch (error) {
			console.log(`Hubo un error en - deleteById: ${error}`);
		}
	}
}

export class cartGenMon {
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
			const productos = await this.collection.find({ tittle: nameCart });
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

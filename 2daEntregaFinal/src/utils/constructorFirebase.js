import { db } from "../database/config/configFirebase.js";

export class prodGenFire {
	constructor(nameCollection) {
		this.collection = db.collection(nameCollection);
	}
	async save(object) {
		try {
			const newProd = this.collection.doc(); // genero un id
			await newProd.create(object);
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			const { docs } = await this.collection.get();
			const response = docs.map((prod) => ({
				id: prod.id,
				tittle: prod.data().tittle,
				price: prod.data().price,
				thumbnail: prod.data().thumbnail,
				descripcion: prod.data().descripcion,
				stock: prod.data().stock,
				timestamp: prod.data().timestamp,
				codeBar: prod.data().codeBar,
			}));
			return response;
		} catch (err) {
			console.log(err);
		}
	}
	async update(idProd, newData) {
		try {
			const prods = await this.getAll();
			const ids = prods.map((prod) => prod.id);
			const buscado = ids.some((id) => id === idProd);

			buscado && (await this.collection.doc(idProd).update(newData));
			return buscado;
		} catch (err) {
			console.log(err);
		}
	}
	async deleteById(idProd) {
		try {
			const prods = await this.getAll();
			const ids = prods.map((prod) => prod.id);
			const buscado = ids.some((id) => id === idProd);

			buscado && (await this.collection.doc(idProd).delete());
			return buscado;
		} catch (err) {
			console.log(err);
		}
	}
}
export class cartGenFire {
	constructor(nameCollection) {
		this.collection = db.collection(nameCollection);
	}
	async getAll() {
		try {
			const { docs } = await this.collection.get();
			const response = docs.map((cart) => ({
				id: cart.id,
				tittle: cart.data().tittle,
				products: cart.data().products,
				timestamp: cart.data().timestamp,
			}));
			return response;
		} catch (err) {
			console.log(err);
		}
	}
	// creo un nuevo carrito
	async create(nameCart) {
		try {
			const newProd = this.collection.doc(); // genero un id
			await newProd.create({ tittle: nameCart, timestamp: new Date(), products: [] });
			return console.log("cart created --> ", nameCart);
		} catch (error) {
			console.log(error);
		}
	}
	// elimino un carrito
	async deleteByNameCart(idCart) {
		try {
			const prods = await this.getAll();
			const idsCarts = prods.map((prod) => prod.id);
			const buscado = idsCarts.some((id) => id === idCart);

			buscado && (await this.collection.doc(idCart).delete());
			return buscado;
		} catch (err) {
			console.log(err);
		}
	}

	async getByNameCart(idCart) {
		try {
			const response = await this.collection.doc(idCart).get();
			return response.data();
		} catch (error) {
			console.log(`Hubo un error en - getByNameCart: ${error}`);
		}
	}
	async updateCart(idCart, obj) {
		try {
			const upgraded = await this.collection.doc(idCart).update({ products: obj });
			return upgraded;
		} catch (error) {
			console.log(`Hubo un error en - updateCart: ${error}`);
		}
	}
}

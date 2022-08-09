import mongoose from "mongoose";
import knex from "knex";

export class ProdClass {
	constructor(tabla, config) {
		this.tabla = tabla;
		this.knex = knex(config);
	}
	async save(object) {
		try {
			await this.knex(this.tabla).insert(object);
			const id = await this.knex(this.tabla).max("id");
			console.log("producto agregado id --> ", id);
		} catch (error) {
			console.log(`Hubo un error en - save ProdClass: ${error}`);
		}
	}
	async getAll() {
		try {
			const productos = await this.knex(this.tabla).select("*");
			return productos; // retorno un array de objetos
		} catch (error) {
			console.log(`error en - getAll ProdClass : ${error}`);
		}
	}
}

export class smsClassMongo {
	constructor(nameCollection, schema) {
		this.collection = mongoose.model(nameCollection, schema);
	}
	async save(object) {
		try {
			const item = new this.collection(object);
			await item.save();
			return console.log("mensaje guardado");
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
}

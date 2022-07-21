const knex = require("knex");

class ProdClass {
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

class SmsClass {
	constructor(tabla, config) {
		this.tabla = tabla;
		this.knex = knex(config);
	}
	async save(mensaje) {
		try {
			await this.knex(this.tabla).insert(mensaje);
			console.log("mensaje guardado");
		} catch (error) {
			console.log(`Hubo un error en - save SmsClass: ${error}`);
		}
	}
	async getAll() {
		try {
			const mensajes = await this.knex(this.tabla).select("*");
			return mensajes; // retorno un array de objetos
		} catch (error) {
			console.log(`Hubo un error en - getAll SmsClass: ${error}`);
		}
	}
}

module.exports = {
	ProdClass,
	SmsClass,
};

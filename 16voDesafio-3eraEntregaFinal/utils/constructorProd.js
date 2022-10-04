const mongoose = require("mongoose");

class prodClassMongo {
	constructor(nameCollection, schema) {
		this.collection = mongoose.model(nameCollection, schema);
	}
	async save(object) {
		try {
			const item = new this.collection(object);
			return await item.save();
		} catch (error) {
			console.log(`Hubo un error en - save User: ${error}`);
		}
	}
	async getAll() {
		try {
			return await this.collection.find();
		} catch (error) {
			console.log(`Hubo un error en - getAll User: ${error}`);
		}
	}
}

module.exports = { prodClassMongo };

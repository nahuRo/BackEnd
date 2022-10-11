const mongoose = require("mongoose");

class userDao {
	constructor(nameCollection, schema) {
		this.collection = mongoose.model(nameCollection, schema);
	}
	async save(object) {
		try {
			const item = new this.collection(object);
			return await item.save();
			// return console.log("---- USER REGISTERED ----");
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
	async UserById(id) {
		try {
			return await this.collection.findById(id);
		} catch (error) {
			console.log(`Hubo un error en - UserById User: ${error}`);
		}
	}
}

module.exports = { userDao };

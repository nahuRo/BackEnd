// Importar módulo fs
const fs = require("fs");

class Text {
	constructor(name, mensajes) {
		this.name = name;
		this.mensajes = mensajes;
	}
	async save(newMsg) {
		try {
			this.mensajes.push(newMsg);
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(this.mensajes, null, "\t"));
			return console.log("mensaje guardado");
		} catch (error) {
			console.log(`Hubo un error en - save TEXT: ${error}`);
		}
	}
	async getAll() {
		try {
			const fromTxt = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			console.log(`Encontre un txt de Mensajes, ahora te lo imprimo pa :D`);
			return fromTxt; // retorno un array de objetos
		} catch (error) {
			console.log(`Aun no generas el txt de Mensajes :( !!`);
		}
	}
}

class Contenedor {
	constructor(name, products) {
		this.name = name;
		this.products = products;
	}
	async save(object) {
		try {
			let cont = 0;
			this.products.push(object);
			this.products.forEach((item) => (item.id = cont++)); // le agrego un id a cada producto
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(this.products, null, "\t")); // escribo en el txt los productos

			// retorno el id del ultimo producto agregado
			let ultimo = this.products.find((item) => object.id === item.id);
			return `producto agregado correctamente con un id --> ${ultimo.id}`;
		} catch (error) {
			console.log(`Hubo un error en - save PRODUCT: ${error}`);
		}
	}
	async getAll() {
		try {
			const fromTxt = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			console.log(`Encontre un txt de Productos, ahora te lo imprimo pa :D`);
			return fromTxt; // retorno un array de objetos
		} catch (error) {
			console.log(`Aun no generas el txt de Productos :( !!`);
		}
	}
}

module.exports = {
	GeneratorText: Text,
	GeneratorProd: Contenedor,
};

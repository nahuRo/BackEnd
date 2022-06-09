const fs = require("fs");

const express = require("express");
const App = express();
const puerto = 8080;

App.listen(puerto, (err) => {
	if (err) {
		console.log("Hubo un error al iniciar el servidor");
	} else {
		console.log("Servidor escuchando el puerto", puerto);
	}
});

class Contenedor {
	constructor(name, products) {
		this.name = name;
		this.products = products;
	}
	async save(object) {
		try {
			let cont = 0;
			this.products.push(object);
			this.products.forEach((item) => {
				return (item.id = cont++);
			});
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(this.products));
			let ultimo = this.products.find((item) => object.id === item.id);
			return `producto agregado correctamente con un id --> ${ultimo.id}`;
		} catch (error) {
			console.log(`Hubo un error en - save: ${error}`);
		}
	}
	async getById(id) {
		try {
			const objetos = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			const buscado = objetos.find((obj) => obj.id === id);
			return buscado || null;
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async getAll() {
		try {
			return JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
		} catch (error) {
			console.log(`Hubo un error en - getAll: ${error}`);
		}
	}
	async deleteById(id) {
		try {
			const objetos = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			const newArray = objetos.filter((item) => item.id !== id);
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(newArray));
			return `Objeto con el id --> ${id} (eliminado)`;
		} catch (error) {
			console.log(`Hubo un error en - deleteById: ${error}`);
		}
	}
	async deleteAll() {
		try {
			this.products = [];
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(this.products));
			return `Array borrado --> ${this.products.length}`;
		} catch (error) {
			console.log(`Hubo un error en - deleteAll: ${error}`);
		}
	}
}

const productos = [
	{
		tittle: "nombre1",
		price: 1000,
		thumbnail: "imagen1",
	},
	{
		tittle: "nombre2",
		price: 2000,
		thumbnail: "imagen2",
	},
	{
		tittle: "nombre3",
		price: 3000,
		thumbnail: "imagen3",
	},
];

const Test = new Contenedor("Productos.txt", productos);

const objeto = {
	tittle: "nombre4",
	price: 4000,
	thumbnail: "imagen4",
};

// cargo el nuevo producto y genero el txt
(async () => {
	await Test.save(objeto);
})();

App.get("/productos", async (req, res) => {
	const data = await Test.getAll();
	res.send(data);
});

const random = Math.floor(Math.random() * (4 - 0) + 0);
App.get("/productosRandom", async (req, res) => {
	const data = await Test.getById(random);
	res.send(data);
});

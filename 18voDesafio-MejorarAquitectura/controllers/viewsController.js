const { fork } = require("child_process");

const { loggerArchivoE } = require("../utils/logger");

let repetidos = {};
let arrayRandoms = [];

const ChildProcess = false;

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

const getHome = (req, res) => {
	try {
		res.render("index");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

const getRandoms = (req, res) => {
	try {
		res.render("random", { repetidos });
		repetidos = {}; // para pintar nuevas valores en la tabla y no que se concatenen
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

const postRandoms = (req, res) => {
	try {
		let { numberR } = req.body;
		numberR = Number(numberR) ? Number(numberR) : 1000; // no le puse 100000000 porque es mucho y son numeros pero igual funciona
		arrayRandoms = []; // para crear nuevos numeros randoms y no que se concatenen

		if (ChildProcess) {
			console.log("con child");
			const forked = fork("./fork/child.js");

			forked.on("message", (msg) => {
				repetidos = { ...msg };
			});

			forked.send(numberR);
		} else {
			console.log("sin child");

			for (let i = 0; i < numberR; i++) {
				arrayRandoms.push(getRandomArbitrary(1, 1000).toFixed(0));
			}

			arrayRandoms.forEach((numero) => {
				repetidos[numero] = (repetidos[numero] || 0) + 1;
			});
		}

		res.redirect("/api/randoms");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

module.exports = { getHome, getRandoms, postRandoms };

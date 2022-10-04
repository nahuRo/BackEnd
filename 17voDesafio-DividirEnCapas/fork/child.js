let arrayRandoms = [];
let repetidos = {};

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

process.on("message", (cantRandoms) => {
	console.log("mensaje del padre", cantRandoms);

	for (let i = 0; i < cantRandoms; i++) {
		arrayRandoms.push(getRandomArbitrary(1, 1000).toFixed(0));
	}

	arrayRandoms.forEach((numero) => {
		repetidos[numero] = (repetidos[numero] || 0) + 1;
	});

	process.send(repetidos);
});

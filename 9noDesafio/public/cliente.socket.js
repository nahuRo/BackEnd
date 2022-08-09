// ejecuto socket en el cliente
const socket = io();

// DOM
const formText = document.getElementById("formText");
const userInput = document.getElementById("userInput");
const textInput = document.getElementById("textInput");
const textPool = document.getElementById("textPool");

const formProd = document.getElementById("formProd");
const ProdNameInput = document.getElementById("ProdNameInput");
const ProdPriceInput = document.getElementById("ProdPriceInput");
const ProdThumbnailInput = document.getElementById("ProdThumbnailInput");
const ProdDescripcionInput = document.getElementById("ProdDescripcionInput");
const ProdStockInput = document.getElementById("ProdStockInput");
const ProdTable = document.getElementById("ProdTable");

const normInfo = document.getElementById("normInfo");

// MENSAJES
formText.addEventListener("submit", (e) => {
	e.preventDefault();

	const msg = textInput.value;
	const user = userInput.value;

	const userName = userNameInput.value;
	const userLast = userLastInput.value;
	const userAge = userAgeInput.value;
	const userAlias = userAliasInput.value;
	const userAvatar = userAvatarInput.value;

	const data = {
		author: {
			id: user,
			nombre: userName,
			apellido: userLast,
			edad: userAge,
			alias: userAlias,
			avatar: userAvatar,
		},
		text: msg,
	};
	// PRIMERA CONEXION	CHAT
	socket.emit("cliente:mensaje", data);
});

// atajo el mensaje del servidor
socket.on("server:mensaje", (messageArray) => {
	textPool.innerHTML = "";

	messageArray.map(({ author, createdAt, text }) => {
		// desestructuro
		textPool.innerHTML += `<li><strong class="userText">${author.id}</strong> <span class="dateText">[${createdAt}]</span> : <span class="msgText">${text}</span></li>`;
	});
});

// PRODUCTOS
formProd.addEventListener("submit", (e) => {
	e.preventDefault();

	const tittle = ProdNameInput.value;
	const price = ProdPriceInput.value;
	const thumbnail = ProdThumbnailInput.value;
	const descripcion = ProdDescripcionInput.value;
	const stock = ProdStockInput.value;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	// PRIMERA CONEXION PROD
	socket.emit("client:productos", { tittle, price, thumbnail, descripcion, stock, codeBar });
});

// atajo los productos del servidor
socket.on("server:productos", (produstosArray) => {
	pintarProd(produstosArray);
});

// tabla de productos
const pintarProd = async (prod) => {
	const responseHbs = await fetch("./productosView.ejs");
	const datoHbs = await responseHbs.text();

	ProdTable.innerHTML = "";

	await prod.forEach((product) => {
		const html = ejs.render(datoHbs, product);
		ProdTable.innerHTML += html;
	});
};

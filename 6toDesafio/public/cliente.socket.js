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
const ProdTable = document.getElementById("ProdTable");

// MENSAJES
formText.addEventListener("submit", (e) => {
	e.preventDefault();

	const timeStamp = new Date();
	const fechayhora = timeStamp.toLocaleString("es-ES");

	const msg = textInput.value;
	const user = userInput.value;
	// PRIMERA CONEXION	CHAT
	socket.emit("cliente:mensaje", { user, fechayhora, msg });
});

// atajo el mensaje del servidor
socket.on("server:mensaje", (messageArray) => {
	textPool.innerHTML = "";

	messageArray.map(({ user, fechayhora, msg }) => {
		textPool.innerHTML += `<li><strong class="userText">${user}</strong> <span class="dateText">[${fechayhora}]</span> : <span class="msgText">${msg}</span></li>`;
	});
});

// PRODUCTOS
formProd.addEventListener("submit", (e) => {
	e.preventDefault();

	const tittle = ProdNameInput.value;
	const price = ProdPriceInput.value;
	const thumbnail = ProdThumbnailInput.value;

	// PRIMERA CONEXION PROD
	socket.emit("client:productos", { tittle, price, thumbnail, id: 2 });
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

	prod.forEach((product) => {
		const html = ejs.render(datoHbs, product);
		ProdTable.innerHTML += html;
	});
};

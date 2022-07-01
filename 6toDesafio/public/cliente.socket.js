// ejecuto socket en el cliente
const socket = io();

// DOM
const formCont = document.getElementById("formCont");
const userInput = document.getElementById("userInput");
const textInput = document.getElementById("textInput");
const textPool = document.getElementById("textPool");

formCont.addEventListener("submit", (e) => {
	e.preventDefault();

	const msg = textInput.value;
	const user = userInput.value;

	socket.emit("cliente:mensaje", { user, msg });
});

// atajo el mensaje del servidor
socket.on("server:mensaje", (messageInfo) => {
	textPool.innerHTML = "";
	const horario = new Date();
	messageInfo.map(({ user, msg }) => (textPool.innerHTML += `<li>${user}: ${msg} - ${horario.getHours()}:${horario.getMinutes()}</li>`));
});

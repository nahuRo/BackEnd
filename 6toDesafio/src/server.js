// conf inicial
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const mensajes = []; // para guardar todos los msg del chat

// escuchando puerto
const expressServer = app.listen(port, (err) => {
	err ? console.log(err) : console.log("sevidor iniciado en http://localhost:8080/");
});

// socket.io
const { Server: IOServer } = require("socket.io"); //desestructuro y le cambio el nombre a IOServer
const io = new IOServer(expressServer);

// le digo a express donde van a estar todos mis archivos (html y demas)
app.use(express.static(path.join(__dirname, "../public")));

// estableciendo conexion desde el server (back)
io.on("connection", (socket) => {
	const { id } = socket;
	console.log("se conecto un nuevo cliente", id);

	//atajo la info del socket
	socket.on("cliente:mensaje", (messageInfo) => {
		// socket.emit("server:mensaje", messageInfo); // de esta manera emito el mensaje solamente al socket
		mensajes.push(messageInfo); // messageInfo es un objeto
		io.emit("server:mensaje", mensajes); // para enviar el emit a todos los sockets que estan conectados
	});

	socket.emit("server:mensaje", mensajes); // para cuando se conecte ese nuevo socket, le envio los mensajes del chat
});

// conf inicial
const express = require("express");
const app = express();
const path = require("path");

// traigo array de mensajes y productos
const { productos, mensajes } = require("../public/objects/ArrayProdDef");

// traigo los constructores para instaciar
const { GeneratorText, GeneratorProd } = require("../public/Constructores");

// ---- instacio
const ObjProd = new GeneratorProd("Productos.txt", productos); // instancio una clase Contenedor para generar un txt
const ObjText = new GeneratorText("Mensajes.txt", mensajes);

// escuchando puerto
const expressServer = app.listen(8080, (err) => {
	err ? console.log(err) : console.log("sevidor iniciado en http://localhost:8080/");
});

// socket.io
const { Server: IOServer } = require("socket.io"); //desestructuro y le cambio el nombre a IOServer
const io = new IOServer(expressServer);

// le digo a express donde van a estar todos mis archivos (html y demas)
app.use(express.static(path.join(__dirname, "../public")));

// estableciendo conexion desde el server (back)
io.on("connection", async (socket) => {
	const listProdTxt = await ObjProd.getAll();
	const listMsgTxt = await ObjText.getAll();

	if (listMsgTxt) mensajes.push(...listMsgTxt);
	if (listProdTxt) productos.push(...listProdTxt);

	const { id } = socket;
	console.log("se conecto un nuevo cliente", id);

	// atajo la info de los mensajes del socket
	socket.on("cliente:mensaje", async (messageInfo) => {
		await ObjText.save(messageInfo); // escribo el sms en un txt

		mensajes.push(messageInfo); // messageInfo es un objeto

		io.emit("server:mensaje", mensajes);
	});

	socket.emit("server:mensaje", mensajes); // para cuando se conecte ese nuevo socket, le envio los mensajes del chat

	// atajo la info de los productos del socket
	socket.on("client:productos", async (newProductos) => {
		await ObjProd.save(newProductos); // escribo productos en un txt

		productos.push(newProductos);

		io.emit("server:productos", productos);
	});

	socket.emit("server:productos", productos);
});

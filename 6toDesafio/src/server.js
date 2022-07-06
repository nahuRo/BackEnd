// conf inicial
const express = require("express");
const app = express();
const path = require("path");

// traigo array de mensajes y productos
const { productos, mensajes } = require("../public/objects/ArrayProdDef");

// traigo los constructores para instaciar
const { GeneratorText, GeneratorProd } = require("../public/Constructores");

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
	let listProdTxt = await ObjProd.getAll();
	let listMsgTxt = await ObjText.getAll();

	console.log("se conecto un nuevo cliente", socket.id);

	// para cuando se conecte ese nuevo socket, le envio los mensajes y productos que hay hasta el momento
	socket.emit("server:productos", await listProdTxt);
	socket.emit("server:mensaje", await listMsgTxt);

	// atajo la info de los productos del socket
	socket.on("client:productos", async (newProductos) => {
		await ObjProd.save(newProductos); // escribo productos en un txt

		listProdTxt = await ObjProd.getAll();

		io.emit("server:productos", productos);
	});

	// atajo la info de los mensajes del socket
	socket.on("cliente:mensaje", async (messageInfo) => {
		await ObjText.save(messageInfo); // escribo el sms en un txt y en el metodo pusheo el messageInfo a le array de mensajes

		listMsgTxt = await ObjText.getAll();

		io.emit("server:mensaje", listMsgTxt); // le paso todos los emnsajes a ..(clientServer)
	});
});

const express = require("express");
const app = express();
const path = require("path");

const { config__MariaDB, config__SQLite3 } = require("../public/db/configDBs");

// Middleware
app.use(express.json()); //midu usa solo este middleware
app.use(express.urlencoded({ extended: true }));

// traigo los constructores para instaciar
const { ProdClass, SmsClass } = require("../public/constructores/clases");

// ---- instacio
const ObjProd = new ProdClass("products", config__MariaDB); // instancio una clase Contenedor para generar un txt
const ObjText = new SmsClass("Mensajes", config__SQLite3);

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
	let listProd = await ObjProd.getAll();
	let listMsg = await ObjText.getAll();

	console.log("se conecto un nuevo cliente", socket.id);

	// para cuando se conecte ese nuevo socket, le envio los mensajes y productos que hay hasta el momento
	socket.emit("server:productos", await listProd);
	socket.emit("server:mensaje", await listMsg);

	// atajo la info de los productos del socket
	socket.on("client:productos", async (newProductos) => {
		await ObjProd.save(newProductos); // escribo productos en un txt

		listProd = await ObjProd.getAll();

		io.emit("server:productos", listProd);
	});

	// atajo la info de los mensajes del socket
	socket.on("cliente:mensaje", async (messageInfo) => {
		await ObjText.save(messageInfo); // escribo el sms en un txt y en el metodo pusheo el messageInfo a le array de mensajes

		listMsg = await ObjText.getAll();

		io.emit("server:mensaje", listMsg); // le paso todos los emnsajes a ..(clientServer)
	});
});

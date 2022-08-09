import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // for replicate a "__dirname"
import rutas from "./routes/routeIndex.js";
// para socket
import { Server as IOServer } from "socket.io";
// DBs
import { config__MariaDB } from "./database/configDBs.js";
import { ConnectionDB } from "./database/config/configMongo.js";
// traigo los constructores para instaciar
import { smsClassMongo, ProdClass } from "./utils/constructores.js";
import { cartSchema } from "./database/models/msgModel.js";

const app = express();
//
app.use("/api", rutas);
// Middleware
app.use(express.json()); //midu usa solo este middleware
app.use(express.urlencoded({ extended: true }));

// conexion con mongoose
ConnectionDB();

// ---- instacio
const ObjProd = new ProdClass("products", config__MariaDB); // instancio una clase Contenedor para generar un txt
const ObjText = new smsClassMongo("mensajes", cartSchema);

// escuchando puerto
const expressServer = app.listen(8080, (err) => {
	err ? console.log(err) : console.log("sevidor iniciado en http://localhost:8080/");
});

// socket.io
const io = new IOServer(expressServer);

// replicanting a "__dirname" of commonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// le digo a express donde van a estar todos mis archivos (html y demas)
app.use(express.static(path.join(__dirname, "../public")));

// estableciendo conexion desde el server (back)
io.on("connection", async (socket) => {
	let listProd = await ObjProd.getAll();
	let listMsg = await ObjText.getAll();

	console.log("se conecto un nuevo cliente", socket.id);

	// para cuando se conecte ese nuevo socket, le envio los mensajes y productos que hay hasta el momento
	socket.emit("server:productos", listProd);
	socket.emit("server:mensaje", listMsg);

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

// Atajo URLs no validas
app.use((req, res) => {
	res.status(404).json({
		error: -1,
		descripcion: req.path,
		método: "no autorizada",
	});
});

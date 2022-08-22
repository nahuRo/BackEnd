import express from "express";
import rutas from "./routes/routeIndex.js";
import cors from "cors";
// para socket
import { Server as IOServer } from "socket.io";
// DBs
import { config__MariaDB } from "./database/config/configDBs.js";
import { ConnectionDB } from "./database/config/configMongo.js";
// traigo los constructores para instaciar
import { smsClassMongo, ProdClass, sessClassMongo } from "./utils/constructores.js";
import { cartSchema } from "./database/models/msgModel.js";

import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

const app = express();
//
// Middleware

app.use(cookieParser());
app.use(
	session({
		store: mongoStore.create({
			mongoUrl: "mongodb+srv://agussCoder:agus123@cluster0.ezyymjl.mongodb.net/10moDesafio?retryWrites=true&w=majority",
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		secret: "coderhouse",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 5000,
		},
	})
);

app.use(cors());
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
const io = new IOServer(expressServer, {
	cors: {
		origin: "*",
	},
});

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
		// no se bien que hace este emit, con el 1er socket , me imprime los mensajes qu estoy escribiendo
		io.emit("server:mensaje", listMsg); // le paso todos los mensajes al socket actual
	});
});

app.use("/", rutas);

// Atajo URLs no validas
app.use((req, res) => {
	res.status(404).json({
		error: -1,
		descripcion: req.path,
		método: "no autorizada",
	});
});

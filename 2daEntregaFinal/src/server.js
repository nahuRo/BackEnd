import express from "express";
import rutas from "./routes/routeIndex.js";
import path from "path";
import { fileURLToPath } from "url"; // for replicate a "__dirname"
import dotenv from "dotenv";
import { ConnectionDB } from "./database/config/configMongo.js";

const app = express();
const PORT = process.env.PORT || 8080;

// replicanting a "__dirname" of commonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); //midu usa solo este middleware
app.use(express.urlencoded({ extended: true }));

// app.use(dotenv.config());
ConnectionDB();
app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`sevidor iniciado en http://localhost:${PORT}/`);
});

app.use(express.static(path.join(__dirname, "../public")));

app.use("/Api", rutas);

// Atajo URLs no validas
app.use((req, res) => {
	res.status(404).json({
		error: -1,
		descripcion: req.path,
		método: "no autorizada",
	});
});

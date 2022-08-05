import express from "express";
import path from "path";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); //midu usa solo este middleware
app.use(express.urlencoded({ extended: true }));

// replicanting a "__dirname" of commonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// escuchando puerto
app.listen(PORT, (err) => {
	err ? console.log(err) : console.log("sevidor iniciado en http://localhost:8080/");
});

// le digo a express donde van a estar todos mis archivos (html y demas)
app.use(express.static(path.join(__dirname, "../public")));

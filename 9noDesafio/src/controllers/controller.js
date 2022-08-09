import { productsTest } from "../utils/prodFaker.js";
import path from "path";
import { fileURLToPath } from "url"; // for replicate a "__dirname"

// replicanting a "__dirname" of commonJS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProdTest = (req, res) => {
	// res.sendFile(path.resolve(__dirname, "../../public/vista.html"));

	res.json(productsTest());
};

// le digo a express donde van a estar todos mis archivos (html y demas)

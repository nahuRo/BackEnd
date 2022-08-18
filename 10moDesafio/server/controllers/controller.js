import { productsTest } from "../utils/prodFaker.js";

export const getProdTest = (req, res) => {
	res.json(productsTest());
};

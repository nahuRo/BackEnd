const { Router } = require("express");
const route = Router();

route.get("/productos", (req, res) => {
	res.sendFile(__dirname + "/form.html");
});

route.post("/productos/form", (req, res) => {
	res.sendStatus(200);
});

module.exports = route;
// snipped 'an + TAB' crea una arrow function

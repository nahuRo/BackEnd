const express = require("express");
const app = express();
const port = 8080;

const rutas = require("./routes/Routes"); // traigo routes.js

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rutas); // redirijo a la routes.js

app.listen(port, (error) => {
	error ? console.log(`Hubo un error al inciar el servidor ${err}`) : console.log(`servidor inicado en el puerto ${port}`);
});

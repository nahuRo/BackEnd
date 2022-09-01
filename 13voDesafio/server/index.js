const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`sevidor iniciado en http://localhost:${PORT}/`);
});

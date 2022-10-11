const util = require("util");
const os = require("os");

const { loggerArchivoE } = require("../utils/logger");

const yargs = require("yargs")(process.argv.slice(2));
const args = yargs
	.alias({
		p: "puerto",
	})
	.default({
		puerto: 8080,
	}).argv;

const mensaje = "hola".repeat(1000);

const getInfo = (req, res) => {
	try {
		res.render("info", {
			argumentsEntri: args, // puerto
			systemName: process.platform,
			nodeV: process.version,
			memory: util.inspect(process.memoryUsage()),
			pathEjecusion: process.execPath,
			idPross: process.pid,
			ruta: process.cwd(),
			cpus: os.cpus().length,
			mensaje,
		});
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

const getInfoGzip = (req, res) => {
	try {
		res.render("info", {
			argumentsEntri: args, // puerto
			systemName: process.platform,
			nodeV: process.version,
			memory: util.inspect(process.memoryUsage()),
			pathEjecusion: process.execPath,
			idPross: process.pid,
			ruta: process.cwd(),
			cpus: os.cpus().length,
			mensaje,
		});
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

const getProfile = (req, res) => {
	try {
		res.render("profile");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

module.exports = { getInfo, getInfoGzip, getProfile };

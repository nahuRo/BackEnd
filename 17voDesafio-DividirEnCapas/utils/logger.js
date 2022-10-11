const log4js = require("log4js");

log4js.configure({
	appenders: {
		miLoggerConsole: { type: "console" },
		miLoggerArchivoWarnings: { type: "file", filename: "warn.log" },
		miLoggerArchivoErrores: { type: "file", filename: "error.log" },
	},
	categories: {
		default: { appenders: ["miLoggerConsole"], level: "info" },
		archivoWarn: { appenders: ["miLoggerArchivoWarnings"], level: "warn" },
		archivoError: { appenders: ["miLoggerArchivoErrores"], level: "error" },
	},
});

const loggerInfo = log4js.getLogger("default");
const loggerArchivoW = log4js.getLogger("archivoWarn");
const loggerArchivoE = log4js.getLogger("archivoError");

module.exports = { loggerInfo, loggerArchivoE, loggerArchivoW };

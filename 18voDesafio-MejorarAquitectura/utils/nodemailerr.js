const { createTransport } = require("nodemailer");

const TEST_MAIL = "agussrg80@gmail.com";

const transporter = createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: TEST_MAIL,
		pass: "fdcxfyxyvugppwph",
	},
});

const mailOptions = {
	from: "Server Node.js",
	to: "",
	subject: "Mail de prueba",
	html: '<h1 style="color:blue">Hola</h1>',
	// attachments: [
	// 	{
	// 		path: new URL(",.url de la imagen", import.meta.url.pathname),
	// 	},
	// ],
};

try {
	const info = transporter.sendMail(mailOptions);
	console.log(info);
} catch (error) {
	console.log(error);
}

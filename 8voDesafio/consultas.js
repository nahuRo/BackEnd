const Mensajes = [
	{
		user: "agus@gamail.com",
		fechayhora: "21/7/22 15:00:00",
		msg: "hola como estas",
	},
];

const productos = [
	{
		id: 1,
		tittle: "Zapatillas Nike",
		price: 2000,
		thumbnail: "urlDeImg",
		fecha: "21/7/22 15:00:00",
		codeBar: 221442,
	},
];
// ---- 0 ---- Creo las colecciones
db.createCollection("productosBase");
db.createCollection("MensajesBase");

// ---- 1 ---- Agrego los documentos
db.productosBase.insertMany([{}, {}]);
db.MensajesBase.insertMany([{}, {}]);

// ---- 3 ---- Listar todos los documentos en cada colección
db.productosBase.find().pretty();
db.MensajesBase.find().pretty();

// ---- 4 ---- Devuleve la cantidad de documentos presentes en una colección
db.productosBase.estimatedDocumentCount();
db.MensajesBase.estimatedDocumentCount();

// ---- 5 ---- CRUD
// a) Agregar un producto más en la colección de productos
db.productosBase.insertOne({});

// b)Realizar una consulta por nombre de producto específico:
//      1 - Listar los productos con precio menor a 1000 pesos.
db.productosBase.find({ price: { $it: 1000 } });

//      2 - Listar los productos con precio entre los 1000 a 3000 pesos.
db.productosBase.find({ $and: [{ price: { $gte: 1000 } }, { price: { $lte: 3000 } }] });

//      3 - Listar los productos con precio mayor a 3000 pesos.
db.productosBase.find({ price: { $gt: 3000 } });

//      4 - Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productosBase.find().skip(3).limit(1).sort({ price: -1 });

// c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productosBase.updateMany({}, { $set: { stock: 100 } });

// d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productosBase.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });

// e) Borrar los productos con precio menor a 1000 pesos
db.productosBase.deleteMany({ price: { $it: 1000 } });

// ---- 6 ---- Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
//             Verificar que pepe no pueda cambiar la información.

// 	paso --> 1)
//			show dbs (para ver todas las dbs que tengo)

// 	paso --> 2)
//			use admin (para configurar usuarios tnego que estar en la db "admin")

// 	paso --> 3)
//			db (chequeo que estoy en "admin")

// 	paso --> 4)
/*			db.createUser({  (creo el usuario)
				user: "pepe", // usuario
				pwd: "asd456", // password
				roles: [
					{
						role: "read", // rol (read o readWrite)
						db: "ecommerce", // base de datos para este user
					},
				],
			});
*/
// 	paso --> 5)
//			ctrl + c (cierro mi base de datos desde el servidor)

// 	paso --> 6)
//			mongod -auth --dbpath ./base (inicio un servidor con autentificacion para poder usar los usuarios)

// 	paso --> 7)
//			mongo -u pepe -p asd456 (me conecto a la db como cliente con el usuario que cree)

//  -- verificacion --
// 	con el usuario pepe puedo leer:
//			db.productosBase.find().pretty(); // muestro lo que tengo en productosBase

// 	con el usuario pepe no puedo escribir:
/*			db.productosBase.insertOne({
				id: 1,
				tittle: "Zapatillas Nike",
				price: 2000,
				thumbnail: "urlDeImg",
				fecha: "21/7/22 15:00:00",
				codeBar: 221442,
			});
*/

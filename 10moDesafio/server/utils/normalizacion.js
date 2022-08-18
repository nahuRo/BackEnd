import { normalize, denormalize, schema } from "normalizr";

export const checkLength = (listaSmg) => {
	const author = new schema.Entity("author");

	const mensajes = new schema.Entity(
		"mensajes",
		{
			autor: author,
		},
		{ idAttribute: "id" }
	);

	const mensajesNormalizados = normalize(listaSmg, mensajes);

	const lengthListaN = JSON.stringify(mensajesNormalizados).length;
	const lengthLista = JSON.stringify(listaSmg).length;

	return [lengthLista, lengthListaN];
};

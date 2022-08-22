import { faker } from "@faker-js/faker";

export const productsTest = () => {
	const productos = [];

	for (let i = 0; i < 5; i++) {
		productos.push({
			nombre: faker.commerce.product(),
			precio: faker.commerce.price(),
			foto: faker.image.imageUrl(),
		});
	}
	return productos;
};

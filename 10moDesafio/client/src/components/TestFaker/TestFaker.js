import axios from "axios";
import { useState, useEffect } from "react";
import style from "./TestFake.module.css";

const TestFaker = () => {
	const [faker, setFaker] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get("http://localhost:8080/productos-test");
			setFaker(data);
		})();
	}, []);

	if (faker.length === 0) return <h1>Loading</h1>;

	return (
		<div className={style.container}>
			<h1>Objetos de Faker.js</h1>
			<div>
				<table>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Imagen</th>
							<th>Precio</th>
						</tr>
					</thead>
					<tbody>
						{faker.map((fake) => (
							<tr key={fake.precio}>
								<th>{fake.nombre}</th>
								<th>{fake.foto}</th>
								<th>{fake.precio}</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TestFaker;

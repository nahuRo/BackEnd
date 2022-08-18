import axios from "axios";
import { useState } from "react";
import style from "./TestFake.module.css";

const TestFaker = () => {
	const [faker, setFaker] = useState([]);

	const getTetsData = async () => {
		const { data } = await axios.get("http://localhost:8080/productos-test");
		setFaker(data);
	};

	return (
		<div className={style.container}>
			<h1>Objetos de Faker.js</h1>
			<button onClick={getTetsData}>traer productos faker</button>
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

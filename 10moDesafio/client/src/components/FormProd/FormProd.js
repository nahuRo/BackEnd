import { useContext } from "react";
import { SocketInfoContext } from "../../context/SocketsInfoContext";
import socket from "../socket";
import style from "./Form.module.css";

const FormProd = () => {
	const { prod } = useContext(SocketInfoContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			tittle: e.target.nameP.value,
			price: e.target.priceP.value,
			thumbnail: e.target.ImgP.value,
			descripcion: e.target.descripP.value,
			stock: e.target.stockP.value,
			codeBar: Math.floor(Math.random() * (200000 - 100000 + 1) + 100000),
		};

		socket.emit("client:productos", data);
	};

	return (
		<div className={style.container}>
			<div>
				<form onSubmit={handleSubmit}>
					<label>
						Nombre del producto :
						<input type="text" name="nameP" placeholder=" Pelota" />
					</label>
					<br />

					<label>
						Precio del producto :
						<input type="number" name="priceP" placeholder="..." />
					</label>
					<br />

					<label>
						Imagen del producto :
						<input type="text" name="ImgP" placeholder="..." />
					</label>
					<br />

					<label>
						descripcion del producto :
						<input type="text" name="descripP" placeholder="user age" />
					</label>
					<br />

					<label>
						Stock del producto :
						<input type="number" name="stockP" placeholder="..." />
					</label>
					<br />

					<button>send</button>
				</form>
			</div>
			<div>
				<h1>Lista de Productos</h1>
				<div>
					<table className={style.table}>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Precio</th>
								<th>Imagen</th>
								<th>Stock</th>
								<th>Descripcion</th>
								<th>Codigo</th>
							</tr>
						</thead>
						<tbody>
							{prod.map((item) => (
								<tr key={item.id}>
									<th>{item.tittle}</th>
									<th>{item.price}</th>
									<th>
										<img src={item.thumbnail} alt={item.tittle} />
									</th>
									<th>{item.stock}</th>
									<th>{item.descripcion}</th>
									<th>{item.codeBar}</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default FormProd;

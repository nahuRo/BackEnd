import socket from "../socket";
import style from "./Form.module.css";
import { useContext } from "react";
import { SocketInfoContext } from "../../context/SocketsInfoContext";

const FormMsg = () => {
	const { msg } = useContext(SocketInfoContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			author: {
				id: e.target.email.value,
				nombre: e.target.name.value,
				apellido: e.target.lastN.value,
				edad: e.target.age.value,
				alias: e.target.alias.value,
				avatar: e.target.avatar.value,
			},
			text: e.target.text.value,
		};

		socket.emit("cliente:mensaje", data);
	};

	return (
		<div className={style.container}>
			<div>
				<form onSubmit={handleSubmit}>
					<label>
						Email :
						<input type="email" id="nameI" name="email" placeholder=" mail@gmail.com" />
					</label>
					<br />

					<label>
						Nombre de usuario :
						<input type="text" id="priceI" name="name" placeholder="user name" />
					</label>
					<br />

					<label>
						apellido del usuario :
						<input type="text" id="lastNameI" name="lastN" placeholder="user last name" />
					</label>
					<br />

					<label>
						edad del usuario :
						<input type="number" id="ageUserI" name="age" placeholder="user age" />
					</label>
					<br />

					<label>
						alias del usuario :
						<input type="text" id="aliasI" name="alias" placeholder="user alias" />
					</label>
					<br />

					<label>
						avatar del usuario :
						<input type="text" id="avatarI" name="avatar" placeholder="user avatar" />
					</label>
					<br />

					<input type="text" id="avatarI" name="text" placeholder=" Text..." />
					<br />

					<button>send</button>
				</form>
			</div>

			<div>
				<h1>Lista de mensajes</h1>
				<div>
					<ul>
						{msg.map((msg) => (
							<li key={msg._id}>
								{msg.author.id} / {msg.createdAt} : {msg.text}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default FormMsg;

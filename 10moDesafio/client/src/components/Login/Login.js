import axios from "axios";

import { useContext } from "react";
import { SocketInfoContext } from "../../context/SocketsInfoContext";

const Login = () => {
	const { user, setUser } = useContext(SocketInfoContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const dataIn = await axios.post("http://localhost:8080/login", {
			userName: e.target.input.value,
		});
		const { data } = dataIn;
		setUser(data);
	};

	const logOut = async () => {
		const dataOut = await axios.get("http://localhost:8080/logout");
		console.log(dataOut.data); // si se elimino retorna un 200
		setUser(null);
	};

	return (
		<div>
			<h1>LOG IN</h1>
			{!user ? (
				<form onSubmit={handleSubmit}>
					<label>
						Ingrese el nombre de usuario :
						<input type="text" name="input" />
					</label>
					<button>send</button>
				</form>
			) : (
				<div>
					<button onClick={logOut}>Cerrar Sesion</button>
				</div>
			)}
		</div>
	);
};

export default Login;

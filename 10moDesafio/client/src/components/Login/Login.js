import socket from "../socket";
import { useState } from "react";

const Login = () => {
	const [user, setUser] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(user);
	};
	// socket.on("server:mensaje", (messageArray) => setMsg(messageArray));
	socket.emit("cliente:mensaje", "holaaaa desde cliente");
	return (
		<>
			{/* <div>{msg}</div> */}
			<form onSubmit={handleSubmit}>
				<label for="input">Ingrese el nombre de usuario</label>
				<input type="text" id="input" onChange={(e) => setUser(e.target.value)} />
				<button>send</button>
			</form>
		</>
	);
};

export default Login;

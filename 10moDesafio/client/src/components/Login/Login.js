import axios from "axios";

const Login = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await axios.post("http://localhost:8080/login", {
			userName: e.target.input.value,
		});
		console.log(data);
		console.log(data.data);
	};

	return (
		<>
			<div>
				<h1>{}</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<label>
					Ingrese el nombre de usuario :
					<input type="text" name="input" />
				</label>
				<button>send</button>
			</form>
		</>
	);
};

export default Login;

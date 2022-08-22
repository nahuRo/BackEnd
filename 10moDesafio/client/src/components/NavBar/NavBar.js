import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

import { useContext } from "react";
import { SocketInfoContext } from "../../context/SocketsInfoContext";

const NavBar = () => {
	const { user } = useContext(SocketInfoContext);

	return (
		<div>
			{user ? (
				<>
					<div className={style.container}>
						<nav className={style.links}>
							<Link to="/">Login</Link>
							<Link to="/mensajes">Mensajes</Link>
							<Link to="/productos">Productos</Link>
							<Link to="/productosFaker">Productos Faker</Link>
						</nav>
					</div>
				</>
			) : (
				<h1 className={style.notUser}>"Necesitas ser usuario para ver las rutas"</h1>
			)}
		</div>
	);
};

export default NavBar;

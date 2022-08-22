import { useState, createContext, useEffect } from "react";
import socket from "../components/socket";

// el que uso para el useContext
export const SocketInfoContext = createContext();

// el que uso para envolver todo lo que quiero que tenga ecceso
export const CartContextProvider = ({ children }) => {
	const [prod, setProd] = useState([]);
	const [msg, setMsg] = useState([]);
	const [user, setUser] = useState(null);

	// me traigo los productos y mensajes de la base de datos con el socket porque como solo se 'ejecuta'
	// el socket en la base de datos cuando se conecta un nuevo socket (abroi una nueva pensataña)
	// entonce la llamada la tengo que hacer al principio o sea en el <App/> ya que es el primer render
	// de lo contrario si lo hago en una seccion que tenga y alli quiero traer lo del socket
	// no me va a funcionar porque la concexion al socket se hizo con el primer render

	// en resumen cuando tenga que usar algo por medio de sockets como traer info, la tengo que haces desde <App/>
	// o del componente que haga el primer render
	useEffect(() => {
		socket
			.on("server:productos", (productos) => {
				setProd(productos);
			})
			.on("server:mensaje", (mensajes) => {
				setMsg(mensajes);
			});
	}, []);

	return (
		<SocketInfoContext.Provider
			value={{
				prod,
				msg,
				user,
				setUser,
			}}
		>
			{children}
		</SocketInfoContext.Provider>
	);
};

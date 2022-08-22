import FormMsg from "./components/FormMsg/FormMsg";
import FormProd from "./components/FormProd/FormProd";
import Login from "./components/Login/Login";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import TestFaker from "./components/TestFaker/TestFaker";
import NavBar from "./components/NavBar/NavBar";

import { Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./context/SocketsInfoContext";

function App() {
	return (
		<div>
			<CartContextProvider>
				<NavBar />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/mensajes" element={<FormMsg />} />
					<Route path="/productos" element={<FormProd />} />
					<Route path="/productosFaker" element={<TestFaker />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</CartContextProvider>
		</div>
	);
}

export default App;

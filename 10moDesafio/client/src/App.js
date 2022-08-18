// import FormMsg from "./components/FormMsg/FormMsg";
// import { useState, useEffect } from "react";
import FormMsg from "./components/FormMsg/FormMsg";
import FormProd from "./components/FormProd/FormProd";
import TestFaker from "./components/TestFaker/TestFaker";

function App() {
	return (
		<div>
			<div>
				<FormMsg />
			</div>
			<div>
				<FormProd />
			</div>

			<div>
				<TestFaker />
			</div>
		</div>
	);
}

export default App;

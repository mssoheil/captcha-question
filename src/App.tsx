import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import Captcha from "./components/captcha";

const App: React.FC = () => {
	return (
		<div className="App">
			<Captcha maxNumberOfItems={6} />
		</div>
	);
};

export default App;

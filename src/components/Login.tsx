import React from "react";
import man from "../Man.png";
import "../styles/Login.css";

function Login() {
	return (
		<div className="global-container">
			<div className="pitch"></div>
			<div className="wrapper">
				<img src={man} className="logo-register" />
				<p className="header-register">Ball Together</p>
			</div>
		</div>
	);
}

export default Login;

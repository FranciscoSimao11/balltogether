import React from "react";
import man from "../Man.png";
import "../styles/Login.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const FormTextField = styled(TextField)({
	paddingBottom: 20,
	width: 260,
	"& label.Mui-focused": {
		color: "white",
	},
	"& label": {
		color: "white",
	},
	"& input": {
		color: "white",
	},
	"&:focus": {
		fontWeight: 800,
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "white",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
});

const LoginButton = styled(Button)({
	color: "white",
	backgroundColor: "#282b29",
	fontSize: "28px",
	marginTop: "20px",
	padding: "6px 90px 6px 90px", //up right bottom left
	"&:hover": {
		backgroundColor: "#4b4b4b",
	},
});

function Login() {
	return (
		<div className="global-container">
			<div className="pitch">
				<div className="goal">
					<div className="box">
						<div className="dot"></div>
					</div>
				</div>
			</div>
			<div className="wrapper">
				<img src={man} className="logo-register" />
				<p className="header-register">Ball Together</p>
				<div className="form">
					<FormTextField label="Email" />
					<FormTextField label="Password" type="password" />
					<Link to="/balltogether/home" style={{ textDecoration: "none" }}>
						<LoginButton variant="contained">Login</LoginButton>
					</Link>
				</div>
				<div className="phrase">Forgot your password?</div>
				<div className="phrase">
					Don't have an account? <b>Register</b> now!
				</div>
			</div>
		</div>
	);
}

export default Login;

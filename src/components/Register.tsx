import React from "react";
import man from "../Man.png";
import "../styles/Register.css";
import TextField from "@mui/material/TextField";

function Register() {
	return (
		<div className="global-wrapper">
			<img src={man} className="logo-register" />
			<p className="header-register">Ball Together</p>
			<div className="form">
				<TextField
					label="First Name"
					variant="filled"
					//so o primeiro style é que faz alguma coisa wtf
					sx={{
						"& label.Mui-focused": {
							color: "white",
						},
						"& .MuiInput-underline:after": {
							borderBottomColor: "white",
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
					}}
				/>
			</div>
		</div>
	);
}

export default Register;

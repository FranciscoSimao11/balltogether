import React from "react";
import man from "../Man.png";
import "../styles/Login.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

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
					<FormTextField label="Password" />
					<Button
						variant="contained"
						sx={{
							color: "white",
							backgroundColor: "#282b29",
							fontSize: "28px",
							marginTop: "20px",
							paddingX: "90px",
							"&:hover": {
								backgroundColor: "#4b4b4b",
							},
						}}
					>
						Login
					</Button>
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

import React from "react";
import man from "../Man.png";
import "../styles/Register.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const FormTextField = styled(TextField)({
	marginTop: -10,
	paddingBottom: 20,
	"& label.Mui-focused": {
		color: "white",
	},
	"& label": {
		color: "white",
	},
	"& input": {
		color: "white",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "gray",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
});

function Register() {
	return (
		<div className="global-wrapper">
			<img src={man} className="logo-register" />
			<p className="header-register">Ball Together</p>
			<div className="form">
				<FormTextField label="First Name" />
				<FormTextField label="Last Name" />
				<FormTextField label="Email Address" />
				<FormTextField label="Phone Number" />
				<FormTextField label="Password" />
				<FormTextField label="Confirm Password" />
				<Button
					variant="contained"
					sx={{
						color: "white",
						backgroundColor: "black",
						fontSize: "16px",
						padding: "16px",
						paddingRight: "60px",
						paddingLeft: "60px",
						"&:hover": {
							backgroundColor: "#4b4b4b",
						},
					}}
				>
					Register
				</Button>
			</div>
		</div>
	);
}

export default Register;

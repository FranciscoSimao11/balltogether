import React from "react";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import { styled } from "@mui/material/styles";
import TopBar from "./TopBar";

const RegisterButton = styled(Button)({
	color: "white",
	backgroundColor: "black",
	marginRight: "80px",
	fontSize: "28px",
	padding: "20px",
	"&:hover": {
		backgroundColor: "#4b4b4b",
	},
});

const LoginButton = styled(Button)({
	color: "white",
	backgroundColor: "#177a46",
	fontSize: "28px",
	marginLeft: "80px",
	padding: "20px 40px 20px 40px",
	"&:hover": {
		backgroundColor: "#179a55",
	},
});

function Homepage() {
	return (
		<div>
			<TopBar />
			<div className="Slogan-wrapper">
				<div className="Slogan">Play the</div>
				<div className="Slogan2">Beautiful Game!</div>
			</div>
			<div className="Button-wrapper">
				<Link to="/balltogether/register" style={{ textDecoration: "none" }}>
					<RegisterButton variant="contained">Register</RegisterButton>
				</Link>
				<Link to="/balltogether/login" style={{ textDecoration: "none" }}>
					<LoginButton variant="contained">Login</LoginButton>
				</Link>
			</div>
		</div>
	);
}

export default Homepage;

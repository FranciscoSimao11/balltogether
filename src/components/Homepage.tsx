import React from "react";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router";
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
	backgroundColor: "#02612f", //"#177a46",
	fontSize: "28px",
	marginLeft: "80px",
	padding: "20px 40px 20px 40px",
	"&:hover": {
		backgroundColor: "#179a55",
	},
});

function Homepage() {
	let navigate = useNavigate();
	return (
		<div>
			<TopBar />
			<div className="Slogan-wrapper">
				<div className="Slogan">Play the</div>
				<div className="Slogan2">Beautiful Game!</div>
			</div>
			<div className="Button-wrapper">
				<RegisterButton
					variant="contained"
					onClick={() => navigate("/balltogether/register")}
				>
					Register
				</RegisterButton>
				<LoginButton
					variant="contained"
					onClick={() => navigate("/balltogether/login")}
				>
					Login
				</LoginButton>
			</div>
		</div>
	);
}

export default Homepage;

import React from "react";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import TopBar from "./TopBar";

function Homepage() {
	return (
		<div>
			<TopBar display={"inline"} />
			<div className="Slogan-wrapper">
				<div className="Slogan">Play the</div>
				<div className="Slogan2">Beautiful Game!</div>
			</div>
			<div className="Button-wrapper">
				<Link to="/balltogether/register" style={{ textDecoration: "none" }}>
					<Button
						variant="contained"
						sx={{
							color: "white",
							backgroundColor: "black",
							marginRight: "80px",
							fontSize: "28px",
							padding: "20px",
							"&:hover": {
								backgroundColor: "#4b4b4b",
							},
						}}
					>
						Register
					</Button>
				</Link>
				<Link to="/balltogether/login" style={{ textDecoration: "none" }}>
					<Button
						variant="contained"
						sx={{
							color: "white",
							backgroundColor: "#177a46",
							fontSize: "28px",
							marginLeft: "80px",
							padding: "20px",
							paddingX: "40px",
							"&:hover": {
								backgroundColor: "#179a55",
							},
						}}
					>
						Login
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Homepage;

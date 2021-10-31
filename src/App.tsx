import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TopBar from "./components/TopBar";
import { Button } from "@mui/material";

function App() {
	return (
		<div className="App">
			<TopBar></TopBar>
			<div className="Slogan-wrapper">
				<div className="Slogan">Play the</div>
				<div className="Slogan2">Beautiful Game!</div>
			</div>
			<div className="Button-wrapper">
				<Button
					variant="contained"
					sx={{
						color: "white",
						backgroundColor: "black",
						marginRight: "80px",
						fontSize: "28px",
						padding: "20px",
					}}
				>
					Register
				</Button>
				<Button
					variant="contained"
					sx={{
						color: "white",
						backgroundColor: "#50C878",
						fontSize: "28px",
						marginLeft: "80px",
						padding: "20px",
						paddingX: "40px",
					}}
				>
					Login
				</Button>
			</div>
		</div>
	);
}

export default App;

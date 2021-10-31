import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import man from "../Man.png";
import "../styles/TopBar.css";

function TopBar() {
	//O LOGO TEM POUCA DEFINIÇAO POR ALGUMA RAZAO INVEStIGAR
	return (
		<AppBar sx={{ backgroundColor: "black" }}>
			<Toolbar>
				<img src={man} className="logo" />
				<Typography
					variant="h6"
					sx={{ fontFamily: "Verdana", fontWeight: 600 }}
				>
					Ball Together
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default TopBar;

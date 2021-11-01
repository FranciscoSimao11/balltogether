import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
					<Link
						to="/balltogether/"
						style={{ textDecoration: "none", color: "white" }}
					>
						Ball Together
					</Link>
				</Typography>

				<Typography
					sx={{
						fontFamily: "Verdana",
						position: "relative",
						left: "44%",
						paddingRight: "30px",
					}}
				>
					About Us
				</Typography>
				<Typography
					sx={{
						fontFamily: "Verdana",
						position: "relative",
						left: "44%",
						paddingRight: "30px",
					}}
				>
					|
				</Typography>
				<Typography
					sx={{
						fontFamily: "Verdana",
						position: "relative",
						left: "44%",
						paddingRight: "30px",
					}}
				>
					<Link
						to="/balltogether/login"
						style={{ textDecoration: "none", color: "white" }}
					>
						Login
					</Link>
				</Typography>

				<Typography
					sx={{
						fontFamily: "Verdana",
						position: "relative",
						left: "44%",
						paddingRight: "30px",
					}}
				>
					<Link
						to="/balltogether/register"
						style={{ textDecoration: "none", color: "white" }}
					>
						Register
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default TopBar;

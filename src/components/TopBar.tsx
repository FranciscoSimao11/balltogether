import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import man from "../Man.png";
import "../styles/TopBar.css";
import { styled } from "@mui/material/styles";
//O LOGO TEM POUCA DEFINIÇAO POR ALGUMA RAZAO INVEStIGAR

const StyledTypography = styled(Typography)({
	fontFamily: "Verdana",
	position: "relative",
	left: "44%",
	paddingRight: "30px",
});

function changeDisplay(display: string) {
	if (display == "inline") return "none";
	else return "inline";
}

function TopBar(props: any) {
	const { display } = props;
	const [hidden, setHidden] = useState(display);
	//repensar esta cena dos hiddens
	return (
		<AppBar sx={{ backgroundColor: "black", display: hidden }}>
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
				<StyledTypography>About Us</StyledTypography>
				<StyledTypography>|</StyledTypography>
				<StyledTypography>
					<Link
						to="/balltogether/login"
						style={{ textDecoration: "none", color: "white" }}
						onClick={() => setHidden(changeDisplay(display))}
					>
						Login
					</Link>
				</StyledTypography>
				<StyledTypography>
					<Link
						to="/balltogether/register"
						style={{ textDecoration: "none", color: "white" }}
						onClick={() => setHidden(changeDisplay(display))}
					>
						Register
					</Link>
				</StyledTypography>
			</Toolbar>
		</AppBar>
	);
}

export default TopBar;

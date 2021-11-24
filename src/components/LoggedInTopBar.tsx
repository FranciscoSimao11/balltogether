import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import man from "../Man.png";
import "../styles/TopBar.css";
import { styled } from "@mui/material/styles";
import {
	NotificationsRounded,
	Face,
	KeyboardArrowDown,
} from "@mui/icons-material/";

//O LOGO TEM POUCA DEFINIÇAO POR ALGUMA RAZAO INVESTIGAR

const StyledTypography = styled(Typography)({
	fontFamily: "Verdana",
	position: "relative",
	left: "44%",
	paddingRight: "30px",
});

//NAS NOTIFICAÇOES METER UM DRAWER PARA AS MOSTRAR
function LoggedInTopBar() {
	return (
		<AppBar
			sx={{ backgroundColor: "black", display: "inline", height: "74px" }}
		>
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
				<StyledTypography>|</StyledTypography>
				<StyledTypography>
					<NotificationsRounded sx={{ fontSize: "2.2rem", marginX: "-8px" }} />
				</StyledTypography>
				<StyledTypography>
					<Link
						to="/balltogether/profile"
						style={{ textDecoration: "none", color: "white" }}
					>
						<Face sx={{ fontSize: "2.2rem", marginX: "-8px" }} />
					</Link>
				</StyledTypography>
				<StyledTypography>
					<Link
						to="/balltogether/profile"
						style={{ textDecoration: "none", color: "white" }}
					>
						Profile
					</Link>
				</StyledTypography>
				<StyledTypography>
					<KeyboardArrowDown sx={{ fontSize: "1.5rem", marginX: "-20px" }} />
				</StyledTypography>
			</Toolbar>
		</AppBar>
	);
}

export default LoggedInTopBar;

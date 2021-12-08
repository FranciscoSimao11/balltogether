import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import man from "../Man.png";
import "../styles/TopBar.css";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
//O LOGO TEM POUCA DEFINIÇAO POR ALGUMA RAZAO INVEStIGAR

const StyledTypography = styled(Typography)({
	fontFamily: "Verdana",
	position: "relative",
	left: "44%",
	paddingRight: "30px",
});

function TopBar() {
	let navigate = useNavigate();
	return (
		<AppBar
			sx={{ backgroundColor: "black", display: "inline", height: "74px" }}
		>
			<Toolbar>
				<img
					src={man}
					className="logo"
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/balltogether")}
				/>
				<Typography
					variant="h6"
					sx={{ fontFamily: "Verdana", fontWeight: 600 }}
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/balltogether")}
				>
					Ball Together
				</Typography>
				<StyledTypography>
					<Link
						href="https://franciscosimao11.github.io/ipmwebsite/"
						sx={{
							textDecoration: "none",
							color: "white",
							"&:hover": {
								color: "rgb(0, 178, 155)",
							},
						}}
					>
						About Us
					</Link>
				</StyledTypography>
				<StyledTypography>|</StyledTypography>
				<StyledTypography
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/balltogether/login")}
					sx={{
						"&:hover": {
							color: "rgb(0, 178, 155)",
						},
					}}
				>
					Login
				</StyledTypography>
				<StyledTypography
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/balltogether/register")}
					sx={{
						"&:hover": {
							color: "rgb(0, 178, 155)",
						},
					}}
				>
					Register
				</StyledTypography>
			</Toolbar>
		</AppBar>
	);
}

export default TopBar;

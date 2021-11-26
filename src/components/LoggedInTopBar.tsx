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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

//O LOGO TEM POUCA DEFINIÇAO POR ALGUMA RAZAO INVESTIGAR
//TIRAR EFEITOS DE CLICK NO SINO E NA SETA
const StyledTypography = styled(Typography)({
	fontFamily: "Verdana",
	position: "relative",
	left: "44%",
	paddingRight: "30px",
});

function Notifications() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				sx={{ color: "white", width: "0px", minWidth: "0px" }}
			>
				<NotificationsRounded sx={{ fontSize: "2.2rem", marginX: "-8px" }} />
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				sx={{ marginTop: "40px" }}
			>
				<MenuItem onClick={handleClose}>
					No notifications at the moment, depois tratar disto
				</MenuItem>
			</Menu>
		</div>
	);
}

function Options() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				sx={{ color: "white", width: "0px", minWidth: "0px" }}
			>
				<KeyboardArrowDown sx={{ fontSize: "1.5rem", marginRight: "30px" }} />
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				sx={{ marginTop: "40px", marginLeft: "-20px" }}
			>
				<Link
					to="/balltogether/profile"
					style={{ textDecoration: "none", color: "black" }}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
				</Link>
				<Link
					to="/balltogether"
					style={{ textDecoration: "none", color: "black" }}
				>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Link>
			</Menu>
		</div>
	);
}

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
					sx={{ fontFamily: "Verdana", fontWeight: 600, whiteSpace: "nowrap" }}
				>
					<Link
						to="/balltogether/"
						style={{ textDecoration: "none", color: "white" }}
					>
						Ball Together
					</Link>
				</Typography>
				<div
					style={{
						display: "flex",
						marginInline: "725px",
						alignItems: "center",
					}}
				>
					<StyledTypography>|</StyledTypography>
					<StyledTypography>
						<Notifications />
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
						<Options />
					</StyledTypography>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default LoggedInTopBar;

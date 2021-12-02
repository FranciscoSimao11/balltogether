import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { InputBase, Toolbar, Typography } from "@mui/material";
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
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

//O LOGO TEM POUCA DEFINIÇAO POR ALGUMA RAZAO INVESTIGAR
//TIRAR EFEITOS DE CLICK NO SINO E NA SETA
const StyledTypography = styled(Typography)({
	fontFamily: "Verdana",
	position: "relative",
	left: "44%",
	paddingRight: "30px",
});

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "rgb(255,255,255,0.15)",
	"&:hover": {
		backgroundColor: "rgb(255,255,255,0.25)",
	},
	marginRight: theme.spacing(2),
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: "100px",
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		//paddingRight: "350px",
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "58ch",
		},
	},
}));

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
				sx={{ color: "white", width: "0px", minWidth: "0px", padding: "0px" }}
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
					No notifications at the moment.
				</MenuItem>
			</Menu>
		</div>
	);
}

function Options() {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	const { logout } = bindActionCreators(actionCreators, dispatch);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		setAnchorEl(null);
		logout((state as any).session);
		localStorage.removeItem("activeUser");
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				sx={{
					color: "white",
					width: "0px",
					minWidth: "0px",
					padding: "0px",
				}}
			>
				<KeyboardArrowDown
					sx={{
						fontSize: "1.5rem",
						marginRight: "30px",
					}}
				/>
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
				<MenuItem onClick={handleLogout}>
					<Link
						to="/balltogether"
						style={{ textDecoration: "none", color: "black" }}
					>
						Logout
					</Link>
				</MenuItem>
			</Menu>
		</div>
	);
}

//NAS NOTIFICAÇOES METER UM DRAWER PARA AS MOSTRAR
function LoggedInTopBar() {
	const state = useSelector((state) => state);
	const { session } = state as any;
	const [user, setUser] = useState<any>();
	const getUser = () => {
		if (!user) {
			fetch("http://localhost:8000/users/" + session.id, {
				method: "GET",
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setUser(data);
				});
		} else {
			fetch("http://localhost:8000/users/" + user.id, {
				method: "GET",
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setUser(data);
				});
		}
	};
	useEffect(() => {
		console.log(user);
		if (!user) {
			getUser();
		}
	}, [user]);

	return (
		<AppBar
			sx={{ backgroundColor: "black", display: "inline", height: "74px" }}
		>
			{user && (
				<Toolbar>
					<img src={man} className="logo" />
					<Typography
						variant="h6"
						sx={{
							fontFamily: "Verdana",
							fontWeight: 600,
							whiteSpace: "nowrap",
						}}
					>
						<Link
							to="/balltogether/home"
							style={{ textDecoration: "none", color: "white" }}
						>
							Ball Together
						</Link>
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<div
						style={{
							display: "flex",
							marginInline: "31.5px",
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
								<Avatar
									sx={{
										marginX: "0px",
										height: "32px",
										width: "32px",
										marginRight: "-10px",
										backgroundColor: "rgb(255,255,255,0.2)",
									}}
									src={user.avatar}
								/>
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
			)}
		</AppBar>
	);
}

export default LoggedInTopBar;

import React, { useEffect, useState } from "react";
import { Button, MenuItem } from "@mui/material";
import "../styles/LoggedInHomepage.css";
import LoggedInTopBar from "./LoggedInTopBar";
import { levels, hours } from "../misc/miscFuncs";
import Select from "@mui/material/Select";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GradeIcon from "@mui/icons-material/Grade";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import MapWrapper from "./Map";
import * as matches from "../misc/Matches.json";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

const BootstrapInput = styled(InputBase)({
	"label + &": {
		color: "black",
	},
	"& .MuiInputBase-input": {
		borderRadius: 4,
		position: "relative",
		border: "1px solid white",
		fontSize: 16,
		padding: "16.5px 100px 0 0",
		color: "white",
		"&:focus": {
			borderRadius: 4,
			borderColor: "white",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
	},
});

const HostMatchButton = styled(Button)({
	marginTop: "170px",
	padding: "20px 50px 20px 50px",
	marginRight: "15px",
	color: "#242825",
	fontSize: "25px",
	backgroundColor: "white",
	fontWeight: "bold",
	"&:hover": {
		backgroundColor: "#454d47",
		color: "white",
	},
});

function BasicDatePicker() {
	const [date, setDate] = React.useState(null);

	return (
		<Box
			sx={{
				width: "207.31px",
				marginTop: "4px",
			}}
		>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label="Date"
					value={date}
					onChange={(newDate) => {
						setDate(newDate);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</Box>
	);
}

function LoggedInHomepage() {
	const state = useSelector((state) => state);
	const [currentPosition, setPosition] = useState({});
	const [hour, setHour] = useState({});
	const [level, setLevel] = useState({});
	const mapStyle = {
		width: `80%`,
		minWidth: "80%",
		height: `90.7vh`,
		minHeight: "90.7vh",
		marginLeft: `auto`,
		marginRight: `auto`,
		padding: `74px 0px 0px 0`,
		position: `relative`,
		float: "right",
	};

	console.log(state);
	// navigator.geolocation.getCurrentPosition((position) => {
	// 	const positionObject = {
	// 		latitude: position.coords.latitude,
	// 		longitude: position.coords.longitude,
	// 	};
	// 	setPosition(positionObject);
	// });
	useEffect(() => {
		setPosition({
			latitude: 38.660988,
			longitude: -9.203319,
		});
	}, []);

	return (
		<div className="logged-in-homepage-wrapper">
			<LoggedInTopBar />
			<div className="select-wrapper">
				<h1 style={{ color: "white" }}>Filter Matches</h1>
				<div className="select-and-icon">
					<DateRangeIcon
						sx={{
							color: "white",
							fontSize: "60px",
							marginRight: "25px",
						}}
					/>
					<BasicDatePicker></BasicDatePicker>
				</div>
				<div className="select-and-icon">
					<AccessTimeIcon
						sx={{ color: "white", fontSize: "60px", marginRight: "25px" }}
					/>
					<Select
						label="Hour"
						value={hour}
						onChange={(e) => setHour(e.target.value)}
						sx={{
							paddingX: "25%",
						}}
					>
						{hours.map((hour) => (
							<MenuItem
								value={hour}
								sx={{
									paddingX: "20px", //PARA DETNRO DO INPUT PROP NESTA CENA????
								}}
							>
								{hour}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className="select-and-icon">
					<GradeIcon
						sx={{
							color: "white",
							fontSize: "60px",
							marginRight: "25px",
						}}
					/>
					<Select
						label="Hour"
						value={hour}
						onChange={(e) => setHour(e.target.value)}
						sx={{
							paddingX: "25%",
						}}
					>
						{levels.map((level) => (
							<MenuItem
								value={level}
								sx={{
									paddingX: "20px", //PARA DETNRO DO INPUT PROP NESTA CENA????
								}}
							>
								{level}
							</MenuItem>
						))}
					</Select>
				</div>
				<Link to="/balltogether/hostmatch" style={{ textDecoration: "none" }}>
					<HostMatchButton>Host Match</HostMatchButton>
				</Link>
			</div>
			<MapWrapper
				position={currentPosition}
				mapStyle={mapStyle}
				matches={matches}
			/>
		</div>
	);
}

export default LoggedInHomepage;

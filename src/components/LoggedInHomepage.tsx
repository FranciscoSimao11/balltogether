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
					renderInput={(params) => (
						<TextField sx={{ color: "white" }} {...params} />
					)}
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
	//<BasicDatePicker></BasicDatePicker>
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
					<input type="date" id="birthday" name="birthday"></input>
				</div>
				<div className="select-and-icon">
					<AccessTimeIcon
						sx={{ color: "white", fontSize: "60px", marginRight: "25px" }}
					/>
					<select onChange={(e) => setHour(e.target.value)}>
						<optgroup label="Hour">
							{hours.map((hour) => (
								<option value={hour}>{hour}</option>
							))}
						</optgroup>
					</select>
				</div>
				<div className="select-and-icon">
					<GradeIcon
						sx={{
							color: "white",
							fontSize: "60px",
							marginRight: "25px",
						}}
					/>
					<select onChange={(e) => setLevel(e.target.value)}>
						<optgroup label="Level">
							{levels.map((level) => (
								<option value={level}>{level}</option>
							))}
						</optgroup>
					</select>
				</div>
				<div
					style={{
						color: "white",
						marginTop: "50px",
						marginBottom: "-100px",
						fontSize: "30px",
						fontWeight: "bold",
					}}
				>
					-- OR --
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

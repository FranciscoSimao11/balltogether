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
import { useParams, useNavigate } from "react-router";
import MapWrapper from "./Map";
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
	let navigate = useNavigate();
	const [date, setDate] = useState<any>("2021-12-31");
	const [startHour, setStartHour] = useState<any>("00:00");
	const [endHour, setEndHour] = useState<any>("24:00");
	const [minLevel, setMinLevel] = useState<any>("0.0");
	const [maxLevel, setMaxLevel] = useState<any>("5.0");
	const [filters, setFilters] = useState<any>({
		date,
		startHour,
		endHour,
		minLevel,
		maxLevel,
	});
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
	useEffect(() => {
		setFilters({ date, startHour, endHour, minLevel, maxLevel });
	}, [date, startHour, endHour, minLevel, maxLevel]);
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

					<input
						className="input-shadow"
						defaultValue="2021-12-31"
						type="date"
						onChange={(e) => setDate(e.target.value)}
					></input>
				</div>
				<div className="select-and-icon">
					<AccessTimeIcon
						sx={{ color: "white", fontSize: "60px", marginRight: "25px" }}
					/>
					<select
						className="input-shadow"
						defaultValue="00:00"
						onChange={(e) => setStartHour(e.target.value)}
						style={{ marginRight: "10px" }}
					>
						<optgroup label="Starting After">
							{hours.map((hour) => (
								<option value={hour}>{hour}</option>
							))}
						</optgroup>
					</select>
					<select
						defaultValue="24:00"
						onChange={(e) => setEndHour(e.target.value)}
					>
						<optgroup label="Starting Before">
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
					<select
						defaultValue="0.0"
						onChange={(e) => setMinLevel(e.target.value)}
						style={{ marginRight: "10px" }}
					>
						<optgroup label="Min Skill Level">
							{levels.map((level) => (
								<option value={level}>{level}</option>
							))}
						</optgroup>
					</select>
					<select
						defaultValue="5.0"
						onChange={(e) => setMaxLevel(e.target.value)}
					>
						<optgroup label="Max Skill Level">
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
				<HostMatchButton
					className="input-shadow"
					onClick={() => {
						navigate("/balltogether/hostmatch");
					}}
				>
					Host Match
				</HostMatchButton>
			</div>
			<MapWrapper mapStyle={mapStyle} filters={filters} interactive={false} />
		</div>
	);
}

export default LoggedInHomepage;

import React, { useEffect, useState } from "react";
import { Button, MenuItem } from "@mui/material";
import "../styles/LoggedInHomepage.css";
import LoggedInTopBar from "./LoggedInTopBar";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
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
/*games.map((game) => <Marker key=id position={{bla bla}}>*/

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

function MapComponent(props: any) {
	const pos = props.position;
	return (
		<GoogleMap
			defaultZoom={8}
			defaultCenter={{ lat: pos.latitude, lng: pos.longitude }}
		>
			<Marker position={{ lat: pos.latitude, lng: pos.longitude }} />
		</GoogleMap>
	);
}

function MapWrapper(props: any) {
	return (
		<WrappedMap
			position={props.position}
			containerElement={
				<div
					style={{
						width: `80%`,
						minWidth: "80%",
						height: `90.7vh`,
						minHeight: "90.7vh",
						marginLeft: `auto`,
						marginRight: `auto`,
						padding: `74px 0px 0px 0`,
						position: `relative`,
						float: "right",
					}}
				></div>
			}
			mapElement={<div style={{ height: `100%` }} />}
			googleMapURL={
				"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
			}
			loadingElement={<div style={{ height: `100%` }} />}
		></WrappedMap>
	);
}

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
	marginTop: "200px",
	marginRight: "15px",
	color: "#242825",
	fontSize: "20px",
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
	const [currentPosition, setPosition] = useState({});
	const [hour, setHour] = useState({});
	const [level, setLevel] = useState({});
	// navigator.geolocation.getCurrentPosition((position) => {
	// 	const positionObject = {
	// 		latitude: position.coords.latitude,
	// 		longitude: position.coords.longitude,
	// 	};
	// 	setPosition(positionObject);
	// });
	useEffect(() => {
		setPosition({
			latitude: 0.0,
			longitude: 0.0,
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
				<HostMatchButton>Host Match</HostMatchButton>
			</div>
			<MapWrapper position={currentPosition} />
		</div>
	);
}

export default LoggedInHomepage;

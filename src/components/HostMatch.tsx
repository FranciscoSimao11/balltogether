import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoggedInTopBar from "./LoggedInTopBar";
import MapWrapper from "./Map";
import "../styles/HostMatch.css";
import { levels, hours } from "../misc/miscFuncs";
import { useSelector } from "react-redux";

const FormTextField = styled(TextField)({
	marginInline: "10px",
	marginBottom: "40px",
	"& label.Mui-focused": {
		color: "white",
	},
	"& label": {
		color: "white",
	},
	"& input": {
		color: "white",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "gray",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
});

const HostMatchButton = styled(Button)({
	color: "white",
	backgroundColor: "black",
	fontSize: "25px",
	padding: "16px 50px 16px 50px",
	marginTop: "60px",
	"&:hover": {
		backgroundColor: "#4b4b4b",
	},
});

function HostMatch() {
	const [location, setLocation] = useState<any>();
	const [nPlayers, setNPlayers] = useState<any>();
	const [date, setDate] = useState<any>();
	const [hour, setHour] = useState<any>();
	const [level, setLevel] = useState<any>();
	const [duration, setDuration] = useState<any>();
	const [description, setDescription] = useState<any>();
	const [finishedCreatingMatch, setFinishedCreatingMatch] = useState(false);
	const mapStyle = {
		width: `70%`,
		minWidth: "70%",
		height: `90.7vh`,
		minHeight: "90.7vh",
		marginLeft: `auto`,
		marginRight: `auto`,
		padding: `74px 0px 0px 0`,
		position: `relative`,
		float: "right",
	};
	const state = useSelector((state) => state);
	const { session } = state as any;

	useEffect(() => {
		if (finishedCreatingMatch) {
			fetch("http://localhost:8000/users/" + session.id, {
				method: "GET",
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					fetch("http://localhost:8000/matches", {
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						method: "POST",
						body: JSON.stringify({
							host: data.name,
							numberOfSpotsLeft: parseInt(nPlayers),
							totalNumberOfPlayers: parseInt(nPlayers),
							date: date,
							startingTime: hour,
							duration: duration,
							skillLevel: level,
							description: description,
							location: {
								name: location,
								latitude: 0,
								longitude: 0,
							},
							blueTeam: [],
							redTeam: [],
						}),
					});
				});
		}
	}, [finishedCreatingMatch]);

	return (
		<div className="hostmatch-wrapper">
			<LoggedInTopBar />

			<div style={{ display: "flex" }}>
				<div className="hostmatch-options-wrapper">
					<h2
						style={{ color: "white", marginBottom: "35px", fontSize: "30px" }}
					>
						Host Match
					</h2>
					<div style={{ display: "grid" }}>
						<label style={{ color: "white" }}>Location: </label>
						<input type="text" onChange={(e) => setLocation(e.target.value)} />
						<label style={{ color: "white" }}>Number of Players: </label>
						<input type="text" onChange={(e) => setNPlayers(e.target.value)} />
						<label style={{ color: "white" }}>Date: </label>
						<input type="date" onChange={(e) => setDate(e.target.value)} />
						<label style={{ color: "white" }}>Starting Time: </label>
						<select onChange={(e) => setHour(e.target.value)}>
							{hours.map((hour) => (
								<option value={hour}>{hour}</option>
							))}
						</select>
						<label style={{ color: "white" }}>Recommended Level: </label>
						<select onChange={(e) => setLevel(e.target.value)}>
							{levels.map((level) => (
								<option value={level}>{level}</option>
							))}
						</select>
						<label style={{ color: "white" }}>Duration: </label>
						<input type="time" onChange={(e) => setDuration(e.target.value)} />
						<label style={{ color: "white" }}>Description: </label>
						<input
							type="text"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<HostMatchButton
						onClick={() => {
							setFinishedCreatingMatch(true);
						}}
					>
						Create Match
					</HostMatchButton>
				</div>
				<MapWrapper mapStyle={mapStyle} />
			</div>
		</div>
	);
}

export default HostMatch;

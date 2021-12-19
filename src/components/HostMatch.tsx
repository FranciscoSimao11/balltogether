import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Alert, Button, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoggedInTopBar from "./LoggedInTopBar";
import MapWrapper from "./Map";
import "../styles/HostMatch.css";
import { levels, hours } from "../misc/miscFuncs";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";

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
	color: "rgb(0, 178, 155)",
	backgroundColor: "black",
	fontSize: "25px",
	padding: "16px 50px 16px 50px",
	marginTop: "30px",
	"&:hover": {
		// color: "black",
		backgroundColor: "#293030",
	},
});

interface markerProps {
	lat: number;
	lng: number;
}

function HostMatch() {
	const [location, setLocation] = useState<any>();
	const [nPlayers, setNPlayers] = useState<any>();
	const [date, setDate] = useState<any>();
	const [hour, setHour] = useState<any>();
	const [level, setLevel] = useState<any>();
	const [duration, setDuration] = useState<any>();
	const [description, setDescription] = useState<any>();
	const [hostPlays, setHostPlays] = useState<any>(false);
	const [finishedCreatingMatch, setFinishedCreatingMatch] = useState(false);
	const [failedCreate, setFailedCreate] = useState(false);
	const [finishedPosting, setFinishedPosting] = useState(false);
	const [infoOpen, setInfoOpen] = useState(false);
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
	const [marker, setMarker] = useState<markerProps>();
	const [failedFields, setFailedFields] = useState<any>([]);

	const state = useSelector((state) => state);
	const { session } = state as any;
	let navigate = useNavigate();
	let rating = 0;

	const addMarkerCallback = useCallback(
		(marker) => {
			setMarker(marker);
		},
		[marker]
	);
	const addLocationNameCallback = useCallback(
		(location) => {
			setLocation(location);
		},
		[location]
	);

	useEffect(() => {
		if (finishedCreatingMatch && marker) {
			let dateArr = date.split("-");
			let actualDate = dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
			if (!hostPlays) {
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
								date: actualDate,
								startingTime: hour,
								duration: duration,
								skillLevel: level,
								description: description,
								finalScore: "",
								location: {
									name: location,
									latitude: marker.lat,
									longitude: marker.lng,
								},
								blueTeam: [],
								redTeam: [],
							}),
						}).then((res) => {
							setFinishedPosting(true);
							setInfoOpen(true);
						});
					});
			} else {
				fetch("http://localhost:8000/users/" + session.id, {
					method: "GET",
				})
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						data.matchHistory.forEach((m: any) => {
							rating += parseFloat(m.rating) / data.matchHistory.length;
						});
						fetch("http://localhost:8000/matches", {
							headers: {
								"Content-Type": "application/json",
								Accept: "application/json",
							},
							method: "POST",
							body: JSON.stringify({
								host: data.name,
								numberOfSpotsLeft: parseInt(nPlayers) - 1,
								totalNumberOfPlayers: parseInt(nPlayers),
								date: actualDate,
								startingTime: hour,
								duration: duration,
								skillLevel: level,
								description: description,
								finalScore: "",
								location: {
									name: location,
									latitude: marker.lat,
									longitude: marker.lng,
								},
								blueTeam: [
									{
										userId: data.id,
										name: data.name,
										avgRating: rating.toFixed(2),
									},
								],
								redTeam: [],
							}),
						})
							.then((res) => {
								setFinishedPosting(true);
								setInfoOpen(true);
								return res.json();
							})
							.then((data) => {
								let id = data.id;
								fetch("http://localhost:8000/users/" + session.id, {
									method: "GET",
								})
									.then((res) => {
										return res.json();
									})
									.then((userData) => {
										fetch("http://localhost:8000/users/" + session.id, {
											headers: {
												"Content-Type": "application/json",
												Accept: "application/json",
											},
											method: "PUT",
											body: JSON.stringify({
												...userData,
												nextMatches: [
													...userData.nextMatches,
													{
														id: id,
														location: location,
														date: date,
														startingTime: hour,
														duration: duration,
														skillLevel: level,
													},
												],
											}),
										});
									});
							});
					});
			}
		}
	}, [finishedCreatingMatch]);

	useEffect(() => {
		if (finishedPosting) {
			setTimeout(() => {
				navigate("/balltogether/home");
			}, 2500);
		}
	}, [finishedPosting]);

	return (
		<div className="hostmatch-wrapper">
			<LoggedInTopBar />
			<div style={{ display: "flex" }}>
				<div className="hostmatch-options-wrapper">
					<h2
						style={{ color: "white", marginBottom: "35px", fontSize: "35px" }}
					>
						Host Match
					</h2>
					<div style={{ display: "grid" }}>
						<label
							style={{
								color: "white",
								fontSize: "20px",
								fontWeight: "bold",
								paddingBottom: "10px",
							}}
						>
							Pick the match location on the map*
						</label>
						<div className="input-separator-wrapper">
							<div className="input-single-label">
								<label style={{ color: "white" }}>Number of Players* </label>
								<input
									className="input-shadow"
									type="number"
									onChange={(e) => setNPlayers(e.target.value)}
									required
								/>
							</div>
							<div className="input-single-label">
								<label style={{ color: "white" }}>Date* </label>
								<input
									className="input-shadow"
									type="date"
									onChange={(e) => setDate(e.target.value)}
									min={new Date().toISOString().split("T")[0]}
									required
								/>
							</div>
						</div>
						<div className="input-separator-wrapper">
							<div className="input-single-label">
								<label style={{ color: "white" }}>Starting Time* </label>
								<input
									className="input-shadow"
									type="time"
									onChange={(e) => setHour(e.target.value)}
									defaultValue={new Date()
										.toTimeString()
										.split(" ")[0]
										.slice(0, -3)}
									required
								/>
							</div>
							<div className="input-single-label">
								<label style={{ color: "white" }}>Recommended Level* </label>
								<select onChange={(e) => setLevel(e.target.value)} required>
									{levels.map((level) => (
										<option value={level}>{level}</option>
									))}
								</select>
							</div>
						</div>
						<div className="input-separator-wrapper">
							<div className="input-single-label">
								<label style={{ color: "white" }}>Duration* </label>
								<input
									className="input-shadow"
									type="time"
									onChange={(e) => setDuration(e.target.value)}
									defaultValue={"00:00"}
									required
								/>
							</div>
							<div className="input-single-label">
								<label style={{ color: "white" }}>Description </label>
								<input
									className="input-shadow"
									type="text"
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
						</div>
						<label style={{ color: "white" }}>
							Will you participate in this match as a player?
						</label>
						<input
							style={{
								placeSelf: "center",
								height: "20px",
								width: "20px",
								boxShadow: "3px 3px rgb(0 178 155 / 60%)",
								borderRadius: "10px",
							}}
							type="checkbox"
							onClick={() => setHostPlays(!hostPlays)}
						/>
					</div>
					<Collapse in={failedCreate}>
						<Alert
							variant="filled"
							severity="error"
							sx={{
								paddingInline: "10px",
								width: "290px",
								margin: "10px",
							}}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setFailedCreate(false);
										setFailedFields([]);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
						>
							Please fill in the mandatory fields:{" "}
							{failedFields.map((field: any) => {
								if (failedFields.at(-1) == field) return field + ".";
								else return field + ", ";
							})}
						</Alert>
					</Collapse>
					<label
						style={{
							color: "white",
							paddingInline: "100px",
						}}
					>
						* = Mandatory fields
					</label>
					<HostMatchButton
						className="input-shadow"
						onClick={() => {
							if (location && date && nPlayers && duration && level && marker) {
								setFinishedCreatingMatch(true);
							} else {
								let localFailed: any = [];
								if (!marker) {
									localFailed.push("Location");
								}
								if (!date) {
									localFailed.push("Date");
								}
								if (!nPlayers) {
									localFailed.push("Number of Players");
								}
								if (!level) {
									localFailed.push("Skill Level");
								}
								if (!duration) {
									localFailed.push("Duration");
								}
								setFailedFields(localFailed);
								setFailedCreate(true);
							}
						}}
					>
						Create Match
					</HostMatchButton>
					<Collapse in={infoOpen}>
						<Alert
							variant="filled"
							severity="success"
							sx={{
								paddingInline: "10px",
								marginTop: "30px",
								width: "300px",
							}}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setInfoOpen(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
						>
							Successfully created match! Redirecting...
						</Alert>
					</Collapse>
				</div>
				<MapWrapper
					mapStyle={mapStyle}
					filters={undefined}
					marker={marker}
					markerCallback={addMarkerCallback}
					interactive={true}
					location={location}
					locationCallback={addLocationNameCallback}
				/>
			</div>
		</div>
	);
}

export default HostMatch;

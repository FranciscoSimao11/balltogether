import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import LoggedInTopBar from "./LoggedInTopBar";
import "../styles/Match.css";
import * as blueTeam from "../misc/BlueTeam.json";
import * as redTeam from "../misc/RedTeam.json";
import PersonIcon from "@mui/icons-material/Person";
import { computeAvg } from "../misc/miscFuncs";
import * as matchesJson from "../misc/Matches.json";
import Popover from "@mui/material/Popover";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const StyledButton = styled(Button)({
	color: "white",
	backgroundColor: "#343f4b",
	fontSize: "23px",
	textTransform: "none",
	fontWeight: "normal",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
	"&:hover": {
		backgroundColor: "#272d35",
	},
	padding: "5px 80px 5px 80px",
	marginTop: "10px",
});

function Match() {
	const [blueAvg, setBlueAvg] = useState("0.0");
	const [redAvg, setRedAvg] = useState("0.0");
	const state = useSelector((state) => state);
	const { session } = state as any;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClickMatchInfo = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMatchInfo = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	let navigate = useNavigate();
	const [alertOpen, setAlertOpen] = React.useState(false);
	let matchId = useParams().matchId;
	const [match, setMatch] = useState<any>();
	const [user, setUser] = useState<any>();
	const [rating, setRating] = useState<any>();
	const [canJoinMatch, setCanJoinMatch] = useState<any>(true);
	const [joiningMatch, setJoiningMatch] = useState<any>(false);
	const [canJoinBlue, setCanJoinBlue] = useState<any>(true);
	const [canJoinRed, setCanJoinRed] = useState<any>(true);
	const getMatch = () => {
		fetch("http://localhost:8000/matches/" + matchId, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMatch(data);
				if (data.blueTeam.length != 0) setBlueAvg(computeAvg(data.blueTeam));
				else setBlueAvg("0.0");
				if (data.redTeam.length != 0) setRedAvg(computeAvg(data.redTeam));
				else setRedAvg("0.0");
			});
	};

	const getCurrentUser = () => {
		fetch("http://localhost:8000/users/" + session.id, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUser(data);
			});
	};

	const joinMatchBlue = () => {
		setCanJoinMatch(false);
		setJoiningMatch(false);
		fetch("http://localhost:8000/matches/" + matchId, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			method: "PUT",
			body: JSON.stringify({
				...match,
				numberOfSpotsLeft: match.numberOfSpotsLeft - 1,
				blueTeam: [
					...match.blueTeam,
					{ userId: user.id, name: user.name, avgRating: rating },
				],
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMatch(data);
				if (data.blueTeam.length != 0) setBlueAvg(computeAvg(data.blueTeam));
				else setBlueAvg("0.0");
				if (data.redTeam.length != 0) setRedAvg(computeAvg(data.redTeam));
				else setRedAvg("0.0");
			});
		addMatchToUser();
	};

	const joinMatchRed = () => {
		setCanJoinMatch(false);
		setJoiningMatch(false);
		fetch("http://localhost:8000/matches/" + matchId, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			method: "PUT",
			body: JSON.stringify({
				...match,
				numberOfSpotsLeft: match.numberOfSpotsLeft - 1,
				redTeam: [
					...match.redTeam,
					{ userId: user.id, name: user.name, avgRating: rating },
				],
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMatch(data);
				if (data.blueTeam.length != 0) setBlueAvg(computeAvg(data.blueTeam));
				else setBlueAvg("0.0");
				if (data.redTeam.length != 0) setRedAvg(computeAvg(data.redTeam));
				else setRedAvg("0.0");
			});
		addMatchToUser();
	};

	const addMatchToUser = () => {
		fetch("http://localhost:8000/users/" + session.id, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			method: "PUT",
			body: JSON.stringify({
				...user,
				nextMatches: [
					...user.nextMatches,
					{
						id: match.id,
						location: match.location.name,
						date: match.date,
						startingTime: match.startingTime,
						duration: match.duration,
						skillLevel: match.skillLevel,
					},
				],
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUser(data);
			});
	};

	const removeMatchFromUser = () => {
		let oldArray = user.nextMatches;
		let matchIndex = -1;
		for (let i = 0; i < oldArray.length; i++) {
			if (oldArray[i].id == match.id) {
				matchIndex = i;
			}
		}
		if (matchIndex != -1) {
			oldArray.splice(matchIndex, 1);
		}

		fetch("http://localhost:8000/users/" + session.id, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			method: "PUT",
			body: JSON.stringify({
				...user,
				nextMatches: oldArray,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUser(data);
			});
	};

	const leaveMatch = () => {
		let oldBlue = match.blueTeam;
		let blueIndex = -1;
		for (let i = 0; i < oldBlue.length; i++) {
			if (oldBlue[i].userId == user.id) {
				blueIndex = i;
			}
		}
		if (blueIndex != -1) {
			oldBlue.splice(blueIndex, 1);
			setCanJoinBlue(true);
		}

		let oldRed = match.redTeam;
		let redIndex = -1;
		for (let i = 0; i < oldRed.length; i++) {
			if (oldRed[i].userId == user.id) {
				redIndex = i;
			}
		}
		if (redIndex != -1) {
			oldRed.splice(redIndex, 1);
			setCanJoinRed(true);
		}
		setCanJoinMatch(true);
		fetch("http://localhost:8000/matches/" + matchId, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			method: "PUT",
			body: JSON.stringify({
				...match,
				numberOfSpotsLeft: match.numberOfSpotsLeft + 1,
				redTeam: oldRed,
				blueTeam: oldBlue,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMatch(data);
				if (data.blueTeam.length != 0) setBlueAvg(computeAvg(data.blueTeam));
				else setBlueAvg("0.0");
				if (data.redTeam.length != 0) setRedAvg(computeAvg(data.redTeam));
				else setRedAvg("0.0");
			});
		removeMatchFromUser();
	};

	useEffect(() => {
		if (matchId) {
			getMatch();
			getCurrentUser();
		}
	}, [matchId]);

	useEffect(() => {
		if (user) {
			let rating = 0;
			user.matchHistory.forEach((m: any) => {
				rating += parseFloat(m.rating) / user.matchHistory.length;
			});
			setRating(rating.toFixed(2));
		}
	}, [user]);

	useEffect(() => {
		if (match) {
			match.redTeam.forEach((p: any) => {
				if (p.userId == session.id) setCanJoinMatch(false);
			});
			if (canJoinMatch) {
				match.blueTeam.forEach((p: any) => {
					if (p.userId == session.id) setCanJoinMatch(false);
				});
			}
			if (match.redTeam.length >= match.totalNumberOfPlayers / 2)
				setCanJoinRed(false);
			if (match.blueTeam.length >= match.totalNumberOfPlayers / 2)
				setCanJoinBlue(false);
		}
	}, [match]);

	return (
		<div className="global-match-wrapper">
			<LoggedInTopBar />
			{match && matchId == match.id && (
				<div className="match-wrapper">
					<div className="team-wrapper" style={{ paddingRight: "200px" }}>
						<h3 className="team-header">Blue Team</h3>
						<div>
							{match.blueTeam.map((p: any) => (
								<div
									className="player-wrapper-blue player-wrapper"
									style={{ cursor: "pointer" }}
									onClick={() => {
										navigate("/balltogether/profile/" + p.userId);
									}}
								>
									<PersonIcon sx={{ fontSize: "40px", padding: "10px" }} />
									<div>{p.name}</div>
								</div>
							))}
							<h3 className="avg-rating-header">Average Rating: {blueAvg}</h3>
						</div>
						{match.finalScore == "" && joiningMatch && canJoinBlue && (
							<StyledButton
								sx={{
									backgroundColor: "#00A6FF",
									"&:hover": {
										backgroundColor: "#005989",
									},

									alignSelf: "center",
									paddingInline: "70px",
								}}
								onClick={() => {
									joinMatchBlue();
								}}
							>
								Join Blue Team
							</StyledButton>
						)}
					</div>

					<div className="match-info-wrapper">
						<h2>Match Details</h2>
						<div>
							<b>Date: </b>
							{match.date}
						</div>
						<div>
							<b>Starting Time: </b>
							{match.startingTime}
						</div>

						<div>
							<b>Location: </b>
							{match.location.name}
						</div>

						<div style={{ display: "inline-flex" }}>
							<b>Score: </b>
							{match.finalScore != "" && (
								<div style={{ paddingLeft: "10px" }}> {match.finalScore}</div>
							)}
							{match.finalScore == "" && (
								<div style={{ paddingLeft: "10px" }}> Match not yet played</div>
							)}
						</div>
						<Collapse in={alertOpen}>
							<Alert
								variant="filled"
								severity="error"
								sx={{
									marginTop: "20px",
									width: "320px",
								}}
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										size="small"
										onClick={() => {
											setAlertOpen(false);
										}}
									>
										<CloseIcon fontSize="inherit" />
									</IconButton>
								}
							>
								Couldn't join match, match is full or you've already joined!
							</Alert>
						</Collapse>
						<div
							style={{
								display: "inline-grid",
								marginBottom: "-50px",
								marginTop: "20px",
							}}
						>
							{match.finalScore == "" && canJoinMatch && (
								<StyledButton
									sx={{
										backgroundColor: "#00ad45",
										"&:hover": {
											backgroundColor: "#007842",
										},
									}}
									onClick={() => {
										match.numberOfSpotsLeft == 0 || canJoinMatch == false
											? setAlertOpen(true)
											: setJoiningMatch(true); //joinMatch();
									}}
								>
									Join Match
								</StyledButton>
							)}
							{match.finalScore == "" && !canJoinMatch && (
								<StyledButton
									sx={{
										backgroundColor: "#e30000",
										"&:hover": {
											backgroundColor: "#7d0000",
										},
									}}
									onClick={() => {
										leaveMatch();
									}}
								>
									Leave Match
								</StyledButton>
							)}

							<StyledButton onClick={handleClickMatchInfo}>
								View Match Info
							</StyledButton>
							<StyledButton>Share Match</StyledButton>
							<StyledButton>Add to Watchlist</StyledButton>
							<StyledButton>Contact Host</StyledButton>
							<Popover
								open={open}
								anchorEl={anchorEl}
								onClose={handleCloseMatchInfo}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
							>
								<Typography sx={{ p: 2 }}>
									<div>
										<b>Match Format: </b>
										{match.totalNumberOfPlayers / 2} v{" "}
										{match.totalNumberOfPlayers / 2}
									</div>
									<div>
										<b>Duration: </b>
										{match.duration}h
									</div>
									<div>
										<b>Description: </b>
										{match.description}
									</div>
									<div>
										<b>Host Name: </b>
										{match.host}
									</div>
								</Typography>
							</Popover>
						</div>
					</div>

					<div className="team-wrapper" style={{ paddingLeft: "200px" }}>
						<h3 className="team-header">Red Team</h3>
						<div>
							{match.redTeam.map((p: any) => (
								<div
									className="player-wrapper-red player-wrapper"
									style={{ cursor: "pointer" }}
									onClick={() => {
										navigate("/balltogether/profile/" + p.userId);
									}}
								>
									<PersonIcon sx={{ fontSize: "40px", padding: "10px" }} />
									<div>{p.name}</div>
								</div>
							))}
							<h3 className="avg-rating-header">Average Rating: {redAvg}</h3>
						</div>
						{match.finalScore == "" && joiningMatch && canJoinRed && (
							<StyledButton
								sx={{
									backgroundColor: "#F95F62",
									"&:hover": {
										backgroundColor: "#a33f41",
									},
									alignSelf: "center",
									paddingInline: "75px",
								}}
								onClick={() => {
									joinMatchRed();
								}}
							>
								Join Red Team
							</StyledButton>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Match;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
	const [selectedPlayer, setSelectedPlayer] = useState({});
	const bluePlayers: any = blueTeam;
	const redPlayers: any = redTeam;
	const [blueAvg, setBlueAvg] = useState(computeAvg(bluePlayers.default));
	const [redAvg, setRedAvg] = useState(computeAvg(redPlayers.default));
	const matches: any = matchesJson;
	const match = matches.default[0];
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClickMatchInfo = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMatchInfo = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const [alertOpen, setAlertOpen] = React.useState(false);
	return (
		<div className="global-match-wrapper">
			<LoggedInTopBar />
			<div className="match-wrapper">
				<div className="team-wrapper" style={{ paddingRight: "200px" }}>
					<h3 className="team-header">Blue Team</h3>
					<div>
						{bluePlayers.default.map((p: any) => (
							<Link
								to="/balltogether/profile"
								style={{ textDecoration: "none", color: "white" }}
							>
								<div className="player-wrapper-blue player-wrapper ">
									<PersonIcon sx={{ fontSize: "40px", padding: "10px" }} />
									<div>{p.playerName}</div>
								</div>
							</Link>
						))}
						<h3 className="avg-rating-header">Average Rating: {blueAvg}</h3>
					</div>
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

					<div>
						<b>Score: </b>Match not yet played
					</div>
					<Collapse in={alertOpen}>
						<Alert
							variant="filled"
							severity="error"
							sx={{
								marginTop: "20px",
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
							Couldn't join match, match is full!
						</Alert>
					</Collapse>
					<div
						style={{
							display: "inline-grid",
							marginBottom: "-50px",
							marginTop: "20px",
						}}
					>
						<StyledButton
							onClick={() => {
								match.numberOfSpotsLeft == 0
									? setAlertOpen(true)
									: console.log("Join Match");
							}}
						>
							Join Match
						</StyledButton>
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
						{redPlayers.default.map((p: any) => (
							<Link
								to="/balltogether/profile"
								style={{ textDecoration: "none", color: "white" }}
							>
								<div className="player-wrapper-red player-wrapper">
									<PersonIcon sx={{ fontSize: "40px", padding: "10px" }} />
									<div>{p.playerName}</div>
								</div>
							</Link>
						))}
						<h3 className="avg-rating-header">Average Rating: {redAvg}</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Match;

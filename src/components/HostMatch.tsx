import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoggedInTopBar from "./LoggedInTopBar";
import MapWrapper from "./Map";
import "../styles/HostMatch.css";

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
	const [currentPosition, setPosition] = useState({});
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

	useEffect(() => {
		setPosition({
			latitude: 38.660988,
			longitude: -9.203319,
		});
	}, []);

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
					<FormTextField label="Location" />
					<FormTextField label="Date" />
					<FormTextField label=" Start Time" />
					<FormTextField label="Number Of Players" />
					<FormTextField label="Expected Skill Level" />
					<FormTextField label="Duration" />
					<FormTextField
						label="Description"
						sx={{ width: "400px", height: "2em" }}
					/>
					<HostMatchButton>Create Match</HostMatchButton>
				</div>
				<MapWrapper position={currentPosition} mapStyle={mapStyle} />
			</div>
		</div>
	);
}

export default HostMatch;

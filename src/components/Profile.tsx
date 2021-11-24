import React from "react";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Profile.css";
import LoggedInTopBar from "./LoggedInTopBar";

function Profile() {
	return (
		<div>
			<LoggedInTopBar />
		</div>
	);
}

export default Profile;

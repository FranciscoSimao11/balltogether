import React from "react";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/LoggedInHomepage.css";
import LoggedInTopBar from "./LoggedInTopBar";

function LoggedInHomepage() {
	return (
		<div>
			<LoggedInTopBar />
		</div>
	);
}

export default LoggedInHomepage;

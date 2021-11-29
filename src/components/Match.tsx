import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoggedInTopBar from "./LoggedInTopBar";

function Match() {
	return (
		<div className="global-container">
			<LoggedInTopBar />
		</div>
	);
}

export default Match;

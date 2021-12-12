import React, { useState } from "react";
import "./App.css";
import { Routes, Route, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";
import TopBar from "./components/TopBar";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import LoggedInHomepage from "./components/LoggedInHomepage";
import Profile from "./components/Profile";
import HostMatch from "./components/HostMatch";
import Match from "./components/Match";

console.log(process.env.REACT_APP_MAP_API_KEY);

function App() {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	const { login, logout } = bindActionCreators(actionCreators, dispatch);
	const { session } = state as any;
	return (
		<div className="App">
			<Routes>
				<Route path="/balltogether/" element={<Homepage />} />
				<Route path="/balltogether/login" element={<Login />} />
				<Route path="/balltogether/register" element={<Register />} />
				<Route path="/balltogether/home" element={<LoggedInHomepage />} />
				<Route path="/balltogether/profile/:userId" element={<Profile />} />
				<Route path="/balltogether/hostmatch" element={<HostMatch />} />
				<Route path="/balltogether/match/:matchId" element={<Match />} />
			</Routes>
		</div>
	);
}

export default App;

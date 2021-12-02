import React, { useState } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams,
} from "react-router-dom";
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

function App() {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	const { login, logout } = bindActionCreators(actionCreators, dispatch);
	const { session } = state as any;
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/balltogether/home" exact>
						<LoggedInHomepage />
					</Route>
					<Route path="/balltogether/register" exact>
						<Register />
					</Route>
					<Route path="/balltogether/login" exact>
						<Login />
					</Route>
					<Route path={"/balltogether/profile"} exact>
						<Profile />
					</Route>
					<Route path="/balltogether/hostmatch" exact>
						<HostMatch />
					</Route>
					<Route path="/balltogether/match" exact>
						<Match />
					</Route>
					<Route path="/balltogether/" exact>
						<Homepage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

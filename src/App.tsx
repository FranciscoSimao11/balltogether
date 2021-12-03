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
					<Route path="/balltogether/home" component={LoggedInHomepage} exact />
					<Route path="/balltogether/register" component={Register} exact />
					<Route path="/balltogether/login" component={Login} exact />
					<Route
						path="/balltogether/profile/:userId"
						component={Profile}
						exact
					/>
					<Route path="/balltogether/hostmatch" component={HostMatch} exact />
					<Route path="/balltogether/match" component={Match} exact />
					<Route path="/balltogether/" component={Homepage} exact />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

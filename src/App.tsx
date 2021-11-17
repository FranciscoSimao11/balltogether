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
import TopBar from "./components/TopBar";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import LoggedInHomepage from "./components/LoggedInHomepage";

function App() {
	const [display, setDisplay] = useState("inline");

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
					<Route path="/balltogether/" exact>
						<Homepage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

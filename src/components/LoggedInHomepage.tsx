import React from "react";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/LoggedInHomepage.css";
import LoggedInTopBar from "./LoggedInTopBar";
import { compose, withProps } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

const MyMapComponent = compose(
	withProps({
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: (
			<div
				style={{
					width: `50%`,
					height: `80vh`,
					marginLeft: `auto`,
					marginRight: `auto`,
					padding: `74px 0 0 0`,
					position: `relative`,
				}}
			/>
		),
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap
)((props) => (
	<GoogleMap defaultZoom={8} defaultCenter={{ lat: 38.66843, lng: -9.19011 }}>
		<Marker position={{ lat: 38.66843, lng: -9.19011 }} />
	</GoogleMap>
));

function LoggedInHomepage() {
	return (
		<div>
			<LoggedInTopBar />
			<MyMapComponent />
		</div>
	);
}

export default LoggedInHomepage;

/*import React from "react";
import { compose, withProps } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

const MyMapComponent = compose(
	withProps({
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap
)((props) => (
	<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
		(
		<Marker position={{ lat: -34.397, lng: 150.644 }} />)
	</GoogleMap>
));

class MyFancyComponent extends React.PureComponent {
	state = {
		isMarkerShown: false,
	};

	componentDidMount() {
		this.delayedShowMarker();
	}

	delayedShowMarker = () => {
		setTimeout(() => {
			this.setState({ isMarkerShown: true });
		}, 3000);
	};

	handleMarkerClick = () => {
		this.setState({ isMarkerShown: false });
		this.delayedShowMarker();
	};

	render() {
		return <MyMapComponent />;
	}
}

export default MyFancyComponent;*/

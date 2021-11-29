import React, { useEffect, useState } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from "react-google-maps";
import ball from "../ball.png";
import Button from "@mui/material/Button";
import { textAlign } from "@mui/system";
import { styled } from "@mui/material/styles";

const MatchDetailsButton = styled(Button)({
	color: "white",
	backgroundColor: "black",
	fontSize: "10px",
	padding: "5px 20px 5px 20px",
	"&:hover": {
		backgroundColor: "#4b4b4b",
	},
});

function createDynamicURL(matchId: string) {
	return "http://localhost:3000/balltogether/match/" + matchId;
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

function MapComponent(props: any) {
	const pos = props.position;
	const matches: {
		host: string;
		numberOfSpotsLeft: number;
		description: string;
		skillLevel: string;
		duration: number;
		date: string;
		location: { name: string; latitude: number; longitude: number };
	}[] = props.matches;
	const [selectedMatch, setSelectedMatch] = useState<any>(undefined);
	console.log(selectedMatch);

	return (
		<GoogleMap
			defaultZoom={13}
			defaultCenter={{ lat: pos.latitude, lng: pos.longitude }}
		>
			{matches.map((m) => (
				<Marker
					key={m.host}
					position={{ lat: m.location.latitude, lng: m.location.longitude }}
					icon={{
						url: ball,
					}}
					onClick={() => {
						setSelectedMatch(m);
					}}
				></Marker>
			))}
			{selectedMatch && (
				<InfoWindow
					position={{
						lat: selectedMatch.location.latitude,
						lng: selectedMatch.location.longitude,
					}}
					onCloseClick={() => {
						setSelectedMatch(undefined);
					}}
				>
					<div>
						<h2>{selectedMatch.location.name}</h2>
						<div style={{ textAlign: "center" }}>
							<div style={{ textAlign: "left", marginBottom: "10px" }}>
								<b>Date: </b>
								{selectedMatch.date} <br />
								<b>Starting Time: </b>
								{selectedMatch.startingTime}h <br />
								<b>Duration: </b>
								{selectedMatch.duration}h <br />
								<b>Number of Spots left: </b>
								{selectedMatch.numberOfSpotsLeft}
								<br />
								<b>Skil Level: </b>
								{selectedMatch.skillLevel} <br />
								<b>Host Name: </b>
								{selectedMatch.host} <br />
								<b>Description: </b>
								{selectedMatch.description} <br />
							</div>
							<a
								href="javascript:window.location=createDynamicURL(selectedMatch.location.name);"
								//nao sei, ele nao me deixa usar os links do router...
								style={{ textDecoration: "none" }}
							>
								<MatchDetailsButton>View Match</MatchDetailsButton>
							</a>
						</div>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
}

export default function MapWrapper(props: any) {
	return (
		<WrappedMap
			position={props.position}
			matches={props.matches.default}
			containerElement={<div style={props.mapStyle}></div>}
			mapElement={<div style={{ height: `100%` }} />}
			googleMapURL={
				"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
			}
			loadingElement={<div style={{ height: `100%` }} />}
		/>
	);
}

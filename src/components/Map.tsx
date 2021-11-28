import React, { useEffect, useState } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from "react-google-maps";
import ball from "../ball.png";

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
	const [selectedMatch, setSelectedMatch] = useState<any>(null);
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
						setSelectedMatch(null);
					}}
				>
					<div></div>
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
		></WrappedMap>
	);
}

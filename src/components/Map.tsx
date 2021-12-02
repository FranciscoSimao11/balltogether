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
import { styled } from "@mui/material/styles";
import mapStyles from "../styles/mapStyles";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

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
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 38.660988, lng: () => -9.203319 },
			radius: 100 * 1000,
		},
	});
	const [location, setLocation] = useState({ lat: 38.660988, lng: -9.203319 });
	return (
		<div>
			<div
				style={{
					position: "absolute",
					zIndex: 10,
					transform: "translateY(-89vh) translateX(70vh)",
					height: "33px",
				}}
			>
				<Combobox
					onSelect={async (address) => {
						try {
							const results = await getGeocode({ address });
							const { lat, lng } = await getLatLng(results[0]);
							setLocation({ lat, lng });
							console.log(location);
						} catch (error) {
							console.log("error");
						}
					}}
				>
					<ComboboxInput
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						placeholder="search"
						style={{ height: "33px", width: "300px", fontSize: "18px" }}
					></ComboboxInput>
					<ComboboxPopover>
						{data.map(({ id, description }) => (
							<ComboboxOption key={id} value={description}></ComboboxOption>
						))}
					</ComboboxPopover>
				</Combobox>
			</div>
			<GoogleMap
				defaultZoom={13}
				defaultCenter={{ lat: location.lat, lng: location.lng }}
				defaultOptions={{ styles: mapStyles }}
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
									<b>Starting: </b>
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
		</div>
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
				"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
			}
			loadingElement={<div style={{ height: `100%` }} />}
		/>
	);
}

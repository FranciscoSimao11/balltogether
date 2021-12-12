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
import { useParams, useNavigate } from "react-router";

const MatchDetailsButton = styled(Button)({
	color: "white",
	backgroundColor: "black",
	fontSize: "10px",
	padding: "5px 20px 5px 20px",
	"&:hover": {
		backgroundColor: "#4b4b4b",
	},
});

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

function filterMatches(match: any, filters: any) {
	if (filters == undefined) {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		var matchDate = match.date.split("/");
		if (matchDate[2] >= year) {
			if (matchDate[1] >= month) {
				if (matchDate[0] >= day) {
					return true;
				}
			}
		}
		return false;
	} else {
		let filterDate = filters.date.split("-");
		let actualDate = filterDate[2] + "/" + filterDate[1] + "/" + filterDate[0];
		return (
			match.date == actualDate &&
			parseInt(match.startingTime.split(":", 1)[0]) >=
				parseInt(filters.startHour.split(":", 1)[0]) &&
			parseInt(match.startingTime.split(":", 1)[0]) <=
				parseInt(filters.endHour.split(":", 1)[0]) &&
			parseInt(match.skillLevel) >= parseInt(filters.minLevel) &&
			parseInt(match.skillLevel) <= parseInt(filters.maxLevel)
		);
	}
}

function MapComponent(props: any) {
	const [matches, setMatches] = useState<
		{
			host: string;
			numberOfSpotsLeft: number;
			description: string;
			skillLevel: string;
			duration: number;
			date: string;
			location: { name: string; latitude: number; longitude: number };
		}[]
	>();
	useEffect(() => {
		fetch("http://localhost:8000/matches/", {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMatches(data.filter((v: any) => filterMatches(v, props.filters)));
			});
	}, [props]);

	const [selectedMatch, setSelectedMatch] = useState<any>(undefined);
	let navigate = useNavigate();
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
	interface coords {
		lat: number;
		lng: number;
	}
	const [location, setLocation] = useState<coords>({
		lat: 38.660988,
		lng: -9.203319,
	});
	const [center, setCenter] = useState<any>({
		lat: 38.660988,
		lng: -9.203319,
	});
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}, []);
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
						setValue(address, false);
						clearSuggestions();
						try {
							const results = await getGeocode({ address });
							const { lat, lng } = await getLatLng(results[0]);
							setLocation({ lat, lng });
							setCenter({ lat, lng });
							props.locationCallback(address);
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
						placeholder="Search"
						style={{
							height: "33px",
							width: "300px",
							fontSize: "18px",
							outline: "none",
							border: "none",
							color: "black",
							appearance: "none",
						}}
					></ComboboxInput>
					<ComboboxPopover>
						{data.map(({ id, description }) => (
							<ComboboxOption key={id} value={description}></ComboboxOption>
						))}
					</ComboboxPopover>
				</Combobox>
			</div>
			{matches && location && (
				<GoogleMap
					defaultZoom={16}
					center={{ lat: center.lat, lng: center.lng }}
					defaultOptions={{ styles: mapStyles }}
					onClick={(e) => {
						if (props.interactive) {
							props.markerCallback({
								lat: e.latLng.lat(),
								lng: e.latLng.lng(),
							});
							setCenter({
								lat: e.latLng.lat(),
								lng: e.latLng.lng(),
							});
						}
					}}
				>
					{props.marker && (
						<Marker
							position={{
								lat: props.marker.lat,
								lng: props.marker.lng,
							}}
						></Marker>
					)}
					{matches.map((m) => (
						<Marker
							key={m.host}
							position={{
								lat: m.location.latitude,
								lng: m.location.longitude,
							}}
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

									<MatchDetailsButton
										onClick={() => {
											navigate("/balltogether/match/" + selectedMatch.id);
										}}
									>
										View Match
									</MatchDetailsButton>
								</div>
							</div>
						</InfoWindow>
					)}
				</GoogleMap>
			)}
		</div>
	);
}

export default function MapWrapper(props: any) {
	return (
		<WrappedMap
			position={props.position}
			marker={props.marker}
			markerCallback={props.markerCallback}
			location={props.location}
			locationCallback={props.locationCallback}
			interactive={props.interactive}
			filters={props.filters}
			containerElement={<div style={props.mapStyle}></div>}
			mapElement={<div style={{ height: `100%` }} />}
			googleMapURL={
				"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" +
				process.env.REACT_APP_MAP_API_KEY
			}
			loadingElement={<div style={{ height: `100%` }} />}
		/>
	);
}

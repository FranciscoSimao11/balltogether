import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import LoggedInTopBar from "./LoggedInTopBar";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { SocialIcon } from "react-social-icons";
import { processRating } from "../misc/miscFuncs";

function Rating() {
	const [rating, setRating] = useState("3.5");
	const stars = processRating(rating);
	console.log(stars);
	Array(stars.filledStars).map((s) => console.log("cona"));

	return (
		<div style={{ textAlign: "center" }}>
			<h2 style={{ fontSize: "30px", marginBottom: "0px" }}>mesi</h2>
			<div style={{ display: "inline-flex", alignItems: "center" }}>
				<h3 style={{ marginRight: "10px" }}>{rating}</h3>
				{Array(stars.filledStars)
					.fill("")
					.map((star: any) => (
						<StarIcon style={{ marginRight: "-3px" }}></StarIcon>
					))}
				{Array(stars.halfStars)
					.fill("")
					.map((star: any) => (
						<StarHalfIcon style={{ marginRight: "-3px" }}></StarHalfIcon>
					))}
				{Array(stars.emptyStars)
					.fill("")
					.map((star: any) => (
						<StarOutlineIcon style={{ marginRight: "-3px" }}></StarOutlineIcon>
					))}
			</div>
			<div>
				<SocialIcon
					url="https://twitter.com/SimonsFooties"
					style={{ width: "40px", height: "40px", marginRight: "4px" }}
				></SocialIcon>
				<SocialIcon
					url="https://www.instagram.com/_francisco__11_/"
					style={{ width: "40px", height: "40px", marginRight: "4px" }}
				></SocialIcon>
				<SocialIcon
					url="https://www.facebook.com/francisco.simoes11/"
					style={{ width: "40px", height: "40px", marginRight: "4px" }}
				></SocialIcon>
				<SocialIcon
					url="https://web.whatsapp.com/"
					style={{ width: "40px", height: "40px", marginRight: "4px" }}
				></SocialIcon>
			</div>
		</div>
	);
}

function Profile() {
	return (
		<div>
			<LoggedInTopBar />
			<div className="profile-layer">
				<div className="avatar-container">
					<img
						className="avatar"
						src="https://img.ifunny.co/images/0d5040be4bea18fdd870d186883a1cec97399d24ea9598e261c1661532bcd4c5_1.webp"
					></img>
				</div>
				<div className="player-info-container">
					<Rating></Rating>
					<div id="parallelogram"></div>
				</div>
			</div>
		</div>
	);
}

export default Profile;

import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import LoggedInTopBar from "./LoggedInTopBar";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { SocialIcon } from "react-social-icons";
import { processRating } from "../misc/miscFuncs";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ShareIcon from "@mui/icons-material/Share";
import FlagIcon from "@mui/icons-material/Flag";
import PropTypes from "prop-types";
import { Tab, Tabs, Box, Typography, Popover, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";

function Rating(props: any) {
	const { name, rating, socialMedia } = props;
	const [ratingAvg, setRatingAvg] = useState<any>();
	const stars = processRating(rating);
	useEffect(() => {
		setRatingAvg(null);
	}, [props]);
	useEffect(() => {
		if (props && !ratingAvg) {
			setRatingAvg(props.rating);
		}
	}, [props, ratingAvg]);
	return (
		<div style={{ textAlign: "center" }}>
			<h2
				style={{
					marginTop: "45px",
					marginBottom: "0px",
					fontWeight: "lighter",
					width: "200px",
				}}
			>
				{name}
			</h2>
			{ratingAvg && (
				<div style={{ display: "inline-flex", alignItems: "center" }}>
					<h3 style={{ marginRight: "10px" }}>{ratingAvg}</h3>
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
							<StarOutlineIcon
								style={{ marginRight: "-3px" }}
							></StarOutlineIcon>
						))}
				</div>
			)}
			<div>
				{socialMedia.map((s: any) => (
					<SocialIcon
						url={s}
						style={{ width: "40px", height: "40px", marginRight: "4px" }}
					></SocialIcon>
				))}
			</div>
		</div>
	);
}

function TabPanel(props: any) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const StyledTabs = styled((props: any) => (
	<Tabs
		{...props}
		TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
	/>
))({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	"& .MuiTabs-indicatorSpan": {
		maxWidth: 90,
		height: "5px",
		marginTop: "-0.6px",
		width: "100%",
		backgroundColor: "#242825",
	},
});

const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: "none",
		fontWeight: "normal",
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(3),
		width: "170px",
		color: "black",
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		"&.Mui-selected": {
			color: "black",
			backgroundColor: "rgba(255, 255, 255, 1)",
		},
		"&.Mui-focusVisible": {
			backgroundColor: "rgba(100, 95, 228, 0.32)",
		},
	})
);

function ProfileTabMenu(props: any) {
	const [value, setValue] = React.useState(0);
	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};
	const { nextMatches, matchHistory, watchlist, friends } = props;
	let navigate = useNavigate();

	return (
		<Box
			sx={{
				width: "100%",
				marginTop: "-48px",
			}}
		>
			<Box sx={{ marginLeft: "70px" }}>
				<StyledTabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<StyledTab label="Matches" {...a11yProps(0)} />
					<StyledTab label="Match History" {...a11yProps(1)} />
					<StyledTab label="Watchlist" {...a11yProps(2)} />
					<StyledTab label="Friends" {...a11yProps(3)} />
				</StyledTabs>
			</Box>
			<Box sx={{ backgroundColor: "#343F4B", width: "100%", height: "446px" }}>
				<TabPanel value={value} index={0}>
					{nextMatches.map((m: any) => (
						<div className="profile-match-container">
							<b>Location: </b>
							{m.location} <br />
							<b>Date: </b>
							{m.date} <br />
							<b>Starting Time: </b>
							{m.startingTime}
							<br />
							<b>Duration: </b>
							{m.duration}h
							<br />
							<b>Skill Level: </b>
							{m.skillLevel}
							<br />
						</div>
					))}
				</TabPanel>
				<TabPanel value={value} index={1}>
					{matchHistory.map((m: any) => (
						<div className="profile-match-container">
							<b>Location: </b>
							{m.location} <br />
							<b>Date: </b>
							{m.date} <br />
							<b>Final Score: </b>
							{m.finalScore} <br />
							<b>Rating: </b>
							{m.rating} <br />
						</div>
					))}
				</TabPanel>
				<TabPanel value={value} index={2}></TabPanel>
				<TabPanel value={value} index={3}>
					<div className="profile-friends-container">
						{friends.map((f: any) => (
							<div className="profile-friend-container">
								<img className="friend-avatar" src={f.avatar} />
								{f.name}
								<Button
									onClick={() => {
										navigate("/balltogether/profile/" + f.userId);
									}}
								>
									View Profile
								</Button>
							</div>
						))}
					</div>
				</TabPanel>
			</Box>
		</Box>
	);
}

function Profile() {
	const [anchorEl1, setAnchorEl1] = React.useState(null);
	const handlePopoverOpen1 = (event: any) => {
		setAnchorEl1(event.currentTarget);
	};
	const handlePopoverClose1 = () => {
		setAnchorEl1(null);
	};
	const open1 = Boolean(anchorEl1);

	const [anchorEl2, setAnchorEl2] = React.useState(null);
	const handlePopoverOpen2 = (event: any) => {
		setAnchorEl2(event.currentTarget);
	};
	const handlePopoverClose2 = () => {
		setAnchorEl2(null);
	};
	const open2 = Boolean(anchorEl2);

	const [anchorEl3, setAnchorEl3] = React.useState(null);
	const handlePopoverOpen3 = (event: any) => {
		setAnchorEl3(event.currentTarget);
	};
	const handlePopoverClose3 = () => {
		setAnchorEl3(null);
	};
	const open3 = Boolean(anchorEl3);

	const [anchorEl4, setAnchorEl4] = React.useState(null);
	const handlePopoverOpen4 = (event: any) => {
		setAnchorEl4(event.currentTarget);
	};
	const handlePopoverClose4 = () => {
		setAnchorEl4(null);
	};
	const open4 = Boolean(anchorEl4);
	let userId = useParams().userId;
	let navigate = useNavigate();
	const state = useSelector((state) => state);
	const { session } = state as any;
	var rating = 0;
	const [user, setUser] = useState<any>();
	const [ratingStr, setRating] = useState<any>();
	const getUser = () => {
		fetch("http://localhost:8000/users/" + userId, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUser(data);
			});
	};
	useEffect(() => {
		if (userId) {
			getUser();
		}
	}, [userId]);

	useEffect(() => {
		if (user) {
			user.matchHistory.forEach((m: any) => {
				rating += parseFloat(m.rating) / user.matchHistory.length;
			});
			setRating(rating.toFixed(2));
		}
	}, [user, userId]);

	return (
		<div>
			<LoggedInTopBar />
			{user && user.id == userId && ratingStr && (
				<div>
					<div className="profile-layer">
						<div className="avatar-container">
							<img className="avatar" src={user.avatar} />
						</div>
						<div className="player-info-container">
							<Rating
								name={user.name}
								rating={ratingStr}
								socialMedia={user.socialMedia}
							/>
						</div>
						<div id="trapezoid" />
						<div className="profile-options-container">
							<Typography
								onMouseEnter={handlePopoverOpen1}
								onMouseLeave={handlePopoverClose1}
							>
								<ChatIcon
									sx={{
										width: "40px",
										height: "40px",
										color: "rgba(170, 170, 170, 1)",
										"&:hover": {
											color: "rgba(250, 250, 250, 1)",
										},
									}}
								></ChatIcon>
							</Typography>
							<Popover
								id="mouse-over-popover"
								sx={{
									pointerEvents: "none",
								}}
								open={open1}
								anchorEl={anchorEl1}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								onClose={handlePopoverClose1}
								disableRestoreFocus
							>
								<Typography sx={{ p: 1 }}>Chat</Typography>
							</Popover>
							<Typography
								onMouseEnter={handlePopoverOpen2}
								onMouseLeave={handlePopoverClose2}
							>
								<PersonAddIcon
									sx={{
										width: "40px",
										height: "40px",
										color: "rgba(170, 170, 170, 1)",
										"&:hover": {
											color: "rgba(250, 250, 250, 1)",
										},
									}}
								></PersonAddIcon>
							</Typography>
							<Popover
								id="mouse-over-popover"
								sx={{
									pointerEvents: "none",
								}}
								open={open2}
								anchorEl={anchorEl2}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								onClose={handlePopoverClose2}
								disableRestoreFocus
							>
								<Typography sx={{ p: 1 }}>Add Friend</Typography>
							</Popover>
							<Typography
								onMouseEnter={handlePopoverOpen3}
								onMouseLeave={handlePopoverClose3}
							>
								<ShareIcon
									sx={{
										width: "40px",
										height: "40px",
										color: "rgba(170, 170, 170, 1)",
										"&:hover": {
											color: "rgba(250, 250, 250, 1)",
										},
									}}
								></ShareIcon>
							</Typography>
							<Popover
								id="mouse-over-popover"
								sx={{
									pointerEvents: "none",
								}}
								open={open3}
								anchorEl={anchorEl3}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								onClose={handlePopoverClose3}
								disableRestoreFocus
							>
								<Typography sx={{ p: 1 }}>Share Profile</Typography>
							</Popover>
							<Typography
								onMouseEnter={handlePopoverOpen4}
								onMouseLeave={handlePopoverClose4}
							>
								<FlagIcon
									sx={{
										width: "40px",
										height: "40px",
										color: "rgba(170, 170, 170, 1)",
										"&:hover": {
											color: "rgba(250, 250, 250, 1)",
										},
									}}
								></FlagIcon>
							</Typography>
							<Popover
								id="mouse-over-popover"
								sx={{
									pointerEvents: "none",
								}}
								open={open4}
								anchorEl={anchorEl4}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								onClose={handlePopoverClose4}
								disableRestoreFocus
							>
								<Typography sx={{ p: 1 }}>Report Profile</Typography>
							</Popover>
						</div>
					</div>
					<ProfileTabMenu
						nextMatches={user.nextMatches}
						matchHistory={user.matchHistory}
						watchlist={user.watchlist}
						friends={user.friends}
					/>
				</div>
			)}
		</div>
	);
}

export default Profile;

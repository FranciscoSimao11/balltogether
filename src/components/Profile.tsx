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
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";
import {
	Tab,
	Tabs,
	Box,
	Typography,
	Popover,
	Button,
	Modal,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";

const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

function Rating(props: any) {
	const { name, rating, socialMedia, position } = props;
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
		<div
			style={{
				textAlign: "center",
				marginTop: "-14px" /*margem top para posiçao*/,
			}}
		>
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
			{position != "" && (
				<div
					style={{
						marginTop: "8px",
						marginBottom: "-10px",
						fontWeight: "lighter",
					}}
				>
					{props.position}
				</div>
			)}
			{position == "" && (
				<div
					style={{
						marginTop: "8px",
						marginBottom: "-10px",
						fontWeight: "lighter",
					}}
				>
					No Preferred Position
				</div>
			)}

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
					<div className="profile-matches-container">
						{nextMatches.map((m: any) => (
							<div className="test">
								<div className="profile-match-text-wrapper">
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
								<Button
									sx={{
										color: "rgb(0, 178, 155)",
										backgroundColor: "#242825",
										height: "min-content",
										alignSelf: "center",
										fontSize: "14px",
										"&:hover": {
											backgroundColor: "rgb(0, 178, 155)",
											color: "#242825",
										},
									}}
									onClick={() => {
										navigate("/balltogether/match/" + m.id);
									}}
								>
									View Match
								</Button>
							</div>
						))}
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					{matchHistory.map((m: any) => (
						<div className="profile-match-container">
							<div className="profile-match-text-wrapper">
								<b>Location: </b>
								{m.location} <br />
								<b>Date: </b>
								{m.date} <br />
								<b>Final Score: </b>
								{m.finalScore} <br />
								<b>Rating: </b>
								{m.rating} <br />
							</div>
							<Button
								sx={{
									color: "rgb(0, 178, 155)",
									backgroundColor: "#242825",
									height: "min-content",
									alignSelf: "center",
									fontSize: "14px",
									"&:hover": {
										backgroundColor: "rgb(0, 178, 155)",
										color: "#242825",
									},
								}}
								onClick={() => {
									navigate("/balltogether/match/" + m.id);
								}}
							>
								View Match
							</Button>
						</div>
					))}
				</TabPanel>
				<TabPanel value={value} index={2}></TabPanel>
				<TabPanel value={value} index={3}>
					<div className="profile-friends-container">
						{friends.map((f: any) => (
							<div className="profile-friend-container">
								<div className="profile-single-container">
									<img className="friend-avatar" src={f.avatar} />
									{f.name}
								</div>
								<Button
									sx={{
										color: "rgb(0, 178, 155)",
										backgroundColor: "#242825",
										height: "min-content",
										alignSelf: "center",
										fontSize: "14px",
										"&:hover": {
											backgroundColor: "rgb(0, 178, 155)",
											color: "#242825",
										},
									}}
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
	let userId = useParams().userId;
	let navigate = useNavigate();
	const state = useSelector((state) => state);
	const { session } = state as any;
	var rating = 0;
	const [user, setUser] = useState<any>();
	const [ratingStr, setRating] = useState<any>();
	const [open, setOpen] = React.useState(false);
	const [position, setPosition] = useState("");
	const [avatar, setAvatar] = useState("");
	const [addingFriend, setAddingFriend] = useState(false);
	const [removingFriend, setRemovingFriend] = useState(false);
	const [isFriend, setIsFriend] = useState(false);
	const handleOpenModal = () => setOpen(true);
	const handleCloseModal = () => setOpen(false);

	const getUser = () => {
		fetch("http://localhost:8000/users/" + userId, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUser(data);
				if (userId != session.id) {
					setIsFriend(false);
					data.friends.forEach((f: any) => {
						if (f.userId == session.id) {
							setIsFriend(true);
						}
					});
				}
			});
	};

	const addFriend = () => {
		fetch("http://localhost:8000/users/" + session.id, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				let newFriendsOtherUser = user.friends;
				newFriendsOtherUser.push({
					userId: data.id,
					name: data.name,
					avatar: data.avatar,
				});
				let newFriendsCurrentUser = data.friends;
				newFriendsCurrentUser.push({
					userId: user.id,
					name: user.name,
					avatar: user.avatar,
				});

				fetch("http://localhost:8000/users/" + userId, {
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					method: "PUT",
					body: JSON.stringify({
						...user,
						friends: newFriendsOtherUser,
					}),
				}).then((res) => {
					fetch("http://localhost:8000/users/" + session.id, {
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						method: "PUT",
						body: JSON.stringify({
							...data,
							friends: newFriendsCurrentUser,
						}),
					});
					setAddingFriend(false);
					setIsFriend(true);
				});
			});
	};

	const removeFriend = () => {
		fetch("http://localhost:8000/users/" + session.id, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				let newFriendsOtherUser = user.friends;
				let index = -1;
				for (let i = 0; i < newFriendsOtherUser.length; i++) {
					if (newFriendsOtherUser[i].userId == data.id) {
						index = i;
					}
				}
				if (index != -1) {
					newFriendsOtherUser.splice(index, 1);
				}

				let newFriendsCurrentUser = data.friends;
				let newIndex = -1;
				for (let i = 0; i < newFriendsCurrentUser.length; i++) {
					if (newFriendsCurrentUser[i].userId == user.id) {
						newIndex = i;
					}
				}

				if (newIndex != -1) {
					newFriendsCurrentUser.splice(newIndex, 1);
				}

				fetch("http://localhost:8000/users/" + userId, {
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					method: "PUT",
					body: JSON.stringify({
						...user,
						friends: newFriendsOtherUser,
					}),
				}).then((res) => {
					fetch("http://localhost:8000/users/" + session.id, {
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						method: "PUT",
						body: JSON.stringify({
							...data,
							friends: newFriendsCurrentUser,
						}),
					});
					setRemovingFriend(false);
					setIsFriend(false);
				});
			});
	};

	useEffect(() => {
		if (addingFriend) addFriend();
	}, [addingFriend]);

	useEffect(() => {
		if (removingFriend) removeFriend();
	}, [removingFriend]);

	useEffect(() => {
		if (avatar != "" && position != "") {
			fetch("http://localhost:8000/users/" + userId, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				method: "PUT",
				body: JSON.stringify({
					...user,
					avatar: avatar,
					preferredPosition: position,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setUser(data);
					user.friends.forEach((f: any) => {
						fetch("http://localhost:8000/users/" + f.userId, {
							method: "GET",
						})
							.then((res) => {
								return res.json();
							})
							.then((dataF) => {
								let newFriends = dataF.friends;
								let friend;
								for (let i = 0; i < newFriends.length; i++) {
									if (newFriends[i].userId == user.id) {
										friend = newFriends[i];
										newFriends[i] = {
											userId: friend.userId,
											name: friend.name,
											avatar: avatar,
										};
									}
								}
								fetch("http://localhost:8000/users/" + f.userId, {
									headers: {
										"Content-Type": "application/json",
										Accept: "application/json",
									},
									method: "PUT",
									body: JSON.stringify({
										...dataF,
										friends: [...newFriends],
									}),
								});
							});
					});
				});
		} else if (avatar != "") {
			fetch("http://localhost:8000/users/" + userId, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				method: "PUT",
				body: JSON.stringify({
					...user,
					avatar: avatar,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setUser(data);
					user.friends.forEach((f: any) => {
						fetch("http://localhost:8000/users/" + f.userId, {
							method: "GET",
						})
							.then((res) => {
								return res.json();
							})
							.then((dataF) => {
								let newFriends = dataF.friends;
								let friend;
								for (let i = 0; i < newFriends.length; i++) {
									if (newFriends[i].userId == user.id) {
										friend = newFriends[i];
										newFriends[i] = {
											userId: friend.userId,
											name: friend.name,
											avatar: avatar,
										};
									}
								}
								fetch("http://localhost:8000/users/" + f.userId, {
									headers: {
										"Content-Type": "application/json",
										Accept: "application/json",
									},
									method: "PUT",
									body: JSON.stringify({
										...dataF,
										friends: [...newFriends],
									}),
								});
							});
					});
				});
		} else if (position != "") {
			fetch("http://localhost:8000/users/" + userId, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				method: "PUT",
				body: JSON.stringify({
					...user,
					preferredPosition: position,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setUser(data);
				});
		}
	}, [avatar, position]);

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
								position={user.preferredPosition}
							/>
						</div>
						<div id="trapezoid" />
						<div className="profile-options-container">
							{userId != session.id && (
								<div style={{ height: "100%", display: "contents" }}>
									<Typography>
										{!isFriend && (
											<PersonAddIcon
												sx={{
													width: "40px",
													height: "40px",
													color: "rgba(170, 170, 170, 1)",
													"&:hover": {
														color: "rgba(250, 250, 250, 1)",
													},
													cursor: "pointer",
												}}
												onClick={() => {
													setAddingFriend(true);
												}}
											></PersonAddIcon>
										)}
										{isFriend && (
											<PersonRemoveIcon
												sx={{
													width: "40px",
													height: "40px",
													color: "rgba(170, 170, 170, 1)",
													"&:hover": {
														color: "rgba(250, 250, 250, 1)",
													},
													cursor: "pointer",
												}}
												onClick={() => {
													setRemovingFriend(true);
												}}
											></PersonRemoveIcon>
										)}
									</Typography>
									<Typography>
										<ChatIcon
											sx={{
												width: "40px",
												height: "40px",
												color: "rgba(170, 170, 170, 1)",
												"&:hover": {
													color: "rgba(250, 250, 250, 1)",
												},
												cursor: "pointer",
											}}
										></ChatIcon>
									</Typography>
									<Typography>
										<ShareIcon
											sx={{
												width: "40px",
												height: "40px",
												color: "rgba(170, 170, 170, 1)",
												"&:hover": {
													color: "rgba(250, 250, 250, 1)",
												},
												cursor: "pointer",
											}}
										></ShareIcon>
									</Typography>
									<Typography>
										<FlagIcon
											sx={{
												width: "40px",
												height: "40px",
												color: "rgba(170, 170, 170, 1)",
												"&:hover": {
													color: "rgba(250, 250, 250, 1)",
												},
												cursor: "pointer",
											}}
										></FlagIcon>
									</Typography>
								</div>
							)}
							{userId == session.id && (
								<div style={{ height: "100%", display: "contents" }}>
									<Typography>
										<MailIcon
											sx={{
												width: "40px",
												height: "40px",
												color: "rgba(170, 170, 170, 1)",
												"&:hover": {
													color: "rgba(250, 250, 250, 1)",
												},
												cursor: "pointer",
											}}
										></MailIcon>
									</Typography>
									<Typography>
										<ShareIcon
											sx={{
												width: "40px",
												height: "40px",
												color: "rgba(170, 170, 170, 1)",
												"&:hover": {
													color: "rgba(250, 250, 250, 1)",
												},
												cursor: "pointer",
											}}
										></ShareIcon>
									</Typography>
									<Typography>
										<SettingsIcon
											sx={{
												width: "40px",
												height: "40px",
												color: "rgba(170, 170, 170, 1)",
												"&:hover": {
													color: "rgba(250, 250, 250, 1)",
												},
												cursor: "pointer",
											}}
											onClick={handleOpenModal}
										></SettingsIcon>
									</Typography>
								</div>
							)}
							<Modal open={open} onClose={handleCloseModal}>
								<Box
									sx={{
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										width: 400,
										bgcolor: "#343F4B",
										border: "2px solid #343F4B",
										boxShadow: 24,
										p: 4,
									}}
								>
									<div style={{ color: "white", display: "flex" }}>
										<label>Change Profile Picture (paste the url): </label>
										<input
											type="text"
											style={{ width: "100px", marginLeft: "10px" }}
											onChange={(e) => setAvatar(e.target.value)}
										></input>
									</div>
									<div style={{ color: "white" }}>
										Change Preferred Position:{" "}
										<select onChange={(e) => setPosition(e.target.value)}>
											{positions.map((position) => (
												<option value={position}>{position}</option>
											))}
										</select>
									</div>
								</Box>
							</Modal>
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

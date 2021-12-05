import React, { useEffect, useState } from "react";
import man from "../Man.png";
import "../styles/Register.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const FormTextField = styled(TextField)({
	marginTop: -10,
	paddingBottom: 20,
	"& label.Mui-focused": {
		color: "white",
	},
	"& label": {
		color: "rgb(255,255,255,0.7)",
	},
	"& input": {
		color: "white",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "gray",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
});

const RegisterButton = styled(Button)({
	color: "white",
	backgroundColor: "black",
	fontSize: "16px",
	padding: "16px 60px 16px 60px",
	"&:hover": {
		backgroundColor: "#4b4b4b",
	},
});

function Register() {
	const [user, setUser] = useState<{
		name: string;
		id: string;
		phone: string;
		password: string;
	}>({ name: "", id: "", phone: "", password: "" });
	const [finishedRegister, setFinishedRegister] = useState<Boolean>(false);
	const [visible, setVisible] = useState("password");
	const [visibleConfirm, setVisibleConfirm] = useState("password");
	const [finishedPost, setFinishedPost] = useState<Boolean>(false);
	const [alertOpen, setAlertOpen] = useState(false);
	let navigate = useNavigate();
	useEffect(() => {
		if (finishedRegister) {
			if (user.id != "" && user.password != "") {
				fetch("http://localhost:8000/users", {
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					method: "POST",
					body: JSON.stringify({
						...user,
						preferredPosition: "",
						matchHistory: [],
						nextMatches: [],
						watchlist: [],
						friends: [],
						socialMedia: [],
						avatar: "",
						banner: "",
					}),
				}).then((res) => {
					setFinishedPost(true);
				});
			} else {
				setFinishedRegister(false);
				setAlertOpen(true);
			}
		}
	}, [finishedRegister]);

	useEffect(() => {
		if (finishedPost) {
			navigate("/balltogether/login");
		}
	}, [finishedPost]);

	return (
		<div className="global-wrapper">
			<img src={man} className="logo-register" />
			<p className="header-register">Ball Together</p>
			<Collapse in={alertOpen}>
				<Alert
					variant="filled"
					severity="error"
					sx={{
						paddingInline: "10px",
						marginBottom: "10px",
						width: "200px",
					}}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setAlertOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					Email and Password cannot be empty!
				</Alert>
			</Collapse>
			<div className="form">
				<FormTextField
					label="Name"
					required
					onChange={(e) => {
						setUser({
							name: e.currentTarget.value,
							id: user.id,
							phone: user.phone,
							password: user.password,
						});
					}}
				/>
				<FormTextField
					label="Email Address"
					required
					onChange={(e) => {
						setUser({
							name: user.name,
							id: e.currentTarget.value,
							phone: user.phone,
							password: user.password,
						});
					}}
				/>
				<FormTextField label="Confirm Email Address" required />
				<FormTextField
					label="Phone Number"
					required
					onChange={(e) => {
						setUser({
							name: user.name,
							id: user.id,
							phone: e.currentTarget.value,
							password: user.password,
						});
					}}
				/>
				<div>
					<FormTextField
						label="Password"
						type={visible}
						required
						onChange={(e) => {
							setUser({
								name: user.name,
								id: user.id,
								phone: user.phone,
								password: e.currentTarget.value,
							});
						}}
					></FormTextField>
					{visible == "password" && (
						<Visibility
							sx={{
								color: "white",
								marginRight: "-35px",
								paddingLeft: "10px",
								marginTop: "5px",
								"&:hover": {
									color: "rgb(255,255,255,0.6)",
								},
							}}
							onClick={() => {
								setVisible(visible == "password" ? "text" : "password");
							}}
						/>
					)}
					{visible == "text" && (
						<VisibilityOff
							sx={{
								color: "white",
								marginRight: "-35px",
								paddingLeft: "10px",
								marginTop: "5px",
								"&:hover": {
									color: "rgb(255,255,255,0.6)",
								},
							}}
							onClick={() => {
								setVisible("password");
							}}
						/>
					)}
				</div>
				<div>
					<FormTextField
						label="Confirm Password"
						type={visibleConfirm}
						required
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setFinishedRegister(true);
							}
						}}
					/>
					{visibleConfirm == "password" && (
						<Visibility
							sx={{
								color: "white",
								marginRight: "-35px",
								paddingLeft: "10px",
								marginTop: "5px",
								"&:hover": {
									color: "rgb(255,255,255,0.6)",
								},
							}}
							onClick={() => {
								setVisibleConfirm(
									visibleConfirm == "password" ? "text" : "password"
								);
							}}
						/>
					)}
					{visibleConfirm == "text" && (
						<VisibilityOff
							sx={{
								color: "white",
								marginRight: "-35px",
								paddingLeft: "10px",
								marginTop: "5px",
								"&:hover": {
									color: "rgb(255,255,255,0.6)",
								},
							}}
							onClick={() => {
								setVisibleConfirm("password");
							}}
						/>
					)}
				</div>
				<RegisterButton
					variant="contained"
					onClick={() => {
						setFinishedRegister(true);
					}}
				>
					Register
				</RegisterButton>
			</div>
		</div>
	);
}

export default Register;

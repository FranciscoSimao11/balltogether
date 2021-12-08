import React, { useEffect, useState } from "react";
import man from "../Man.png";
import field from "../campo.png";
import "../styles/Login.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const FormTextField = styled(TextField)({
	paddingBottom: 20,
	width: 260,
	"& label.Mui-focused": {
		color: "white",
	},
	"& label": {
		color: "white",
	},
	"& input": {
		color: "white",
	},
	"&:focus": {
		fontWeight: 800,
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "white",
		},
		"&:hover fieldset": {
			borderColor: "white",
		},
		"&.Mui-focused fieldset": {
			borderColor: "white",
		},
	},
});

const LoginButton = styled(Button)({
	color: "white",
	backgroundColor: "#282b29",
	fontSize: "28px",
	marginTop: "20px",
	padding: "6px 90px 6px 90px", //up right bottom left
	"&:hover": {
		backgroundColor: "#4b4b4b",
	},
});

function Login() {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	const { login, logout } = bindActionCreators(actionCreators, dispatch);
	const [user, setUser] = useState<{
		id: string;
		password: string;
	}>({ id: "", password: "" });
	const [finishedLogin, setFinishedLogin] = useState<Boolean>(false);
	const [finishedAuth, setFinishedAuth] = useState<Boolean>(false);
	const [failedLogin, setFailedLogin] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	let navigate = useNavigate();
	useEffect(() => {
		if (finishedLogin) {
			fetch("http://localhost:8000/users/" + user.id, {
				method: "GET",
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (data.password == user.password) {
						login(data);
						setFinishedAuth(true);
						console.log("acertei");
					} else {
						setFinishedLogin(false);
						setFailedLogin(true);
					}
				});
		}
	}, [finishedLogin]);

	useEffect(() => {
		if (finishedAuth) {
			localStorage.setItem("activeUser", JSON.stringify(state));
			navigate("/balltogether/home");
		}
	}, [finishedAuth]);

	return (
		<div className="global-container">
			<img src={field} className="pitch" />
			<div className="wrapper">
				<img src={man} className="logo-register" />
				<p className="header-register">Ball Together</p>
				<Collapse in={failedLogin}>
					<Alert
						variant="filled"
						severity="error"
						sx={{
							paddingInline: "10px",
							width: "250px",
						}}
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setFailedLogin(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						Email or password incorrect!
					</Alert>
				</Collapse>
				<div className="form">
					<FormTextField
						label="Email"
						onChange={(e) => {
							setUser({
								id: e.currentTarget.value,
								password: user.password,
							});
						}}
					/>
					<FormTextField
						label="Password"
						type="password"
						onChange={(e) => {
							setUser({
								id: user.id,
								password: e.currentTarget.value,
							});
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setFinishedLogin(true);
							}
						}}
					/>
					<LoginButton
						variant="contained"
						onClick={() => {
							setFinishedLogin(true);
						}}
					>
						Login
					</LoginButton>
				</div>
				<div className="phrase">Forgot your password?</div>
				<div className="phrase">
					Don't have an account?
					<b
						onClick={() => {
							navigate("/balltogether/register");
						}}
					>
						{" "}
						Register{" "}
					</b>
					now!
				</div>
			</div>
		</div>
	);
}

export default Login;

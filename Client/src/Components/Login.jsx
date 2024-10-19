import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Button, TextField, Typography } from "@mui/material";
import { loginAction } from "../Actions/AuthActions";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLoginSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    if (!emailError && !passwordError) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await loginAction(formData);
      if (response.status) {
        enqueueSnackbar(response.message, { variant: "success" });
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
      } else if (response.error) {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    }
  };

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <>
      {/* navbar component */}
      <Navbar />

      <div className="login_container">
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, textAlign: "center", mb: 2 }}
        >
          Login to your account
        </Typography>
        <Typography sx={{ color: "#777777", fontSize: "13px", textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur. Sapien ut sed lacinia egestas placerat ut sagittionec.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            maxWidth: "500px",
            mt: 2,
          }}
        >
          <TextField
            error={emailError}
            margin="normal"
            fullWidth
            label="Email ID"
            type="email"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            helperText={emailError ? "enter valid email." : ""}
            InputProps={{
              style: {
                backgroundColor: "#fff",
              },
            }}
          />
          <TextField
            error={passwordError}
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            helperText={passwordError ? "please enter the password." : ""}
            InputProps={{
              style: {
                backgroundColor: "#fff",
              },
            }}
          />
          <Typography sx={{ color: "#777777", fontSize: "13px", textAlign: "end", ml: "auto", mr: 1 }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#1890a1" }}
            >
              Register Now
            </Link>
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#1AA5C3", width: "150px", borderRadius: "2px" }}
            onClick={handleLoginSubmit}
          >
            LOGIN
          </Button>
        </Box>
      </div>

      {/* footer component */}
      <Footer />
    </>
  );
};

export default Login;

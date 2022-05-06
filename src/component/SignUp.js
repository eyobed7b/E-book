// import * as React  from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = async (event) => {
    setError("");
    setLoading(true);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      password.length === 0 ||
      comfirmPassword.length == 0 ||
      email.length === 0 || name.length === 0
    ) {
      setError("Please fill all the fields");
      setLoading(false);
    } else if (password !== comfirmPassword) {
      setError("Password and Confirm Password do not match");
    } else {
      setError("");
      try {
        await signup(data.get('name'),data.get("email"), data.get("password"));
        history("/");
      } catch (err) {
        // setError("Error  Creating Account")
        setError(err.message)
        setLoading(false);
      }
    }
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   confirm: data.get("comfirmPassword"),
    // });

    // const validate = (event) => {
    //   event.preventDefault();
    //   const data = new FormData(event.currentTarget);

    //   if (data.get("email").length === 0 || data.get("password").length === 0) {
    //     alert("Please fill all the fields");
    //     return false;
    //   }
    //   return true;
    // };
  };
  const { signup, currentUser } = useAuth();
  const history = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
 const [name , setName] = useState("")
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
            <TextField
              required
              margin="normal"
              fullWidth
              name="name"
              id="name"
              label="Name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              required
              margin="normal"
              fullWidth
              name="email"
              id="email"
              label="Email Address"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="comfirmPassword"
              label="Comfirm password"
              type="password"
              id="comfirmPassword"
              value={comfirmPassword}
              autoComplete="current-password"
              onChange={(e) => {
                setComfirmPassword(e.target.value);
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
           { isLoading == true? <CircularProgress /> : <Button
            // onClick={() => console.log(email, password)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"I have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

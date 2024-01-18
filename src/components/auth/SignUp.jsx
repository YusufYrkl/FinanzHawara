import React, { useState } from "react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth, db } from "../../firebase/firebase.mjs";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    // Check password validation
    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }

    if (password.length < 6) {
      alert("Das Passwort sollte mindestens 6 Zeichen lang sein.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save the username and balance under the user's ID
      await setDoc(doc(db, "users", user.uid), {
        username: username, // Benutzername aus dem Anmeldeformular
        balance: 0,
        einnahmen: {},
        ausgaben:{},
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Fehler bei der Anmeldung:", error);
      alert(error.message);
    }
  };

  const handleSignUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Extract the username from the email
      const googleUsername = user.email.split("@")[0];

      // Save the username (from the Google email) and balanc
      await setDoc(doc(db, "users", user.uid), {
        username: googleUsername, // Username from the Google email
        balance: 0,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Fehler bei der Anmeldung mit Google:", error);
      alert(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" align="center">
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
            <AccountBalanceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrierung
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ type: "text" }} // Specify the type here
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Addresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ type: "email" }} // Specify the type here
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ type: "password" }} // Specify the type here
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Passwort bestätigen"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              inputProps={{ type: "password" }} // Specify the type here
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSignUp}
            sx={{ mt: 3, mb: 2 }}
          >
            Registrieren
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleSignUpWithGoogle}
            sx={{ mt: 0.5, mb: 2 }}
          >
            Über Google Registrieren?
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              //e.preventDefault();
              window.location.href = "http://localhost:5173/signin"
            }}
            sx={{ mt: 0.5, mb: 2 }}
          >
            Zur Anmeldung
          </Button>


        </Box>

        Copyright © FinanzHawara 2024
      </Container>
    </ThemeProvider>
  );

}

export default SignUp;

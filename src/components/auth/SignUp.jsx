import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase.mjs";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    // Überprüfen Sie die Passwortvalidierung
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

      // Speichern des Benutzernamens und der Balance unter der Benutzer-ID
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

      // Extrahieren Sie den Benutzernamen aus der E-Mail
      const googleUsername = user.email.split("@")[0];

      // Speichern des Benutzernamens (aus der Google E-Mail) und der Balance
      await setDoc(doc(db, "users", user.uid), {
        username: googleUsername, // Benutzername aus der Google E-Mail
        balance: 0,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Fehler bei der Anmeldung mit Google:", error);
      alert(error.message);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passwort"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Passwort bestätigen"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
}

export default SignUp;

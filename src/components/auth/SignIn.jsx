import React, { useState } from "react";
import { auth } from "../../firebase/firebase.mjs";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in!");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Extrahieren Sie den Benutzernamen aus der E-Mail
      const googleUsername = user.email.split("@")[0];

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // Überprüfen Sie, ob ein Dokument für den Benutzer existiert
      if (!userDoc.exists()) {
        // Erstellen Sie ein neues Dokument, wenn es noch nicht existiert
        await setDoc(userDocRef, {
          username: googleUsername,
          balance: 0,
        });
      }

      // Weiterleitung oder zusätzliche Aktionen nach der Anmeldung
      console.log("Google sign in successful!");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
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
        placeholder="Password"
      />
      {/* ... (SignIn form fields) */}
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>

      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default SignIn;

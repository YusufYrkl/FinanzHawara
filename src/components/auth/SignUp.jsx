import React, { useState } from "react";
import { auth, db } from "../../scenes/firebase.mjs"; // Import db here
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // Move this line inside the component

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("The password should be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional details to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: email,
      });

      // Navigate to dashboard after successful sign up
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
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

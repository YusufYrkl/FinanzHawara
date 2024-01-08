import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";

const Kontostand = () => {
  const [user] = useAuthState(auth);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      // Fetch the user's document from Firestore
      const userDocRef = doc(db, "users", user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setBalance(docSnap.data().balance); // Set the balance state
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="KONTOSTAND" subtitle={`Dein Guthaben: ${balance}`} />
      </Box>
    </Box>
  );
};

export default Kontostand;

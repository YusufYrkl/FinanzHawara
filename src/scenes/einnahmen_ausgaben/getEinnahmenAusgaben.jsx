import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.mjs";
import { useAuthState } from "react-firebase-hooks/auth";


export function getEinnahmenAusgaben(){
    const [einnahmen, setEinnahmen] = useState({});
    const [ausgaben, setAusgaben] = useState({});
    const [user] = useAuthState(auth);
    if(user){
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setEinnahmen(docSnap.data().einnahmen);
            setAusgaben(docSnap.data().ausgaben);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
    return {einnahmen, ausgaben};
}


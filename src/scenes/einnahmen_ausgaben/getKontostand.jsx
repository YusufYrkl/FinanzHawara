import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.mjs";

export async function getKontostand(user, setData) {
  try {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const balance = docSnap.data().balance;
        setData(balance);

        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const updatedBalance = doc.data().balance;
            setData(updatedBalance);
          }
        });

        return () => unsubscribe();
      } else {
        console.log("No such document!");
        setData(0);
      }
    } else {
      setData(0);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
